"""
weather_cli.py — CLI weather lookup
Usage: python3 weather_cli.py <city>
Example: python3 weather_cli.py Hyderabad
"""

import sys
import urllib.request
import json


def get_weather(city: str) -> dict:
    url = f"https://wttr.in/{city}?format=j1"
    with urllib.request.urlopen(url, timeout=10) as res:
        data = json.loads(res.read())
    cur = data["current_condition"][0]
    area = data["nearest_area"][0]
    return {
        "city":     area["areaName"][0]["value"] + ", " + area["country"][0]["value"],
        "temp_c":   cur["temp_C"],
        "feels":    cur["FeelsLikeC"],
        "desc":     cur["weatherDesc"][0]["value"],
        "humidity": cur["humidity"],
        "wind":     cur["windspeedKmph"],
    }


def main():
    city = sys.argv[1] if len(sys.argv) > 1 else "Hyderabad"
    print(f"\nFetching weather for: {city}\n")
    try:
        w = get_weather(city)
        print(f"  Location  : {w['city']}")
        print(f"  Temp      : {w['temp_c']}°C  (feels like {w['feels']}°C)")
        print(f"  Condition : {w['desc']}")
        print(f"  Humidity  : {w['humidity']}%")
        print(f"  Wind      : {w['wind']} km/h")
    except Exception as e:
        print(f"  Error: {e}")
    print()


if __name__ == "__main__":
    main()
