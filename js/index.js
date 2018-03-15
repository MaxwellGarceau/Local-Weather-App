$(document).ready(function() {

    // Variables   
    var city = "";
    var region = "";
    var country = "";
    var tempCel;
    var weatherImg = "";
    var lat = "";
    var long = "";
    var mainDescription;
    var additionalDescription;

    // Functions 
    function toTitleCase(additionalDescription) {
        return additionalDescription.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    $.getJSON("https://ipinfo.io/?callback=", function(location) {
        lat = location.loc.substr(0, 7);
        long = location.loc.substr(8);

        //JSON call for weather      
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long, function(weather) {

            tempCel = weather.main.temp;
            weatherImg = weather.weather[0].icon;
            mainDescription = weather.weather[0].main;
            additionalDescription = weather.weather[0].description;
            additionalDescription = toTitleCase(additionalDescription);
            var celsiusToFahrenheit = (tempCel * 1.8) + 32;

            document.getElementById("temp-cel").innerHTML = celsiusToFahrenheit.toFixed(1) + " F";
            document.getElementById("additional-description").innerHTML = additionalDescription;
            var img = document.getElementById("weather-img");
            img.src = weatherImg;
            var bgImg = document.getElementsByTagName("body")[0];

            //Change background image based on temperature   
            // Hot  
            if (tempCel >= 27) {
                bgImg.style.backgroundImage = 'url("https://dl.dropboxusercontent.com/s/csi9wprlkodfl5n/Hot.jpg?dl=0")';            
            }

            // Temperate  
            else if (tempCel > 10 && tempCel < 27) {
                bgImg.style.backgroundImage = 'url("https://dl.dropboxusercontent.com/s/8e4vexh6x6fk2xr/Temperate.jpg?dl=0")';
            }

            // Cold  
            else {
                bgImg.style.backgroundImage = 'url("https://dl.dropboxusercontent.com/s/mnvnidvk6k4is2q/Cold.jpg?dl=0")';    
            }

            // Fahr to Cel Buttons
            $("#fahr-to-cel").click(function() {
                var tempConversion = document.getElementById("temp-cel");
                tempConversion.innerHTML = tempCel.toFixed(1) + " C";
                $("#cel-to-fahr").click(function() {
                    tempConversion.innerHTML = celsiusToFahrenheit.toFixed(1) + " F";
                });
            });
        });
    });
});