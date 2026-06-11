import { useState } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete Week 1 assignment', done: true },
    { id: 2, text: 'Deploy React app to Vercel', done: false },
    { id: 3, text: 'Record the demo video', done: false },
  ])
  const [input, setInput] = useState('')

  const add = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos(prev => [...prev, { id: Date.now(), text: trimmed, done: false }])
    setInput('')
  }

  const toggle = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const remove = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const done = todos.filter(t => t.done).length

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Todo List</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
        Demonstrates <code style={mono}>useState</code> with arrays — adding, toggling, and removing items.
      </p>

      {/* Progress */}
      <div style={{
        background: '#161616', border: '1px solid #2a2a2a',
        borderRadius: 10, padding: '14px 18px', marginBottom: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, color: '#888' }}>
          {done} of {todos.length} completed
        </span>
        <div style={{ display: 'flex', gap: 3 }}>
          {todos.map(t => (
            <div key={t.id} style={{
              width: 24, height: 4, borderRadius: 2,
              background: t.done ? '#6ee7b7' : '#2a2a2a',
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* Add input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task..."
          style={{
            flex: 1, padding: '10px 14px',
            background: '#161616', border: '1px solid #2a2a2a',
            borderRadius: 8, color: '#f0f0f0',
            fontSize: 14, fontFamily: 'Inter, sans-serif',
            outline: 'none',
          }}
        />
        <button onClick={add} style={{
          padding: '10px 20px', background: '#6ee7b7',
          border: 'none', borderRadius: 8,
          color: '#0d0d0d', fontWeight: 600,
          fontSize: 14, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}>Add</button>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {todos.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: '#161616', border: '1px solid #2a2a2a',
            borderRadius: 8, padding: '12px 14px',
            transition: 'border-color 0.15s',
          }}>
            <button onClick={() => toggle(t.id)} style={{
              width: 20, height: 20, borderRadius: 5,
              border: `1.5px solid ${t.done ? '#6ee7b7' : '#444'}`,
              background: t.done ? '#6ee7b7' : 'transparent',
              cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {t.done && <span style={{ color: '#0d0d0d', fontSize: 11, fontWeight: 700 }}>✓</span>}
            </button>
            <span style={{
              flex: 1, fontSize: 14,
              color: t.done ? '#555' : '#f0f0f0',
              textDecoration: t.done ? 'line-through' : 'none',
              transition: 'all 0.15s',
            }}>{t.text}</span>
            <button onClick={() => remove(t.id)} style={{
              background: 'none', border: 'none',
              color: '#444', cursor: 'pointer',
              fontSize: 16, lineHeight: 1,
              padding: '0 4px',
            }}>×</button>
          </div>
        ))}
        {todos.length === 0 && (
          <div style={{ textAlign: 'center', color: '#555', fontSize: 14, padding: '32px 0' }}>
            No tasks yet — add one above.
          </div>
        )}
      </div>
    </div>
  )
}

const mono = {
  fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
  background: '#1f1f1f', padding: '1px 5px',
  borderRadius: 4, color: '#6ee7b7',
}
