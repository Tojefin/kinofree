<script>
</script>

<svelte:head>
  <title>KinoFree | Смотрите кино онлайн</title>
</svelte:head>

<section>
  <h1>Нет подключения к интернету</h1>
</section>

<style lang="scss">
@import "../lib/scss/variables";

section {
  margin-top: 100px;
  margin-left: 86px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    margin-left: 20px;
    grid-row-gap: 40px;
  }

  @media (max-width: 567px) {
    margin-right: 20px;
    margin-top: 70px;
  }
}

h1 {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: rel(1920, 60);
  line-height: rel(1920, 66);
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 12px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 26px;
    line-height: 24px;
  }

  @media (max-width: 568px) {
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 17px;
  }
}
</style>
