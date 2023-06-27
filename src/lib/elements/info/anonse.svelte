<script>
  import { onMount } from 'svelte';

  let show = false;
  let ver = 1

  const hideClick = () => {
    let anonse = JSON.parse(localStorage.getItem('anonse'));
    show = false;
    anonse.show = false;
    anonse.ver = ver;
    localStorage.setItem('anonse', JSON.stringify(anonse));
  };

  onMount(() => {
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
  <section>
    <div>
      <h2>Помогите сайту - пройдите опрос</h2>
      <p>
        Помогите сайту прохождением опроса о существующих и будующих функциях
        сайта
      </p>
      <br>
      <button type="button" on:click={hideClick}>скрыть</button>
    </div>
    <div class="qr">
      <a href="https://forms.gle/dNF5BnBwuYB8U4uu7" target="_blank">
        <img
          src="https://qrapi.dev/api/generate?data=https://forms.gle/dNF5BnBwuYB8U4uu7"
          alt="QR Code"
          width="100"
        />
      </a>
      <span
        ><a href="https://forms.gle/dNF5BnBwuYB8U4uu7" target="_blank">КЛИК</a
        ></span
      >
    </div>
  </section>
{:else}
  <!-- <button type="button">Показать объявление</button> -->
{/if}

<style lang="scss">
  section {
    background: #3a3a3a;
    border-radius: 5px;
    padding: 15px 25px;
    display: flex;
    margin: 55px auto -50px;
    width: 50%;
    justify-content: space-between;
    color: #ffffff;

    @media (max-width: 768px) {
      width: 80%;
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
