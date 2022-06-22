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
                        let no2Percent = (no2 / 4).toFixed(2);
                        if (no2Percent >= 100) {
                            no2Percent = 100
                        }

                        let o3 = components['o3'];
                        let o3Percent = (o3 / 2.4).toFixed(2);
                        if (o3Percent >= 100) {
                            o3Percent = 100
                        }

                        let pm2_5 = components['pm2_5'];
                        let pm25Percent = (pm2_5 / 1.1).toFixed(2);
                        if (pm25Percent >= 100) {
                            pm25Percent = 100
                        }

                        let pm10 = components['pm10'];
                        let pm10Percent = (pm10 / 1.8).toFixed(2);
                        if (pm10Percent >= 100) {
                            pm10Percent = 100
                        }
                        a = aqi;

                        document.getElementById("pb_no2_now").style.width = no2Percent + "%"
                        document.getElementById("pb_pm10_now").style.width = pm10Percent + "%"
                        document.getElementById("pb_o3_now").style.width = o3Percent + "%"
                        document.getElementById("pb_pm25_now").style.width = pm25Percent + "%"

                        // passing air pollution level to index.html and index2.html
                        document.getElementById("lungs").src = "../static/images/lungs" + a + ".png";
                        document.getElementById("no2").innerHTML = no2;
                        document.getElementById("pm10").innerHTML = pm10;
                        document.getElementById("o3").innerHTML = o3;
                        document.getElementById("pm25").innerHTML = pm2_5;
                    })
                // Making history
                let start = new Date();
                start.setDate(start.getDate()-7);
                start = Math.floor(start.getTime()/1000);
                console.log(start);
                const end = Date.now();
                const urlH = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${start}&end=${end}&appid=${api_key}`

                let outputH = fetch(urlH).then(result => result.json())
                    .then((data) => {
                        let aqi = data['list'][0]['main']['aqi'];
                        let components = data['list'][0]['components'];

                        let no2 = components['no2'];
                        let no2Percent = (no2 / 4).toFixed(2);
                        if (no2Percent >= 100) {
                            no2Percent = 100
                        }

                        let o3 = components['o3'];
                        let o3Percent = (o3 / 2.4).toFixed(2);
                        if (o3Percent >= 100) {
                            o3Percent = 100
                        }

                        let pm2_5 = components['pm2_5'];
                        let pm25Percent = (pm2_5 / 1.1).toFixed(2);
                        if (pm25Percent >= 100) {
                            pm25Percent = 100
                        }

                        let pm10 = components['pm10'];
                        let pm10Percent = (pm10 / 1.8).toFixed(2);
                        if (pm10Percent >= 100) {
                            pm10Percent = 100
                        }
                        a = aqi;

                        document.getElementById("pb_no2_mean").style.width = no2Percent + "%"
                        document.getElementById("pb_pm10_mean").style.width = pm10Percent + "%"
                        document.getElementById("pb_o3_mean").style.width = o3Percent + "%"
                        document.getElementById("pb_pm25_mean").style.width = pm25Percent + "%"

                        document.getElementById("no2mean").innerHTML = no2;
                        document.getElementById("pm10mean").innerHTML = pm10;
                        document.getElementById("o3mean").innerHTML = o3;
                        document.getElementById("pm25mean").innerHTML = pm2_5;
                    })

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
