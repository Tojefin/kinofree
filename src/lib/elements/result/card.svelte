<script>
export let id, poster, name, year, rating, desc = '';
</script>

<div class="card">
  <a href="/watch?id={id}"><img class="card__img" loading="lazy" src="{poster}"></a>
  <div class="card__info">
    <a href="/watch?id={id}"><h2 class="card__title" title="{name}">{name}</h2></a>
    <small class="card__year">{year}</small>
    <small class="card__rating">{rating}</small>
    <p class="card__desc">{desc}</p>
  </div>
</div>

<style lang="scss">
@import "../../scss/variables";

.card {
  background: #212121;
  border-radius: 20px;
  width: rel(1920, 786);
  height: rel(1920, 255);
  overflow: hidden;
  display: flex;

  @media (max-width: 1024px) {
    max-width: 660px;
    width: rel(568, 528);
    height: rel(568, 171);
  }

  @media (max-width: 567px) {
    max-width: 528px;
    width: rel(320, 280);
    height: rel(320, 91);;
  }
}

.card__img {
  animation-duration: 3s;
  animation-name: gradientRoll;
  animation-iteration-count: 3;
  border-radius: 20px;
  aspect-ratio: 4 / 5;
  height: 100%;
  max-width: rel(1920, 182);

  @media (max-width: 1024px) {
    max-width: rel(568, 123);
  }

  @media (max-width: 567px) {
    aspect-ratio: 4 / 6;
    max-width: rel(320, 78);
  }
}

.card__info {
  padding: 15px 50px 15px 40px;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 10px 24px 7px 30px;
  }

  @media (max-width: 567px) {
    padding: 10px 14px 12px 10px;
  }
}

.card__title {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: rel(1920, 26);
  line-height: rel(1920, 32);
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;

  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 568px) {
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 17px;
  }
}

.card__year {
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: rel(1920, 20);
  line-height: rel(1920, 24);
  color: #FFFFFF;
  margin-right: rel(1920, 40);
  margin-bottom: 13px;

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 21px;
  }

  @media (max-width: 568px) {
    font-size: 12px;
    line-height: 15px;
  }
}

.card__rating {
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: rel(1920, 20);
  line-height: rel(1920, 24);
  color: #5AFF91;
  margin-right: rel(1920, 40);
  margin-bottom: 13px;

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 21px;
  }

  @media (max-width: 568px) {
    font-size: 12px;
    line-height: 15px;
  }
}

.card__agelimit {
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: rel(1920, 20);
  line-height: rel(1920, 24);
  color: #FFFFFF;
  margin-bottom: 13px;

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 21px;
  }

  @media (max-width: 568px) {
    font-size: 12px;
    line-height: 15px;
  }
}

.card__desc {
  max-height: 70%;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: rel(1920, 20);
  line-height: rel(1920, 24);
  color: #9C9C9C;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 21px;
  }

  @media (max-width: 567px) {
    font-size: 0;
    line-height: 0;

    &::after {
      content: 'Поверните для описания';
      position: absolute;
      display: contents;
      font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 10px;
      line-height: 12px;
      color: #787878;
    }
  }
}


</style>
