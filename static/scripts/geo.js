$(document).ready(function () {
    (() => {
            const message = document.querySelector('#message');
            const api_key = "f9911c4c17c1f82709e7ffa49cf4ae30";

            // check if the Geolocation API is supported
            if (!navigator.geolocation) {
                message.textContent = `Your browser doesn't support Geolocation`;
                message.classList.add('error');
                return;
            }

            // handle click event your location
            const btn = document.querySelector('#button-location');
            btn.addEventListener('click', function () {
                // get the current position
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            });


            // handle success case
            function onSuccess(position) {
                const {
                    latitude,
                    longitude
                } = position.coords;

                message.classList.add('success');
                message.textContent = `Your location: (${latitude},${longitude})`;

                const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;
                console.log(url);
                let output = fetch(url).then(result => result.json())
                    .then((data) => {
                        let aqi = data['list'][0]['main']['aqi'];
                        let components = data['list'][0]['components'];
                        let no2 = components['no2'];
                        let no2Percent = (no2 / 400).toFixed(2);
                        let o3 = components['o3'];
                        let o3Percent = (o3 / 240).toFixed(2);
                        let pm2_5 = components['pm2_5'];
                        let pm25Percent = (pm2_5 / 110).toFixed(2);
                        let pm10 = components['pm10'];
                        let pm10Percent = (pm10 / 180).toFixed(2);
                        a = aqi;

                        // passing air pollution level to index.html and index2.html
                        document.getElementById("lungs").src = "../static/images/lungs" + a + ".png";
                        document.getElementById("no2").innerHTML = no2;
                        document.getElementById("pm10").innerHTML = pm10;
                        document.getElementById("o3").innerHTML = o3;
                        document.getElementById("pm25").innerHTML = pm2_5;
                    })
                // Making history

            }


            // handle error case
            function onError() {
                message.classList.add('error');
                message.textContent = `Failed to get your location!`;
                if (error.code == 1) {
                    message.textContent = "You've decided not to share your position, but it's OK. We won't ask you again.";
                } else if (error.code == 2) {
                    message.textContent = "The network is down or the positioning service can't be reached.";
                } else if (error.code == 3) {
                    message.textContent = "The attempt timed out before it could get the location data.";
                } else {
                    message.textContent = "Geolocation failed due to unknown error.";
                }
            }
        }
    )
    ();
});
