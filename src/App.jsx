import React from 'react'
 import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/LoginPage/Login'
import Nav from './components/Nav/Nav'
import Signup from './pages/SignupPage/Signup'
import Footer from './components/Footer/Footer'
import './App.css'
const App = () => {
  return (
  <> 
    <BrowserRouter>
    <div className="app">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  </>
  )
}

export default App

