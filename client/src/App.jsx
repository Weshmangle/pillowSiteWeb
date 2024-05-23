import { useState } from 'react'
import  { Routes , Route } from 'react-router-dom'


/**** Feuille de style CSS ******/
import './stylesheets/App.css'

/* Components */
import './stylesheets/components/header-component.css'
import './stylesheets/components/newsletter-component.css'
import './stylesheets/components/footer-component.css'

/* Pages */
import './stylesheets/pages/contact-page.css'
import './stylesheets/pages/login-page.css'
import './stylesheets/pages/studio-page.css'
import './stylesheets/pages/home-page.css'
import './stylesheets/pages/onegame-page.css'
// Page super-admin
import './stylesheets/pages/admins/dashboards.css'




/***** Pages *******/
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Studio from './pages/Studio'
import OneGame from './pages/OneGame'
// Super-admin
import AdminsDashboard from './pages/super-admin/AdminsDashboard'

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
          
          {/*<Route path="/" element={<PrivateRoute roles={["admin"]} />}>*/}
              <Route path="admin">
                   {/*<Route path="tableaudebord/contacts" element={<ContactsDashboards />} />*/}
               </Route>
           {/*</Route>*/}
           
           {/*<Route path="/" element={<PrivateRoute roles={["super-admin"]} />}>*/}
              <Route path="super-admin">
                   <Route path="tableaudebord/admins" element={<AdminsDashboard />} />
               </Route>
           {/*</Route>*/}
           
      </Routes>
      
      <Footer />
    </>
  )
}

export default App
