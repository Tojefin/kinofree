<script>
import { getUrlVars, apiReq } from "$lib/js/tools.js"
import { status, data, req } from "$lib/elements/search/store.js"
import { afterNavigate } from '$app/navigation';
import Form from "$lib/elements/search/form.svelte"
import Nav from "$lib/elements/search/nav.svelte"

$: status, statusObserver($status);
const statusObserver = (ns) => {
  if (ns == "search") {
   GoSearch()
 }
}

afterNavigate(() => {
  if (location.pathname == '/search') {
    if ($status != 'ready') {

      $req = getUrlVars()
      $req.search = $req[0]
      if ($req.rating) {
        $req.genr = $req.genr.split(',')
        $req.rating = $req.rating.split(',')
        $req.years = $req.years.split(',')
      }

      $status = "search"
    }
  }
})

const GoSearch = async () => {
  $status = "await"
  if (!$req.page) {$req.page = 1}
  switch ($req.search) {
    case 'keyword':
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=' + $req.keyword + '&page=' + $req.page);
      break;
    case 'genr':
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=' + $req.genr + '&order=' + $req.sort + '&type=' + $req.type + '&ratingFrom=' + $req.rating[0] + '&ratingTo=' + $req.rating[1] + '&yearFrom=' + $req.years[0] + '&yearTo=' + $req.years[1] + '&page=' + $req.page);
      break;
    case 'popular':
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=' + $req.page);
      break;
    case 'premiers':
      let date = new Date();
      let month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
      let tmonth = month[date.getMonth()];
      let year = date.getYear()
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=20'+year.toString().substring(1)+'&month=' + tmonth);
      break;
    case 'id':
      if ($req.type == 'similars') {
        var version = "2"
      } else {var version = "1"}
      var url = (`https://kinopoiskapiunofficial.tech/api/v2.${version}/films/${$req.id}/${$req.type}`);
      break;
  }

  $data = await apiReq(url)
  if ($data == 'Error' || $data == '' || $data.total == 0 || !$data) {$status = "error"}
  else {$status = "render"}
  $req = []
}
</script>

<section class="search">
  <Form />
  <Nav />
</section>

<style lang="scss">
@import "../scss/variables";
.search {
  align-self: baseline;
  top: 5px;

  @media (max-width: 1024px) {
    order: 1;
    width: 100vw;
  }
}
</style>
