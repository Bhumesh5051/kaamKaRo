import { useState, useEffect } from 'react'
import axios from 'axios'

const PriBadge = ({ v }) => {
  const map = { high:['#d94f4f','#2a0a0a'], medium:['#e8a62a','#2a1e0a'], low:['#3ab87a','#0a1e14'] }
  const [fg, bg] = map[v] || ['var(--muted)','var(--surface2)']
  return <span style={{ background:bg, color:fg, padding:'2px 9px', borderRadius:99, fontSize:'0.75rem', fontWeight:600 }}>{v}</span>
}

const StatBadge = ({ v }) => {
  const map = { completed:['#3ab87a','#0a1e14'], pending:['#e8a62a','#2a1e0a'], overdue:['#d94f4f','#2a0a0a'] }
  const [fg, bg] = map[v] || ['var(--muted)','var(--surface2)']
  return <span style={{ background:bg, color:fg, padding:'2px 9px', borderRadius:99, fontSize:'0.75rem', fontWeight:600 }}>{v}</span>
}

const Todo = () => {
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ title:'', description:'', priority:'medium', dueDate:'' })
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const fetchTasks = async () => {
    try { const res = await axios.get('/api/todo/', { withCredentials:true }); setTasks(res.data.tasks) } catch {}
  }
  useEffect(() => { fetchTasks() }, [])

  const handleAdd = async (e) => {
    e.preventDefault(); setLoading(true)
    try { await axios.post('/api/todo/create-todo', form); setForm({ title:'', description:'', priority:'medium', dueDate:'' }); fetchTasks() }
    catch {} finally { setLoading(false) }
  }
  const deleteTask = async (id) => { await axios.delete(`/api/todo/${id}`); fetchTasks() }
  const toggleTask = async (id) => { await axios.put(`/api/todo/${id}`, {}); fetchTasks() }

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)
  const counts = { all:tasks.length, pending:tasks.filter(t=>t.status==='pending').length, completed:tasks.filter(t=>t.status==='completed').length, overdue:tasks.filter(t=>t.status==='overdue').length }

  return (
    <div className="page-enter" style={{ maxWidth:900, margin:'0 auto', padding:'28px 16px' }}>
      {/* Add Task */}
      <div style={{ background:'var(--surface)', borderRadius:20, padding:24, border:'1px solid var(--border)', marginBottom:24 }}>
        <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1.1rem', marginBottom:16 }}>＋ Add New Task</h2>
        <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <input placeholder="Task title" required value={form.title} onChange={set('title')} />
          <input placeholder="Description" required value={form.description} onChange={set('description')} />
          <select value={form.priority} onChange={set('priority')}>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <input type="date" required value={form.dueDate} onChange={set('dueDate')} />
        </div>
        <button onClick={handleAdd} disabled={loading} style={{ background:'var(--accent)', color:'#fff', padding:'12px 20px', fontWeight:700, borderRadius:12, width:'100%', marginTop:14, fontFamily:'Syne, sans-serif', fontSize:'0.95rem' }}>
          {loading ? 'Adding…' : 'Add Task'}
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:16 }}>
        {['all','pending','completed','overdue'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding:'6px 16px', borderRadius:99, fontSize:'0.82rem', fontWeight:600, background: filter===s ? 'var(--accent)' : 'var(--surface2)', color: filter===s ? '#fff' : 'var(--text)', border:'1px solid var(--border)', textTransform:'capitalize', cursor:'pointer' }}>
            {s} <span style={{ opacity:0.7 }}>({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background:'var(--surface)', borderRadius:20, overflow:'hidden', border:'1px solid var(--border)' }}>
        {filtered.length === 0 ? (
          <div style={{ padding:48, textAlign:'center', color:'var(--muted)' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:10 }}>📭</div>
            <p>No tasks here. Add one above!</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Title</th><th className="hide-mobile">Description</th><th>Priority</th><th className="hide-mobile">Due</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((task, i) => (
                  <tr key={task._id} style={{ opacity: task.status==='completed' ? 0.55 : 1 }}>
                    <td style={{ color:'var(--muted)', fontSize:'0.8rem' }}>{i+1}</td>
                    <td style={{ fontWeight:500, maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', textDecoration: task.status==='completed' ? 'line-through' : 'none' }}>{task.title}</td>
                    <td className="hide-mobile" style={{ color:'var(--muted)', fontSize:'0.88rem', maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{task.description}</td>
                    <td><PriBadge v={task.priority} /></td>
                    <td className="hide-mobile" style={{ fontSize:'0.85rem', color:'var(--muted)' }}>{new Date(task.dueDate).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</td>
                    <td><StatBadge v={task.status} /></td>
                    <td>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => toggleTask(task._id)} style={{ background:'#0a1e14', color:'#3ab87a', border:'1px solid #3ab87a44', padding:'5px 9px', fontSize:'0.9rem', borderRadius:8 }}>✓</button>
                        <button onClick={() => deleteTask(task._id)} style={{ background:'#2a0a0a', color:'#d94f4f', border:'1px solid #d94f4f44', padding:'5px 9px', fontSize:'0.9rem', borderRadius:8 }}>✕</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default Todo