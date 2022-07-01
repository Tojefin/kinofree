<div class="header__title">
  <a href="/"><h1>KinoFree</h1></a>
  <small>skyedge.xyz</small>
</div>

<style lang="scss">
@import "../../scss/variables.scss";
.header__title {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;

  & h1 {
    font-weight: 700;
    font-size: rel(1920, 64);
    line-height: rel(1920, 78);
    color: #FFFFFF;
    left: -3px;
  }

  & small {
    font-weight: 400;
    font-size: rel(1920, 20);
    line-height: rel(1920, 24);
    display: flex;
    align-items: center;
    text-align: center;
    color: #BFBFBF;
    top: -5px;
  }

  @media (max-width: 1024px) {
    & h1 {
      font-size: 34px;
      line-height: 41px;
    }

    & small {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
