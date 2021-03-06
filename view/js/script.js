function Weather() {}

Weather.prototype.fetchResults = function(val) {
  return fetch(`https://jsonmock.hackerrank.com/api/weather?name=${val}`)
  .then(function(response) {
    return response.json();
  });
}

Weather.prototype.onKeyup = function(e) {
  clearTimeout(this.timer);

  this.timer = setTimeout(() => {
    this.fetchResults(e.target.value).then((res) => {
      this.weatherResults = res.data;
      this.updatecitySelect(res.data);
    })
  }, 1000);
}

Weather.prototype.updatecitySelect = function(results) {
  this.$suggestions.innerHTML= '';
  if(!results.length) {
    const suggestion = document.createElement('div');
    suggestion.classList.add('suggestionItem');
    suggestion.appendChild(document.createTextNode('No results'));
    suggestion.style.color="rgb(255, 0, 0)";
    this.$suggestions.appendChild(suggestion);

  }
  this.weatherResults.forEach((item) => {
    const suggestion = document.createElement('div');
    suggestion.classList.add('suggestionItem');
    suggestion.appendChild(document.createTextNode(item.name));
    suggestion.addEventListener("click", this.updateSuggestions.bind(this, item))
    this.$suggestions.appendChild(suggestion);
  })
}

Weather.prototype.updateSuggestions = function(item) {
  this.$selectedCity.innerHTML = item.name;
  this.$selctedWeather.innerHTML = item.weather;
  this.$selectedStatus.innerHTML = item.status;
  this.$city.value = item.name;
  this.$suggestions.innerHTML = '';
}

Weather.prototype.reset = function() {
  this.$selectedCity.innerHTML = '';
  this.$selctedWeather.innerHTML = '';
  this.$selectedStatus.innerHTML = '';
  this.$city.value= '';
  this.$suggestions.innerHTML= '';
}

Weather.prototype.init = function() {
  this.timer = null;
  this.weatherResults = [];
  this.$city = document.getElementById('city');
  this.$suggestions = document.getElementById('suggestions');
  this.$selectedInfo = document.getElementById('selectedCityInfo');
  this.$selectedCity = document.getElementById('selectedCity');
  this.$selctedWeather = document.getElementById('selctedWeather');
  this.$selectedStatus = document.getElementById('selectedStatus');
  this.$resetBtn = document.getElementById('resetBtn');
  this.$city.addEventListener('keyup', this.onKeyup.bind(this));
  this.$resetBtn.addEventListener('click', this.reset.bind(this));
}

var weatherApp = new Weather();
weatherApp.init();

