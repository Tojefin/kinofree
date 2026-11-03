package su.kinofree.app

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.webkit.ProxyConfig
import androidx.webkit.ProxyController
import androidx.webkit.WebViewFeature
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.io.OutputStream
import java.net.InetSocketAddress
import java.net.ServerSocket
import java.net.Socket
import java.util.concurrent.CountDownLatch
import java.util.concurrent.Executor
import java.util.concurrent.TimeUnit
import kotlin.concurrent.thread

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    // локальный прокси должен слушать раньше, чем WebView сделает первый запрос;
    // если поднять не удалось — просто не включаем (fail-open)
    AdBlockProxy.enable()
    super.onCreate(savedInstanceState)
  }

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    if (hasFocus) {
      hideSystemBars()
    }
  }

  private fun hideSystemBars() {
    val controller = WindowCompat.getInsetsController(window, window.decorView)
    controller.systemBarsBehavior =
      WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    controller.hide(WindowInsetsCompat.Type.systemBars())
  }
}

/**
 * Мини-прокси на 127.0.0.1 для блокировки рекламы в WebView.
 *
 * Весь трафик приложения направляется сюда через ProxyController.
 * HTTPS не расшифровывается: для CONNECT мы видим только хост —
 * рекламные домены получают 403, остальные туннелируются как есть.
 */
object AdBlockProxy {
  // держать в синхронизации с --host-rules в src-tauri/tauri.conf.json (desktop)
  private val AD_DOMAINS = listOf(
    "doubleclick.net",
    "googlesyndication.com",
    "googleadservices.com",
    "adriver.ru",
    "adfox.ru",
    "an.yandex.ru",
    "awaps.yandex.net",
    "adhigh.net",
    "betweendigital.com",
    "adsniper.ru",
    "admixer.net",
    "bumlam.com",
    "alloviewroll.com"
  )

  private val RESPONSE_FORBIDDEN =
    "HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"
      .toByteArray(Charsets.US_ASCII)

  private val RESPONSE_ESTABLISHED =
    "HTTP/1.1 200 Connection Established\r\n\r\n"
      .toByteArray(Charsets.US_ASCII)

  fun enable() {
    val port = start() ?: return
    if (!WebViewFeature.isFeatureSupported(WebViewFeature.PROXY_OVERRIDE)) return
    try {
      val config = ProxyConfig.Builder()
        .addProxyRule("127.0.0.1:$port")
        .addBypassRule("tauri.localhost")
        .addBypassRule("localhost")
        .addBypassRule("127.0.0.1")
        .build()

      val applied = CountDownLatch(1)
      ProxyController.getInstance().setProxyOverride(
        config,
        Executor { command -> command.run() },
        Runnable { applied.countDown() }
      )
      // ждём применения настроек, чтобы WebView создавался уже с прокси (fail-open по таймауту)
      applied.await(3, TimeUnit.SECONDS)
    } catch (_: Exception) {
    }
  }

  private fun start(): Int? {
    return try {
      val server = ServerSocket()
      server.bind(InetSocketAddress("127.0.0.1", 0))
      thread(isDaemon = true, name = "adblock-proxy-accept") {
        while (!server.isClosed) {
          try {
            val client = server.accept()
            thread(isDaemon = true) { handleClient(client) }
          } catch (_: Exception) {
            if (server.isClosed) break
          }
        }
      }
      server.localPort
    } catch (_: Exception) {
      null
    }
  }

  private fun handleClient(client: Socket) {
    var upstream: Socket? = null
    try {
      client.tcpNoDelay = true
      client.soTimeout = 15000
      val clientIn = client.getInputStream()
      val clientOut = client.getOutputStream()

      val header = readHeaders(clientIn) ?: return
      val lines = header.split("\r\n")
      val request = lines.firstOrNull()?.split(" ") ?: return
      if (request.size < 2) return

      val isConnect = request[0].equals("CONNECT", ignoreCase = true)
      val authority = if (isConnect) {
        request[1]
      } else {
        // обычный HTTP: хост берём из заголовка Host
        lines.firstOrNull { it.regionMatches(0, "Host:", 0, 5, true) }
          ?.substring(5)?.trim() ?: return
      }

      val host = authority.substringBefore(':').trimEnd('.').lowercase()
      val port = authority.substringAfter(':', if (isConnect) "443" else "80")
        .toIntOrNull() ?: return

      if (isBlocked(host)) {
        clientOut.write(RESPONSE_FORBIDDEN)
        clientOut.flush()
        return
      }

      upstream = Socket()
      upstream.tcpNoDelay = true
      upstream.connect(InetSocketAddress(host, port), 15000)

      if (isConnect) {
        clientOut.write(RESPONSE_ESTABLISHED)
      } else {
        // пересылаем уже прочитанные байты запроса (включая тело, если оно шло следом)
        clientOut.write(header.toByteArray(Charsets.US_ASCII))
      }
      clientOut.flush()

      // туннели/долгоживущие соединения (SSE, видео) не должны обрываться таймаутом
      client.soTimeout = 0
      upstream.soTimeout = 0

      val toUpstream = relay(clientIn, upstream.outputStream)
      val toClient = relay(upstream.inputStream, clientOut)
      toUpstream.join()
      toClient.join()
    } catch (_: Exception) {
    } finally {
      try { upstream?.close() } catch (_: Exception) {}
      try { client.close() } catch (_: Exception) {}
    }
  }

  /** Копирует поток байт, по EOF/ошибке закрывает назначение (сигнал другой стороне). */
  private fun relay(from: InputStream, to: OutputStream): Thread {
    val t = thread(isDaemon = true, start = false) {
      val buffer = ByteArray(16384)
      try {
        while (true) {
          val n = from.read(buffer)
          if (n < 0) break
          to.write(buffer, 0, n)
          to.flush()
        }
      } catch (_: Exception) {
      } finally {
        try { to.close() } catch (_: Exception) {}
      }
    }
    t.start()
    return t
  }

  /** Читает запрос до пустой строки (\r\n\r\n), максимум 16 КБ. */
  private fun readHeaders(input: InputStream): String? {
    val out = ByteArrayOutputStream()
    var prev3 = 0
    var prev2 = 0
    var prev1 = 0
    while (true) {
      val b = input.read()
      if (b == -1) return null
      out.write(b)
      if (out.size() > 16384) return null
      if (prev3 == '\r'.code && prev2 == '\n'.code && prev1 == '\r'.code && b == '\n'.code) {
        return out.toString("US-ASCII")
      }
      prev3 = prev2
      prev2 = prev1
      prev1 = b
    }
  }

  private fun isBlocked(host: String): Boolean {
    return AD_DOMAINS.any { host == it || host.endsWith(".$it") }
  }
}
