import os, json, requests, dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)

api_key = os.getenv('API_KEY')
lat = "52.219428975996706"
lon = "21.011772669314333"
# url = "https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key) <- general weather
url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key)
# https://openweathermap.org/api/air-pollution

response = requests.get(url)
data = json.loads(response.text)
print(data)