const GlobalStyles = ({ dark }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:      ${dark ? '#0d0d0f' : '#f5f3ee'};
      --surface: ${dark ? '#18181c' : '#ffffff'};
      --surface2:${dark ? '#222228' : '#edeae3'};
      --border:  ${dark ? '#2e2e38' : '#d6d0c4'};
      --text:    ${dark ? '#ece8df' : '#1a1816'};
      --muted:   ${dark ? '#6e6a62' : '#8a8278'};
      --accent:  #e8622a;
      --danger:  #d94f4f;
      --success: #3ab87a;
      --radius:  14px;
      --shadow:  ${dark ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.10)'};
      font-family: 'DM Sans', sans-serif;
    }
    body { background: var(--bg); color: var(--text); min-height: 100vh; transition: background 0.3s, color 0.3s; }
    input, select { font-family: 'DM Sans', sans-serif; background: var(--surface2); border: 1.5px solid var(--border); color: var(--text); border-radius: var(--radius); padding: 10px 14px; font-size: 0.95rem; width: 100%; outline: none; transition: border-color 0.2s; }
    input:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(232,98,42,0.15); }
    button { font-family: 'DM Sans', sans-serif; cursor: pointer; border: none; border-radius: var(--radius); transition: opacity 0.15s, transform 0.1s; }
    button:hover { opacity: 0.88; } button:active { transform: scale(0.97); }
    a { color: var(--accent); text-decoration: none; }
    .page-enter { animation: fadeUp 0.35s ease both; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    table { border-collapse: collapse; width: 100%; min-width: 560px; }
    thead th { background: var(--surface2); color: var(--muted); text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.08em; padding: 10px 14px; text-align: left; }
    tbody td { padding: 12px 14px; border-bottom: 1px solid var(--border); font-size: 0.9rem; vertical-align: middle; }
    tbody tr:last-child td { border-bottom: none; }
    tbody tr:hover { background: var(--surface2); }
    @media (max-width: 600px) { .hide-mobile { display: none !important; } }
  `}</style>
)
export default GlobalStyles