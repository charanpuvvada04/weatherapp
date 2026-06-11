# Week 1 — Teric Academy Builders
**P. Charan Sai** | charanpuvvada638@gmail.com | 9160648261

---

## Project Structure

```
week1-project/
├── react-app/          ← Main React app (deploy this to Vercel)
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Counter.jsx       ← useState demo
│   │       ├── TodoList.jsx      ← useState with arrays
│   │       ├── WeatherCard.jsx   ← live API fetch
│   │       └── ConceptsPanel.jsx ← Week 0 + 1 concepts
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── python-apps/        ← Python scripts (run locally, for video)
    ├── weather_cli.py      ← CLI interface
    ├── weather_gui.py      ← tkinter GUI
    ├── weather_server.py   ← Flask JSON API
    └── threads_demo.py     ← Single vs multi-thread benchmark
```

---

## React App — Run locally

```bash
cd react-app
npm install
npm run dev
# Opens at http://localhost:5173
```

## React App — Deploy to Vercel

```bash
cd react-app
npm run build       # creates dist/ folder
# Push to GitHub → Vercel auto-deploys
```

**Vercel settings:**
- Root Directory: `react-app`
- Build Command: `npm run build`
- Output Directory: `dist`

---

## Python Apps — Run locally

```bash
cd python-apps

# 1. CLI weather (no install needed)
python3 weather_cli.py Hyderabad

# 2. GUI weather (no install needed — tkinter is built in)
python3 weather_gui.py

# 3. Flask API server (install Flask first)
pip install flask
python3 weather_server.py
# Then open: http://localhost:5000/weather/Hyderabad

# 4. Threads benchmark
python3 threads_demo.py
```

---

## Concepts covered

| Week | Topic | File |
|------|-------|------|
| Week 0 | Binary & xxd | `threads_demo.py`, terminal |
| Week 0 | Compiler vs Interpreter | `ConceptsPanel.jsx` |
| Week 0 | GUI / CLI / API | All 3 weather apps |
| Week 1 | LLM basics | `ConceptsPanel.jsx` |
| Week 1 | Agentic coding | `ConceptsPanel.jsx` |
| Week 1 | React + useState | `Counter.jsx`, `TodoList.jsx` |
| Week 1 | API fetch in React | `WeatherCard.jsx` |
| Week 1 | Deployment | Vercel |
