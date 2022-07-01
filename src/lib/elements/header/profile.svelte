<a class="link header__link" href="/profile">Профиль</a>

<style lang="scss">
@import "../../scss/variables";
.header__link {
  font-style: normal;
  font-weight: 300;
  font-size: rel(1920, 24);
  line-height: rel(1920, 29);
  display: flex;
  align-items: center;
  text-align: center;
  top: -5px;

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 21px;
  }
}
</style>
