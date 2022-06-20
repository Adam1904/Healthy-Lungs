import os, json, requests, dotenv
from flask import Flask, render_template

app = Flask(__name__)

def getData(lat,lon):
    if lat == None or lon == None:
        lat = "52.219428975996706"
        lon = "21.011772669314333"

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dotenv_file = os.path.join(BASE_DIR, ".env")
    if os.path.isfile(dotenv_file):
        dotenv.load_dotenv(dotenv_file)

    api_key = os.getenv('API_KEY')
    # https://openweathermap.org/api/
    # url = "https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key) <- general weather
    # https://openweathermap.org/api/air-pollution
    url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key)

    response = requests.get(url)
    data = json.loads(response.text)
    return(data)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
