<script>
  import Header from "$lib/blocks/header.svelte";
  import "$lib/scss/main.scss"
  import Anonse from "$lib/elements/info/anonse.svelte"
</script>

<div class="container">
  <Header/>
  <Anonse/>
  <slot></slot>
</div>
