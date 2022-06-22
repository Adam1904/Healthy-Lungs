$(document).ready(function () {
    (() => {
            const message = document.querySelector('#message');
            const api_key = "f9911c4c17c1f82709e7ffa49cf4ae30";
            var cities = null;
            fetch("../static/scripts/cities.json")
                .then(function(resp){
                    return resp.json();
                })
                .then(function(data){
                    cities = data;
                })

            // check if the Geolocation API is supported
            if (!navigator.geolocation) {
                message.textContent = `Your browser doesn't support Geolocation`;
                message.classList.add('error');
                return;
            }

            // handle click event choose location
            const btn = document.querySelector('#search');
            btn.addEventListener('click', function () {
                // get the position of selected city
                enteredCity = document.getElementById("city-search").value;
                console.log(enteredCity);
                var lat = null;
                var lon = null;
                for(i=0;i<cities.length;i++){
                    if(enteredCity == cities[i]['name']){
                        lat = cities[i]['lat'];
                        lon = cities[i]['lat'];
                    }
                }
                if(lat == null || lon == null){
                    message.textContent = "Cannot find this city, current location is set to (52.21942,21.01177)"
                    lat = "52.219428975996706"  // if there is not such city, set location to our Faculty
                    lon = "21.011772669314333"
                }
                onSuccess(lat,lon)
            });

            // handle success case
            function onSuccess(lat,lon) {
                const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
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
                        let pm25Percent =(pm2_5 / 110).toFixed(2);
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
                let start = new Date();
                start.setDate(start.getDate()-7);
                start = Math.floor(start.getTime()/1000);
                console.log(start);
                const end = Date.now();
                const urlH = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${api_key}`

                let outputH = fetch(urlH).then(result => result.json())
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

                        document.getElementById("no2mean").innerHTML = no2;
                        document.getElementById("pm10mean").innerHTML = pm10;
                        document.getElementById("o3mean").innerHTML = o3;
                        document.getElementById("pm25mean").innerHTML = pm2_5;
                    })
            }
        }
)();});
