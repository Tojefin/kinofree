function createSliders() {
  var yearsSlider = document.getElementById('years-slider');
  noUiSlider.create(yearsSlider, {
    start: [1950, 2022],
    tooltips: [true, true],
    connect: true,
    range: {
      min: [1950, 1],
      max: [2022, 1]
    },
    format: {
      to: function(value) {
        return "Год " + value;
      },
      from: function(value) {
        return value;
      }
    },
    pips: {
      mode: 'count',
      values: 5,
      density: 2
    },
  });
  var ratingSlider = document.getElementById('rating-slider');
  noUiSlider.create(ratingSlider, {
    start: [0, 10],
    tooltips: [true, true],
    connect: true,
    range: {
      min: [0, 1],
      max: [10, 1]
    },
    format: {
      to: function(value) {
        return "Рейтинг " + value;
      },
      from: function(value) {
        return value;
      }
    },
    pips: {
      mode: 'count',
      values: 11,
      density: 5
    },
  });
}
