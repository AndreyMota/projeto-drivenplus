import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Singup from './pages/SingUp/Sigup'
import Login from './pages/Login/Login'
import { AuthProvider } from './Context/AuthContext'
import Home from './pages/Home/Home'
import Subsc from './pages/Subscription/Subscription'
import Subsd from './pages/Subsd/Subsd'
import Test from './Test'



function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/sign-up' element={<Singup />}/>
              <Route path='/home' element={<Home />} />
              <Route path='/subscriptions' element={<Subsc />}/>
              <Route path='/subscriptions/:id?' element={<Subsd />}/>
              <Route path='/home' element={<Home  />} />

              <Route path='/test' element={<Test />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
