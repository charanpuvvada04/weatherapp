import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const isPositive = count > 0
  const isNegative = count < 0

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Counter</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 32 }}>
        Demonstrates <code style={mono}>useState</code> — React's way of holding data that can change.
        When state updates, React re-renders the component automatically.
      </p>

      {/* Big number display */}
      <div style={{
        background: '#161616',
        border: '1px solid #2a2a2a',
        borderRadius: 12,
        padding: '48px 32px',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        <div style={{
          fontSize: 80,
          fontWeight: 600,
          fontFamily: 'JetBrains Mono, monospace',
          color: isPositive ? '#6ee7b7' : isNegative ? '#f87171' : '#f0f0f0',
          lineHeight: 1,
          marginBottom: 8,
          transition: 'color 0.2s',
        }}>
          {count}
        </div>
        <div style={{ fontSize: 12, color: '#555' }}>current count</div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
        <Btn onClick={() => setCount(c => c - 1)} color="#f87171">− Decrement</Btn>
        <Btn onClick={() => setCount(0)} color="#888">Reset</Btn>
        <Btn onClick={() => setCount(c => c + 1)} color="#6ee7b7">+ Increment</Btn>
      </div>

      {/* Code explanation */}
      <div style={{
        background: '#161616', border: '1px solid #2a2a2a',
        borderRadius: 10, padding: 20,
      }}>
        <div style={{ fontSize: 11, color: '#555', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
          HOW IT WORKS
        </div>
        <pre style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 13, color: '#f0f0f0',
          lineHeight: 1.7, overflow: 'auto',
        }}>{`const [count, setCount] = useState(0)
//     ^value  ^updater    ^initial value

// Increment:
setCount(c => c + 1)

// Decrement:
setCount(c => c - 1)

// Reset:
setCount(0)`}</pre>
      </div>
    </div>
  )
}

function Btn({ onClick, color, children }) {
  const [hover, setHover] = useState(false)
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '10px 22px',
        borderRadius: 8,
        border: `1px solid ${color}44`,
        background: hover ? `${color}18` : 'transparent',
        color: color,
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.15s',
      }}>
      {children}
    </button>
  )
}

const mono = {
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 12,
  background: '#1f1f1f',
  padding: '1px 5px',
  borderRadius: 4,
  color: '#6ee7b7',
}
