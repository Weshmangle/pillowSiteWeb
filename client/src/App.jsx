import { useState } from 'react'
import  { Routes , Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


/**** Feuille de style CSS ******/
import './stylesheet/App.css'
import './stylesheet/contact-page.css'

/***** Pages *******/
import Home from './pages/Home'
import Contact from './pages/Contact'

/***** Composants *******/
import Header from './components/Header'


const App = () => {
  
  
  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
