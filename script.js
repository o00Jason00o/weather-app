let latitude;
let longitude;

window.onload = function() {
    const date = new Date();
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    document.getElementById('date').innerHTML = dateString;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success)
    } else {
      console.log("Geolocation is not available in your browser.");
    }
}
    
function success(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
    //alert(latitude + " " + longitude)
}

const btn = document.getElementById("getWeatherBtn");
btn.addEventListener("click", () => {
    let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]]
    let forecastElements = document.getElementsByClassName("forecast");
    for (let i = 0; i < forecast.length; i++) {
        forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "°F";
      }
});
