"""
weather_gui.py — GUI weather lookup using tkinter
Usage: python3 weather_gui.py
No extra packages needed — tkinter is built into Python.
"""

import tkinter as tk
from tkinter import font as tkfont
import urllib.request
import json
import threading


def fetch_weather(city, callback):
    """Run in a background thread so the GUI doesn't freeze."""
    try:
        url = f"https://wttr.in/{city}?format=j1"
        with urllib.request.urlopen(url, timeout=10) as res:
            data = json.loads(res.read())
        cur = data["current_condition"][0]
        area = data["nearest_area"][0]
        result = {
            "city":     area["areaName"][0]["value"] + ", " + area["country"][0]["value"],
            "temp_c":   cur["temp_C"],
            "feels":    cur["FeelsLikeC"],
            "desc":     cur["weatherDesc"][0]["value"],
            "humidity": cur["humidity"],
            "wind":     cur["windspeedKmph"],
        }
        callback(result, None)
    except Exception as e:
        callback(None, str(e))


class WeatherApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Weather — Teric Week 1")
        self.geometry("420x480")
        self.configure(bg="#0d0d0d")
        self.resizable(False, False)
        self._build()

    def _build(self):
        pad = {"padx": 24}

        # Title
        tk.Label(self, text="Weather App", bg="#0d0d0d",
                 fg="#f0f0f0", font=("Helvetica", 18, "bold")).pack(pady=(28, 4))
        tk.Label(self, text="GUI built with tkinter — no extra packages",
                 bg="#0d0d0d", fg="#888888", font=("Helvetica", 11)).pack(**pad)

        # Spacer
        tk.Frame(self, bg="#0d0d0d", height=20).pack()

        # Input row
        frame = tk.Frame(self, bg="#0d0d0d")
        frame.pack(**pad, fill="x")

        self.entry = tk.Entry(frame, bg="#161616", fg="#f0f0f0",
                              insertbackground="#f0f0f0",
                              relief="flat", font=("Helvetica", 13),
                              highlightthickness=1,
                              highlightbackground="#2a2a2a",
                              highlightcolor="#6ee7b7")
        self.entry.pack(side="left", fill="x", expand=True, ipady=8, padx=(0, 8))
        self.entry.insert(0, "Hyderabad")
        self.entry.bind("<Return>", lambda _: self._search())

        self.btn = tk.Button(frame, text="Search", command=self._search,
                             bg="#6ee7b7", fg="#0d0d0d",
                             activebackground="#34d399",
                             font=("Helvetica", 12, "bold"),
                             relief="flat", cursor="hand2", padx=16, pady=8)
        self.btn.pack(side="right")

        # Status label
        self.status = tk.Label(self, text="", bg="#0d0d0d",
                               fg="#888", font=("Helvetica", 11))
        self.status.pack(pady=(16, 0))

        # Result card frame
        self.card = tk.Frame(self, bg="#161616", padx=20, pady=18)
        self.card.pack(padx=24, fill="x", pady=(8, 0))

        self.lbl_city   = self._card_label(self.card, "", 12, "#888")
        self.lbl_temp   = self._card_label(self.card, "", 48, "#6ee7b7", bold=True)
        self.lbl_desc   = self._card_label(self.card, "", 13, "#aaa")
        self.lbl_feels  = self._card_label(self.card, "", 12, "#888")
        self.lbl_hum    = self._card_label(self.card, "", 12, "#888")
        self.lbl_wind   = self._card_label(self.card, "", 12, "#888")

        # Footer note
        tk.Label(self, text="This is a GUI — same data as CLI and API, different interface",
                 bg="#0d0d0d", fg="#555", font=("Helvetica", 10),
                 wraplength=380, justify="center").pack(pady=16)

    def _card_label(self, parent, text, size, fg, bold=False):
        weight = "bold" if bold else "normal"
        lbl = tk.Label(parent, text=text, bg="#161616", fg=fg,
                       font=("Helvetica", size, weight))
        lbl.pack(anchor="w")
        return lbl

    def _search(self):
        city = self.entry.get().strip()
        if not city:
            return
        self.status.config(text="Fetching weather...", fg="#888")
        self.btn.config(state="disabled")
        self._clear_card()
        threading.Thread(target=fetch_weather,
                         args=(city, self._on_result),
                         daemon=True).start()

    def _on_result(self, data, error):
        # Called from background thread — use after() to update GUI safely
        self.after(0, lambda: self._update_ui(data, error))

    def _update_ui(self, data, error):
        self.btn.config(state="normal")
        if error:
            self.status.config(text=f"Error: {error}", fg="#f87171")
            return
        self.status.config(text="")
        self.lbl_city.config(text=data["city"])
        self.lbl_temp.config(text=f"{data['temp_c']}°C")
        self.lbl_desc.config(text=data["desc"])
        self.lbl_feels.config(text=f"Feels like {data['feels']}°C")
        self.lbl_hum.config(text=f"Humidity: {data['humidity']}%")
        self.lbl_wind.config(text=f"Wind: {data['wind']} km/h")

    def _clear_card(self):
        for lbl in [self.lbl_city, self.lbl_temp, self.lbl_desc,
                    self.lbl_feels, self.lbl_hum, self.lbl_wind]:
            lbl.config(text="")


if __name__ == "__main__":
    app = WeatherApp()
    app.mainloop()
