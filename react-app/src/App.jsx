import { useState } from 'react'
import Counter from './components/Counter.jsx'
import TodoList from './components/TodoList.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import ConceptsPanel from './components/ConceptsPanel.jsx'

const tabs = ['Counter', 'Todo List', 'Weather', 'CS Concepts']

export default function App() {
  const [active, setActive] = useState('Counter')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid #2a2a2a',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        position: 'sticky',
        top: 0,
        background: '#0d0d0d',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'linear-gradient(135deg, #6ee7b7, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600, color: '#0d0d0d'
          }}>W1</div>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Teric Builders — Week 1</span>
        </div>
        <span style={{ fontSize: 12, color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
          P. Charan Sai
        </span>
      </header>

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 4, padding: '12px 24px',
        borderBottom: '1px solid #2a2a2a', background: '#0d0d0d',
      }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)} style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'Inter, sans-serif',
            fontWeight: active === t ? 600 : 400,
            background: active === t ? '#1f1f1f' : 'transparent',
            color: active === t ? '#f0f0f0' : '#888',
            transition: 'all 0.15s',
            outline: 'none',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <main style={{ flex: 1, padding: '32px 24px', maxWidth: 720, margin: '0 auto', width: '100%' }}>
        {active === 'Counter'    && <Counter />}
        {active === 'Todo List'  && <TodoList />}
        {active === 'Weather'    && <WeatherCard />}
        {active === 'CS Concepts' && <ConceptsPanel />}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #2a2a2a', padding: '12px 24px',
        textAlign: 'center', fontSize: 12, color: '#555',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        Teric Academy · Builders · Week 1 · P. Charan Sai
      </footer>
    </div>
  )
}
