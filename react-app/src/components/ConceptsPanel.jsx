import { useState } from 'react'

const concepts = [
  {
    id: 'binary',
    title: 'Binary & How Computers Store Data',
    week: 'Week 0',
    color: '#6ee7b7',
    summary: 'Everything in a computer is stored as 0s and 1s. A transistor is either OFF (0) or ON (1).',
    details: [
      '1 bit = one 0 or 1',
      '8 bits = 1 byte = one character',
      'The letter A = decimal 65 = binary 01000001',
      'xxd command shows raw bytes of any file in hex',
      'echo "hello" | xxd  →  shows hex codes for h,e,l,l,o',
    ],
    code: `echo "Charan" | xxd
# Shows hex bytes of each character
# 43=C  68=h  61=a  72=r  61=a  6e=n`,
  },
  {
    id: 'interpreter',
    title: 'Role of Translator — Compiler vs Interpreter',
    week: 'Week 0',
    color: '#818cf8',
    summary: 'Source code needs to be translated to machine code. A compiler does it all at once; an interpreter does it line by line.',
    details: [
      'Compiler: translates entire program → creates executable (C, Rust)',
      'Interpreter: translates + runs line by line at runtime (Python)',
      'Python: compiles to bytecode (.pyc) first, then PVM runs it',
      'You cannot run app.py without Python installed',
      'The OS can only directly execute machine code binaries',
    ],
    code: `# Interpreted — needs Python installed at runtime
python3 app.py

# Compiled — standalone binary, no Python needed
gcc hello.c -o hello
./hello`,
  },
  {
    id: 'interfaces',
    title: 'Interfaces: GUI vs CLI vs API',
    week: 'Week 0',
    color: '#fbbf24',
    summary: 'Three ways to interact with software — for humans visually, for humans via text commands, or for programs via requests.',
    details: [
      'GUI: visual, mouse-driven (Chrome, VS Code, File Manager)',
      'CLI: text commands in terminal (git, python3, mkdir)',
      'API: programs talking to programs via HTTP + JSON',
      'Same product often has all three (GitHub website, gh CLI, GitHub API)',
      'Flask is how you build your own API in Python',
    ],
    code: `# CLI — terminal commands
mkdir my_folder
python3 weather_cli.py Hyderabad

# API — HTTP request, gets back JSON
GET https://wttr.in/Hyderabad?format=j1`,
  },
  {
    id: 'llm',
    title: 'Basics of LLM',
    week: 'Week 1',
    color: '#f87171',
    summary: 'An LLM predicts the next token using patterns from training data. It has no knowledge — only very good pattern matching.',
    details: [
      'LLM = Large Language Model trained on massive text data',
      'Core job: given previous tokens, predict the next one',
      'Temperature controls randomness in output',
      'Context window = total working memory (input + output)',
      'Hallucination = confident wrong answer due to pattern completion',
    ],
    code: `# Mental model of next-token prediction:
Prompt:  "The capital of India is"
Tokens:  [The] [capital] [of] [India] [is]
Output:  New Delhi (highest probability token)
# Then predicts next token, and next, and next...`,
  },
  {
    id: 'agentic',
    title: 'Basics of Agentic Coding',
    week: 'Week 1',
    color: '#34d399',
    summary: 'An Agent is an LLM in a loop — it uses tools, observes results, and decides next steps until a goal is complete.',
    details: [
      'Tool = single function the model can call (web_search, read_file)',
      'MCP = server that exposes multiple tools via a standard protocol',
      'Agent = model in a loop using tools to complete multi-step goals',
      'Claude Code is an agent — reads files, writes code, runs commands',
      'CLAUDE.md = project memory file Claude Code reads on startup',
    ],
    code: `# Claude Code agent loop:
You: "Fix the login bug"
Claude: reads login.dart
Claude: reads the error
Claude: edits the file
Claude: runs tests
Claude: fixes again if needed
Claude: Done ✓`,
  },
]

export default function ConceptsPanel() {
  const [open, setOpen] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>CS Concepts</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
        Core concepts from Week 0 and Week 1. Click any card to expand.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {concepts.map(c => (
          <div key={c.id}
            onClick={() => setOpen(open === c.id ? null : c.id)}
            style={{
              background: '#161616',
              border: `1px solid ${open === c.id ? c.color + '55' : '#2a2a2a'}`,
              borderRadius: 10,
              padding: '16px 18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: c.color, flexShrink: 0,
                }} />
                <span style={{ fontWeight: 500, fontSize: 14 }}>{c.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 11, padding: '2px 8px', borderRadius: 4,
                  background: c.color + '22', color: c.color,
                  fontFamily: 'JetBrains Mono, monospace',
                }}>{c.week}</span>
                <span style={{ color: '#555', fontSize: 16, lineHeight: 1 }}>
                  {open === c.id ? '−' : '+'}
                </span>
              </div>
            </div>

            {/* Summary always visible */}
            <p style={{ fontSize: 13, color: '#888', marginTop: 6, marginLeft: 18 }}>
              {c.summary}
            </p>

            {/* Expanded content */}
            {open === c.id && (
              <div style={{ marginTop: 16, marginLeft: 18 }}>
                <div style={{ marginBottom: 14 }}>
                  {c.details.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: c.color, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: 13, color: '#ccc' }}>{d}</span>
                    </div>
                  ))}
                </div>
                <pre style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12, color: '#aaa',
                  background: '#0d0d0d',
                  border: '1px solid #2a2a2a',
                  borderRadius: 6, padding: '12px 14px',
                  lineHeight: 1.6, overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                }}>{c.code}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
