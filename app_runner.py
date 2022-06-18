from flask import Flask, render_template, request
import requests, json
app = Flask(__name__)


@app.route("/")
def home():
    # url = 'http://freegeoip.net/json/{}'.format(request.remote_addr)
    # r = requests.get(url)
    # j = json.loads(r.text)
    # city = j['city']
    #
    # print(city)
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=443, ssl_context='adhoc')
