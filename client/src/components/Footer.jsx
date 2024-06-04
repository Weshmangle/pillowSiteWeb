import { useNavigate, NavLink } from 'react-router-dom'

const Footer = () => {
    
    const navigate = useNavigate()
    
    const handleLogin = () => {
       navigate("/loremipsum/logout/admin/connexion") 
    }
    
    
    return (
        <footer className="footer-component container">
        
            <nav className="footer-nav-flex">
            
                <section>
                    <NavLink className="footer-nav-navlink" to="/contact" >Formulaire de contact</NavLink>
                    <p>contact@pillow-interactive.fr</p>
                </section>
                
                <section>
                    <NavLink className="footer-nav-navlink">Conditions d'utilisation</NavLink>
                    <NavLink className="footer-nav-navlink">Politique de confidentialité</NavLink>
                    <NavLink className="footer-nav-navlink">Conditions d'utilisation</NavLink>
                </section>
                
            </nav>
            
            <p className="footer-copyright-text"><i onClick={handleLogin} className="fa-regular fa-copyright"></i> Pillow Interactive. Tous droits réservés.</p>
        
        </footer>
    )
}

export default Footer