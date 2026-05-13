import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const Navbar = ({ dark, toggleTheme }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = location.pathname === '/todos'

  const handleLogout = async () => {
    try { await axios.post('/api/auth/logout') } catch {}
    navigate('/login')
  }

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: '58px',
      background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 200,
    }}>
      <span style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.25rem',
        color: 'var(--accent)',
      }}>⚡ Kaam Karo</span>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={toggleTheme} style={{
          background: 'var(--surface2)', padding: '6px 10px',
          borderRadius: 99, border: '1px solid var(--border)', fontSize: '1rem', cursor: 'pointer'
        }}>
          {dark ? '☀️' : '🌙'}
        </button>
        {isAuth && (
          <button onClick={handleLogout} style={{
            background: '#d94f4f', color: '#fff', padding: '7px 18px',
            fontWeight: 600, fontSize: '0.85rem', borderRadius: 99, border: 'none', cursor: 'pointer'
          }}>Logout</button>
        )}
      </div>
    </nav>
  )
}
export default Navbar