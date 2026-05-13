import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const labelStyle = { display:'block', fontSize:'0.8rem', fontWeight:600, color:'var(--muted)', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.05em' }
const errStyle = { background:'#2a0a0a', color:'#d94f4f', padding:'10px 14px', borderRadius:10, fontSize:'0.88rem', border:'1px solid #d94f4f33' }

const Login = () => {
  const [form, setForm] = useState({ email:'', password:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await axios.post('/api/auth/login', form)
      navigate('/todos')
    } catch (err) { setError(err.response?.data?.message || 'Invalid credentials') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'calc(100vh - 58px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 16px', background:'var(--bg)' }}>
      <div className="page-enter" style={{ background:'var(--surface)', borderRadius:20, padding:'36px 32px', border:'1px solid var(--border)', width:'100%', maxWidth:420 }}>
        <h1 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.7rem', marginBottom:6 }}>Welcome back</h1>
        <p style={{ color:'var(--muted)', fontSize:'0.92rem', marginBottom:24 }}>Login to continue to Kaam Karo</p>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div><label style={labelStyle}>Email</label><input type="email" placeholder="you@example.com" required value={form.email} onChange={set('email')} /></div>
          <div><label style={labelStyle}>Password</label><input type="password" placeholder="Your password" required value={form.password} onChange={set('password')} /></div>
          {error && <p style={errStyle}>{error}</p>}
          <button onClick={handleSubmit} disabled={loading} style={{ background:'var(--accent)', color:'#fff', padding:'12px 20px', fontWeight:700, fontSize:'0.95rem', borderRadius:12, width:'100%', fontFamily:'Syne, sans-serif' }}>
            {loading ? 'Logging in…' : 'Login →'}
          </button>
          <p style={{ textAlign:'center', color:'var(--muted)', fontSize:'0.88rem' }}>New user? <Link to="/">Register here</Link></p>
        </div>
      </div>
    </div>
  )
}
export default Login