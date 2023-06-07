import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Singup from './pages/SingUp/Sigup'
import Login from './pages/Login/Login'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sing-up' element={<Singup />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
