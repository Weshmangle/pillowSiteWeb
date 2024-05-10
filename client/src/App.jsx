import { useState } from 'react'
import  { Routes , Route } from 'react-router-dom'


/**** Feuille de style CSS ******/
import './stylesheet/App.css'
/* Components */
import './stylesheet/header-component.css'
import './stylesheet/newsletter-component.css'
import './stylesheet/footer-component.css'
/* Pages */
import './stylesheet/contact-page.css'
import './stylesheet/login-page.css'
import './stylesheet/studio-page.css'
import './stylesheet/home-page.css'




/***** Pages *******/
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Studio from './pages/Studio'

/***** Composants *******/
import Header from './components/Header'
import Footer from './components/Footer'



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
      <Footer />
    </>
  )
}

export default App
