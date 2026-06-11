import { useState } from 'react'

export default function WeatherCard() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch_weather = async () => {
    const c = city.trim()
    if (!c) return
    setLoading(true)
    setError('')
    setWeather(null)
    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(c)}?format=j1`)
      if (!res.ok) throw new Error('City not found')
      const data = await res.json()
      const cur = data.current_condition[0]
      const area = data.nearest_area[0]
      setWeather({
        city: area.areaName[0].value + ', ' + area.country[0].value,
        temp: cur.temp_C,
        feels: cur.FeelsLikeC,
        desc: cur.weatherDesc[0].value,
        humidity: cur.humidity,
        wind: cur.windspeedKmph,
        visibility: cur.visibility,
      })
    } catch (e) {
      setError('Could not fetch weather. Check the city name.')
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Weather</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
        Live weather using the <code style={mono}>wttr.in</code> API — demonstrates
        fetching data from an API inside React using <code style={mono}>useState</code> + async/await.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetch_weather()}
          placeholder="Enter city name (e.g. Hyderabad)"
          style={{
            flex: 1, padding: '10px 14px',
            background: '#161616', border: '1px solid #2a2a2a',
            borderRadius: 8, color: '#f0f0f0',
            fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none',
          }}
        />
        <button onClick={fetch_weather} disabled={loading} style={{
          padding: '10px 20px',
          background: loading ? '#2a2a2a' : '#818cf8',
          border: 'none', borderRadius: 8,
          color: loading ? '#555' : '#fff',
          fontWeight: 600, fontSize: 14, cursor: loading ? 'default' : 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {error && (
        <div style={{
          background: '#1f0d0d', border: '1px solid #f8717133',
          borderRadius: 8, padding: '12px 16px',
          color: '#f87171', fontSize: 14,
        }}>{error}</div>
      )}

      {weather && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Main card */}
          <div style={{
            background: '#161616', border: '1px solid #2a2a2a',
            borderRadius: 12, padding: '28px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{weather.city}</div>
              <div style={{
                fontSize: 64, fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                color: '#6ee7b7', lineHeight: 1,
              }}>{weather.temp}°</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 6 }}>{weather.desc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#555' }}>Feels like</div>
              <div style={{ fontSize: 24, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
                {weather.feels}°C
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { label: 'Humidity', value: weather.humidity + '%' },
              { label: 'Wind', value: weather.wind + ' km/h' },
              { label: 'Visibility', value: weather.visibility + ' km' },
            ].map(s => (
              <div key={s.label} style={{
                background: '#161616', border: '1px solid #2a2a2a',
                borderRadius: 8, padding: '14px 16px',
              }}>
                <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>{s.label}</div>
                <div style={{
                  fontSize: 18, fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!weather && !error && !loading && (
        <div style={{
          background: '#161616', border: '1px dashed #2a2a2a',
          borderRadius: 10, padding: '40px 24px',
          textAlign: 'center', color: '#555', fontSize: 14,
        }}>
          Enter a city name and press Get Weather
        </div>
      )}
    </div>
  )
}

const mono = {
  fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
  background: '#1f1f1f', padding: '1px 5px',
  borderRadius: 4, color: '#818cf8',
}
