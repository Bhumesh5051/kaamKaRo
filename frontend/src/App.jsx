import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Todo from './pages/Todo'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/navbar.jsx'
import GlobalStyles from './components/GlobalStyles.jsx'

const App = () => {
  const [dark, setDark] = useState(true)
  return (
    <>
      <GlobalStyles dark={dark} />
      <Navbar dark={dark} toggleTheme={() => setDark(d => !d)} />
      <Routes>
        <Route path="/"      element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="*"      element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
export default App