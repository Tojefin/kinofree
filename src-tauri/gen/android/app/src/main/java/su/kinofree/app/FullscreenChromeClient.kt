package su.kinofree.app

import android.content.pm.ActivityInfo
import android.net.Uri
import android.view.View
import android.view.ViewGroup
import android.webkit.*
import android.widget.FrameLayout

/**
 * Обёртка над RustWebChromeClient, добавляющая поддержку HTML5 Fullscreen API.
 *
 * Wry в сгенерированном RustWebChromeClient сразу вызывает callback.onCustomViewHidden(),
 * из-за чего requestFullscreen() на <video> и cross-origin iframe'ах не работает.
 * Этот класс делегирует все вызовы оригинальному клиенту, кроме fullscreen.
 */
class FullscreenChromeClient(
    private val activity: WryActivity,
    private val delegate: RustWebChromeClient
) : WebChromeClient() {

    private var customView: View? = null
    private var customViewCallback: CustomViewCallback? = null
    private var originalOrientation: Int = 0

    val isFullscreen: Boolean
        get() = customView != null

    override fun onShowCustomView(view: View, callback: CustomViewCallback) {
        if (customView != null) {
            callback.onCustomViewHidden()
            return
        }

        customView = view
        customViewCallback = callback
        originalOrientation = activity.requestedOrientation

        val decorView = activity.window.decorView as ViewGroup
        decorView.addView(
            view,
            FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        )

        try {
            activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
        } catch (_: Exception) {
        }

        view.isClickable = true
        view.isFocusable = true
        view.requestFocus()
    }

    override fun onHideCustomView() {
        val view = customView ?: return

        val decorView = activity.window.decorView as ViewGroup
        decorView.removeView(view)

        try {
            activity.requestedOrientation = originalOrientation
        } catch (_: Exception) {
        }

        customViewCallback?.onCustomViewHidden()

        customView = null
        customViewCallback = null
    }

    // Делегирование остальных методов оригинальному клиенту
    override fun onPermissionRequest(request: PermissionRequest) {
        delegate.onPermissionRequest(request)
    }

    override fun getDefaultVideoPoster() = delegate.defaultVideoPoster

    override fun onJsAlert(view: WebView, url: String, message: String, result: JsResult) =
        delegate.onJsAlert(view, url, message, result)

    override fun onJsConfirm(view: WebView, url: String, message: String, result: JsResult) =
        delegate.onJsConfirm(view, url, message, result)

    override fun onJsPrompt(
        view: WebView,
        url: String,
        message: String,
        defaultValue: String,
        result: JsPromptResult
    ) = delegate.onJsPrompt(view, url, message, defaultValue, result)

    override fun onGeolocationPermissionsShowPrompt(
        origin: String,
        callback: GeolocationPermissions.Callback
    ) {
        delegate.onGeolocationPermissionsShowPrompt(origin, callback)
    }

    override fun onShowFileChooser(
        webView: WebView,
        filePathCallback: ValueCallback<Array<Uri?>?>,
        fileChooserParams: FileChooserParams
    ) = delegate.onShowFileChooser(webView, filePathCallback, fileChooserParams)

    override fun onConsoleMessage(consoleMessage: ConsoleMessage) =
        delegate.onConsoleMessage(consoleMessage)

    override fun onReceivedTitle(view: WebView, title: String) {
        delegate.onReceivedTitle(view, title)
    }
}
