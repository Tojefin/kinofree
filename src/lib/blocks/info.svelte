<script>
import Block from "$lib/elements/info/block.svelte";
</script>

<section class="info">
  <Block title={"ОБНОВЛЕНИЕ • 28.06.23"} text={'Подготовка в большому обновлению <br> Поиск теперь лучше ищет <br> Пройдите опрос <a class="link" target="_blank" href="https://forms.gle/dNF5BnBwuYB8U4uu7">КЛИК</a>'} link={'update'} />
  <Block title={"ПОДДЕРЖАТЬ САЙТ"} text={'Вся реклама в плеерах мне не принадлежит. <br>Поэтому вы можете помочь проекту отправив донат...'} link={'donate'} />
  <Block title={"ОТКЛЮЧЕНИЕ РЕКЛАМЫ"} text={'Я собрал различные способы блокировки рекламы для разных устройств и ссылки для их применения в “один” клик'} link={'antiad'} />
  <Block title={"СОВМЕСТНЫЙ ПРОСМОТР"} text={'Если вы хотите смотреть кино вместе со своими друзьями, вы можете установить расширение <a class="link" href="https://chrome.google.com/webstore/detail/sync-watch/ggiafipgeeaaahnjamgpjcgkdpanhddg?hl=en" target="_blank">SyncWatch</a>'} />
  <Block title={"DMCA"} text={'Этот сайт является поисковиком и все видео из сторонних API источников.'} link={'dmca'} />
</section>

<style lang="scss">
.info {
  margin-top: 100px;
  margin-left: 86px;
  margin-bottom: 30px;
  display: grid;
  grid-row-gap: 28px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: none;

  @media (max-width: 1023px) {
    margin-left: 20px;
    grid-row-gap: 40px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    margin-right: 20px;
    margin-top: 70px;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
