import { useState } from 'react'
import  { Routes , Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'

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
import NotFoundPge from './pages/NotFoundPage'
// Super-admin
import AdminsDashboard from './pages/super-admin/AdminsDashboard'
import UpdateAdmin from './pages/super-admin/UpdateAdmin'
// admin
import GamesDashboard from './pages/admin/GamesDashboard'
import ContactsDashboard from './pages/admin/ContactsDashboard'
import CheckContact from './pages/admin/CheckContact'
import NewslettersDashboard from './pages/admin/NewslettersDashboard'

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
          <Route path="/loremipsum/logout/admin/connexion" element={<Login />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/game/:gameId" element={<OneGame />} />
          <Route path="*" element={<NotFoundPge />} />
          
          
          <Route path="/" element={<PrivateRoute roles={["admin", "super-admin"]} />}>
              <Route path="admin">
                   <Route path="tableaudebord/jeux" element={<GamesDashboard />} />
                   <Route path="tableaudebord/contacts" element={<ContactsDashboard />} />
                   <Route path="tableaudebord/contacts/check/:contactId" element={<CheckContact />} />
                   <Route path="tableaudebord/newsletters" element={<NewslettersDashboard />} />
               </Route>
           </Route>
           
           <Route path="/" element={<PrivateRoute roles={["super-admin"]} />}>
              <Route path="super-admin">
                   <Route path="tableaudebord/admins" element={<AdminsDashboard />} />
                   <Route path="tableaudebord/admins/settings/:id" element={<UpdateAdmin />} />
               </Route>
           </Route>
           
      </Routes>
      
      <Footer />
    </>
  )
}

export default App
