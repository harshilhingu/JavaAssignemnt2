/*
    Assignment #4
    {Harshil Hingu}
*/

$(function () {

    navigator.permissions.query({name:'geolocation'}).then(function(result) {
      if (result.state == 'granted') {
        navigator.geolocation.getCurrentPosition(locationSuccess);
        function locationSuccess(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            $("#locationhere").html("Current Location Latitude: " + latitude + "<br>Longitude: " + longitude);
            if (localStorage.getItem('latitude') != null && localStorage.getItem('longitude') != null) {
                var storedLatitude = localStorage.getItem('latitude');
                var storedLongitude = localStorage.getItem('longitude');
                if (storedLatitude == latitude && storedLongitude == longitude) {
                    $("<h1 id='message'>Welcome Back</h1>").insertAfter("#locationhere");
                }else{
                    $("<p id='storedlocation'>Stored Location Latitude:"+ storedLatitude +"<br>Longitude: "+ storedLongitude +"</p>").insertAfter( "#locationhere" );
                    $("<h1 id='message'>Welcome Back</h1>").insertAfter("#storedlocation");
                }
                var distance = calcDistanceBetweenPoints(storedLatitude, storedLongitude, latitude , longitude);
                if (distance > 0) {
                    var kmdistance = distance.toFixed(2) / 1000;
                    $("<h2>You travelled the distance (in meters) since your last visit to this page: "+distance.toFixed(2)+" m and istance (in kilometers): "+kmdistance.toFixed(2)+" km</h2>").insertAfter("#message");
                }
            }else{
                $("<h1>Welcome</h1>").insertAfter("#locationhere");
                localStorage.setItem('latitude', latitude);
                localStorage.setItem('longitude', longitude);

            }
        }
      }
    });

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


