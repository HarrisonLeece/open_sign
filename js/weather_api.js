function get_weather(url) {
  return fetch(url)
}
var video = document.getElementById('weather_bar');

//Since the data only updates every 3 hours, only check for update every 10 mins
let weather_interval = 10000;
//let interval = 14400000
let json_data = {};
setInterval(function() {
    //Load JSON file from a child directory (in this case ./js/json/current_weather.json)
    json_data = get_weather("./js/json/current_weather.json");

    json_data.then(response => response.json())
     .then(data => {
          console.log(data);
     })
     .catch(error => {
          console.log('Error in fetch')
     });
     console.log(json_data);

}, weather_interval);
