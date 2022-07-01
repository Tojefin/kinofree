<script>
  import Title from "$lib/elements/header/title.svelte"
  import Search from "./search.svelte"
  import Profile from "$lib/elements/header/profile.svelte"
</script>

<header>
  <Title/>
  <Search/>
  <Profile/>
</header>

<style lang="scss">
header {
  display: flex;
  padding: 3.6% 5.5% 0 4.6%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 123px;

  @media (max-width: 1024px) {
    padding: 13px 20px 0 20px;
    flex-wrap: wrap;
  }
}
</style>
