"""
weather_server.py — Flask JSON API server
Usage: python3 weather_server.py
Then visit: http://localhost:5000/weather/Hyderabad

Install Flask first:
    pip install flask
"""

import urllib.request
import json
from flask import Flask, jsonify

app = Flask(__name__)


def get_weather_data(city: str) -> dict:
    url = f"https://wttr.in/{city}?format=j1"
    with urllib.request.urlopen(url, timeout=10) as res:
        data = json.loads(res.read())
    cur = data["current_condition"][0]
    area = data["nearest_area"][0]
    return {
        "city":        area["areaName"][0]["value"],
        "country":     area["country"][0]["value"],
        "temp_c":      int(cur["temp_C"]),
        "feels_like_c": int(cur["FeelsLikeC"]),
        "description": cur["weatherDesc"][0]["value"],
        "humidity":    int(cur["humidity"]),
        "wind_kmph":   int(cur["windspeedKmph"]),
        "visibility_km": int(cur["visibility"]),
    }


@app.route("/")
def index():
    return jsonify({
        "message": "Weather API — Teric Academy Week 1",
        "usage":   "/weather/<city>",
        "example": "/weather/Hyderabad",
        "author":  "P. Charan Sai",
    })


@app.route("/weather/<city>")
def weather(city):
    """
    Returns current weather for a city as JSON.
    Example: GET /weather/Hyderabad
    """
    try:
        data = get_weather_data(city)
        return jsonify({"status": "ok", "data": data})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    print("\n  Weather API Server")
    print("  ------------------")
    print("  Running at: http://localhost:5000")
    print("  Try:        http://localhost:5000/weather/Hyderabad\n")
    app.run(debug=True, port=5000)
