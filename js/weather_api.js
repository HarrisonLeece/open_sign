async function get_weather(url) {
  let response = await fetch(url)
  let data = await response.json()
  console.log(data)
  return data
}

function decide_icon(current_time, sunrise, sunset, weather){
  let class_str = "wi wi-";
  if (current_time >= sunrise && current_time <= sunset) {
    class_str = class_str+"day-";
  } else {
    class_str = class_str+"night-";
  }
  if (weather == "clear sky") {
    class_str = class_str + "sunny"
  }else if (weather == "few clouds"){
    class_str = class_str + "sunny"
  }else if (weather == "scattered clouds"){
    class_str = class_str + "cloudy"
  }else if (weather == "broken clouds"){
    class_str = class_str + "cloudy"
  }else if (weather == "shower rain"){
    class_str = class_str + "showers"
  }else if (weather == "rain"){
    class_str = class_str + "rain"
  }else if (weather == "thunderstorm "){
    class_str = class_str + "thunderstorm"
  }else if (weather == "snow "){
    class_str = class_str + "snow"
  }else if (weather == "mist "){
    class_str = class_str + "fog"
  } else {
    class_str = "wi wi-alien"
  }
  return class_str
}

function change_weather_html(data) {
  //All this date comes out in metric;;; Temperature in Kelvin
  let temp = (data.main.temp-273.15) * 9/5 + 32;
  let temp_min = (data.main.temp_min-273.15) * 9/5 + 32;
  let temp_max = (data.main.temp_max-273.15) * 9/5 + 32;
  let humidity = data.main.humidity;
  let wind = data.wind.speed *2.237;
  let current_time = data.dt;
  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;
  let weather_descriptor = data.weather.main;

  var weather_bar = document.getElementById('weather_bar');
  document.getElementById('weather_icon').class = decide_icon(current_time, sunrise,sunset,  weather_descriptor);
  document.getElementById('temperature').innerHTML = temp;
  document.getElementById('max_temperature').innerHTML = temp_max;
  document.getElementById('min_temperature').innerHTML = temp_min;
  document.getElementById('humidity').innerHTML = humidity;
  document.getElementById('wind').innerHTML = wind;


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
