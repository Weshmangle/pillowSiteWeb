import { NavLink } from 'react-router-dom'

const Header = () => {
    
    return (
        <header className="header-flex">
            
            {/******** Logo Pillow Interactive ************/}
            <figure className="figure">
                <img className="img-responsive" src="./src/assets/LogoTransparent.png" alt="logo Pillow Interactive"/>
            </figure>
            
            {/******** Navbar ****************/}
            <nav className="header-navbar">
                <NavLink className="header-navlink" to="/" >Accueil</NavLink>
                <NavLink className="header-navlink" to="#" >Studio</NavLink>
                <NavLink className="header-navlink" to="/contact" >Contact</NavLink>
                <NavLink className="header-navlink" to="/inscription" >S'inscrire</NavLink>
                <NavLink className="header-navlink" to="/connexion" >Se connecter</NavLink>
            </nav>
            
        </header>
    )
}

export default Header