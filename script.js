let latitude = 0;
let longitude = 0;

window.onload = function() {
    const date = new Date();
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    document.getElementById('date').innerHTML = dateString;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success)
    } else {
      console.log("Geolocation is not available in your browser.");
    }
    
    function success(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        //alert(latitude + " " + longitude)
    }

    const btn = document.getElementById("getWeatherBtn");
    btn.addEventListener("click", () => {


        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:3000/weather/${latitude}/${longitude}`);
        xhr.send();

        xhr.onload = function() {
            let body = JSON.parse(xhr.responseText)
            var temperature = body.temperature
            var weatherStatus = body.weatherStatus
            document.getElementById('temperature').innerHTML = `Temperature: ${temperature}°F`
            document.getElementById('weatherStatus').innerHTML = `Weather Status: ${weatherStatus}`
        }

        


        const xhr2 = new XMLHttpRequest(); // Defines the XMLHttp object
        xhr2.open("GET", `http://localhost:3000/5day/${latitude}/${longitude}`); // opens a get request to the website
        xhr2.send(); // sends the request

        xhr2.onload = function(){ // Once we get a response
            const body = JSON.parse(xhr2.responseText);
            let forecast = body; // Parse the forecast from the response, we now have a list of 5 day/temperature pairs
            // forecast = [{Monday: 52}, {Tuesday: 53}, {Wednesday: 54}, {Thursday: 55}, {Friday: 56}}]
            let forecastElements = document.getElementsByClassName("forecast"); // Setting forecastElements to an array of divs with the class 'forecast' (5 in this case): [first div, second div, third div]
            for (let i = 0; i < forecast.length; i++){
            forecastElements[i].innerHTML = forecast[i].dayName + ": " + forecast[i].temp + "\u00B0F";
            }
        }
    })
}