
function getWeather(lat=19.07, lon=72.37){
var body = $('body');
$.ajax({
  url:'https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+lon+'',
  method:"GET",
  error: function(err) { console.log(err); },
  dataType:'json',
  success: function(data){
    $("#place").append(data.name + ' ');
    $("#place").append(data.sys.country);

    $("#temp").append(data.main.temp);
    $("#scale").append(' °C');
    $("#humid").append(data.main.humidity + ' %');

    $("#weath").append(data.weather[0].main + ' ');
    //$("#weath").append(data.weather[0].description);

    $("#icon").attr('src', data.weather[0].icon);
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+data.name+'';
    body.append('<img class="bgimg" src="'+streetviewUrl+'">');
  }
});
}
var state = 1;

$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(position) {
  getWeather(position.coords.latitude, position.coords.longitude);
  }, function(err){
    getWeather();
  });
});

$("#scale").on('click',function(){
  if(state == 1){
    var tempC = $("#temp").text().split(' ')[2];
    console.log(tempC);
    var tempF = (9/5)*tempC + 32;
    tempF = tempF.toFixed(2);
    $("#temp").text("Temperature : " + tempF);
    $("#scale").text(' F');
    state = 0;
  }else{
    var tempF = $("#temp").text().split(' ')[2];
    console.log(tempF);
    var tempC = (5*(tempF-32))/9;
    tempC = tempC.toFixed(2);
    $("#temp").text("Temperature : " + tempC);
    $("#scale").text(' °C');
    state = 1;
  }
});