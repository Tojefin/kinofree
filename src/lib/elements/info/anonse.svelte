<script>
  import { onMount } from 'svelte';

  const publish = true; // Если true, то анонсер работает
  let show = false;
  let ver = 2; // Менять при обновлении

  const hideClick = () => {
    let anonse = JSON.parse(localStorage.getItem('anonse'));
    show = false;
    anonse.show = false;
    anonse.ver = ver;
    localStorage.setItem('anonse', JSON.stringify(anonse));
  };

  onMount(() => {
    if (!publish) return;

    let anonse = JSON.parse(localStorage.getItem('anonse'));
    if (!anonse) {
      anonse = {};
    }
    if (anonse.ver != ver) {
      show = true;
      anonse.ver = ver;
      anonse.show = true;
    }
    show = anonse.show ?? true;
    localStorage.setItem('anonse', JSON.stringify(anonse));
  });
</script>

{#if show}
  <section class="box">
    <div>
      <h2>Глобальное обновление</h2>
      <p>
        Скоро начнётся разработка глобального обновления, все подробности, ход
        разработки, голосования за итоговые решения, и прочее будут выходить в
        тегерам канале по QR коду и кнопне под ним.
      </p>
      <br />
      <button type="button" on:click={hideClick}
        >отключить это уведомление</button
      >
    </div>
    <div class="qr">
      <a href="https://tg.skyedge.xyz" target="_blank">
        <img
          src="https://media.discordapp.net/attachments/570604513619345420/1196481135094538250/image.png?ex=65b7c8e4&is=65a553e4&hm=308dcdeec1f42c9692849981e64b10a90dd3de464e5c8644f71e96c0e32f06e7&=&format=webp&quality=lossless&width=701&height=701"
          alt="QR Code"
          width="100"
        />
      </a>
      <span>
        <a href="https://tg.skyedge.xyz" target="_blank">tg.skyedge.xyz ↗</a>
      </span>
    </div>
  </section>
{:else}
  <!-- <button type="button">Показать объявление</button> -->
{/if}

<style lang="scss">
  @property --rotate {
    syntax: '<angle>';
    initial-value: 90deg;
    inherits: false;
  }

  section {
    border-radius: 12px;
    background: #3a393e;
    position: relative;
    padding: 24px;
    display: flex;
    margin: 65px auto -50px;
    width: 50%;
    justify-content: space-between;
    color: #ffffff;
    @media (max-width: 768px) {
      width: 80%;
    }
    &::before,
    &::after {
      content: '';
      z-index: -1;
      position: absolute;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      top: -2px;
      left: -2px;
      border-radius: 12px;
      background-image: linear-gradient(
        var(--rotate),
        #5ddcff,
        #3a393e 50%,
      );
      animation: spin 2.5s infinite linear;
    }

    // &::after {
    //   filter: blur(50px);
    // }
  }

  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }
  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: rel(1920, 24);
    line-height: rel(1920, 28);
    margin-bottom: 20px;
    text-transform: uppercase;

    @media (max-width: 1023px) {
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 5px;
    }
  }
  p {
    font-weight: 400;
    font-size: rel(1920, 20);
    line-height: rel(1920, 24);
    color: #bfbfbf;
    margin-bottom: rel(1920, 25);

    @media (max-width: 1023px) {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;
    }
  }
  a {
    color: #fff;
  }
  div.qr {
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 150px;

    img {
      border-radius: 10px;
    }

    span {
      margin-top: 15px;

      a {
        background: #0088cc;
        padding: 5px 8px;
        border-radius: 5px;

        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
  button {
    background: #656565;
    border-radius: 5px;
    font-size: 12px;
    padding: 2px 10px;
    cursor: pointer;
    color: #c3c3c3;
  }
</style>
