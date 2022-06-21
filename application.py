import os, json, requests, dotenv
from ssl import OP_NO_TLSv1_3
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
