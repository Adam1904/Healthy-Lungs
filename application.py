import os, json, requests, dotenv
from flask import Flask, render_template, request, Markup

app = Flask(__name__)

@app.route("/", methods=['POST'])
def getData():
    lon = None
    lat = None
    url = 'http://ip-api.com/json/' + request.remote_addr
    print(url)
    r = requests.get(url)
    j = json.loads(r.text)
    if j['status'] == 'fail': # jeżeli doszło do jakiegoś błędu to ustawiamy lokalizacje WEITI
        lat = "52.219428975996706"
        lon = "21.011772669314333"
    else:
        lat = j['lat']
        lon = j['lon']

    #BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #dotenv_file = os.path.join(BASE_DIR, ".env")
    if os.path.isfile(".env"):
        dotenv.load_dotenv(".env")
    api_key = os.getenv('API_KEY')

    # https://openweathermap.org/api/
    # url = "https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key) <- general weather
    # https://openweathermap.org/api/air-pollution
    url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key)

    response = requests.get(url)
    data = json.loads(response.text)
    print(data) # <- z tego trzeba wyciągnąc info o powietrzu
    info = "your lat is: " + lat + ", your lon is: " + lon
    return render_template("index.html",text=info)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
