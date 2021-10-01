async function get_weather(url) {
  let response = await fetch(url)
  let data = await response.json()
  console.log(data)
  return data
}

function change_weather_html(data) {
  var video = document.getElementById('weather_bar');

  //All this date comes out in metric;;; Temperature in Kelvin
  let temp = data.main.temp
  let temp_min = data.main.temp_min
  let temp_max = data.main.temp_max
  let humidity = data.main.humidity

  let icon = data.weather.icon

}


//Since the data only updates every 3 hours, only check for update every min
let weather_interval = 5000;
//So the reason I run the code up here before the set interval is Because
//extracted_data is null until the code has been executed once
//This is just because of race conditions, since get_weather is non-blocking
//This is a naive solution to allow updating of weather in the first minuite
//after the server starts
//It would be solved trivially with a sleep function, a la python
let extracted_data = {}
let json_data = get_weather("./js/json/current_weather.json")
  .then((json_data) => extracted_data=json_data)

console.log(extracted_data);
let temperature = extracted_data.main.temp

console.log(temperature)
setInterval(function() {
    //Load JSON file from a child directory (in this case ./js/json/current_weather.json)
    json_data = get_weather("./js/json/current_weather.json")
      .then((json_data) => extracted_data=json_data)
    console.log(extracted_data)
    temperature = extracted_data.main.temp
    console.log(temperature)


}, weather_interval);
