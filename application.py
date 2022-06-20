import os, json, requests, dotenv
from flask import Flask, render_template, request, Markup

app = Flask(__name__)

@app.route("/", methods=['POST'])
def getData():
    lon = None
    lat = None
    url = 'http://ip-api.com/json/' + request.headers.get('X-Forwarded-For', request.remote_addr)
    r = requests.get(url)
    j = json.loads(r.text)
    if j['status'] == 'fail': # jeżeli doszło do jakiegoś błędu to ustawiamy lokalizacje WEITI
        lat = "52.219428975996706"
        lon = "21.011772669314333"
    else:
        lat = j['lat']
        lon = j['lon']

    if os.path.isfile(".env"):
        dotenv.load_dotenv(".env")
    api_key = os.getenv('API_KEY')

    url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key)
    response = requests.get(url)
    data = json.loads(response.text) # <- z tego trzeba wyciągnąc info o powietrzu
    info = "components: " + str(data['list'][0]['components'])
    return render_template("index.html",text=info)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
