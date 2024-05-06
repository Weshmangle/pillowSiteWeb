import { useState } from 'react'
import  { Routes , Route } from 'react-router-dom'


/**** Feuille de style CSS ******/
// Components
import './stylesheet/header-component.css'
// Pages
import './stylesheet/App.css'
import './stylesheet/contact-page.css'
import './stylesheet/login-page.css'
import './stylesheet/studio-page.css'

/***** Pages *******/
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Studio from './pages/Studio'

/***** Composants *******/
import Header from './components/Header'



const App = () => {
  
  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/studio" element={<Studio />} />
      </Routes>
    </>
  )
}

export default App
