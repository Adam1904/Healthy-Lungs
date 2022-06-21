import os, json, requests, dotenv
from ssl import OP_NO_TLSv1_3
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=['POST'])
def getData():
    lon = None
    lat = None
    url = 'http://ip-api.com/json/' + request.headers.get('X-Forwarded-For', request.remote_addr).split(":")[0]
    r = requests.get(url)
    j = json.loads(r.text)
    if j['status'] == 'fail': # if something goes wrong with acquiring data, we set location to our faculty
        lat = "52.219428975996706"
        lon = "21.011772669314333"
    else:
        lat = j['lat']
        lon = j['lon']

    if os.path.isfile(".env"):
        dotenv.load_dotenv(".env")
    api_key = os.getenv('API_KEY') # load API key (DO NOT public in production!)

    url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key)
    response = requests.get(url)
    data = json.loads(response.text) # load data from json
    aqi = data['list'][0]['main']['aqi'] # air quality index 1-5
    components = data['list'][0]['components'] # downloading individual components
    co = components['co']
    no = components['no']
    no2 = components['no2']
    o3 = components['o3']
    so2 = components['so2']
    pm2_5 = components['pm2_5']
    pm10 = components['pm10']
    nh3 = components['nh3']
    coord = str("lat: " + lat + ",lon: " + lon)
    return render_template("index.html",aqi=aqi,co=co,no=no,no2=no2,o3=o3,so2=so2,pm2_5=pm2_5,pm10=pm10,nh3=nh3,coord=coord)

@app.route("/")
def home():
    lon = None
    lat = None
    ip = request.headers.get('X-Forwarded-For', request.remote_addr).split(":")[0]
    url = 'http://ip-api.com/json/' + ip
    r = requests.get(url)
    j = json.loads(r.text)
    if j['status'] == 'fail': # if something goes wrong with acquiring data, we set location to our faculty
        lat = "52.219428975996706"
        lon = "21.011772669314333"
    else:
        lat = j['lat']
        lon = j['lon']

    if os.path.isfile(".env"):
        dotenv.load_dotenv(".env")
    api_key = os.getenv('API_KEY') # load API key (DO NOT public in production!)

    url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key)
    response = requests.get(url)
    data = json.loads(response.text) # load data from json
    aqi = data['list'][0]['main']['aqi'] # air quality index 1-5
    components = data['list'][0]['components'] # downloading individual components
    co = components['co']
    no = components['no']
    no2 = components['no2']
    o3 = components['o3']
    so2 = components['so2']
    pm2_5 = components['pm2_5']
    pm10 = components['pm10']
    nh3 = components['nh3']
    coord = str("lat: " + lat + ",lon: " + lon)
    test = "your air quality is: " + str(aqi) + ", your ip is:" + str(ip) + ",lat: " + str(lat) + ",lon: " + str(lon)
    return render_template("index.html",test=test)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
