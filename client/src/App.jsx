import { useState } from 'react'
import  { Routes , Route } from 'react-router-dom'


/**** Feuille de style CSS ******/
import './stylesheets/App.css'
/* Components */
import './stylesheets/header-component.css'
import './stylesheets/newsletter-component.css'
import './stylesheets/footer-component.css'
/* Pages */
import './stylesheets/contact-page.css'
import './stylesheets/login-page.css'
import './stylesheets/studio-page.css'
import './stylesheets/home-page.css'
import './stylesheets/onegame-page.css'




/***** Pages *******/
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Studio from './pages/Studio'
import OneGame from './pages/OneGame'

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
          <Route path="/game/:gameId" element={<OneGame />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
