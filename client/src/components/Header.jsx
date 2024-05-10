import { useState , useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    
    const [burgerMenu, setBurgerMenu] = useState(false)
    const [burgerLineAnimation, setBurgerLineAnimation] = useState("")
    
    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
    }, [])
    
    
    /* Fonction qui fait apparaitre le menu mobile et tablette */
    const toggleBurgerMenu = () => {
        setBurgerMenu(!burgerMenu)
        
        if (burgerMenu) {
            
            document.body.style.overflow = ""
            setBurgerLineAnimation("")
            
        } else {
            
            document.body.style.overflow = "hidden"
            setBurgerLineAnimation("burger-line-crossed")
            
        }
    }
    
    
    return (
        <header className="header-flex container">
            
            {/******** Logo Pillow Interactive ************/}
            <figure className="figure">
                <img className="img-responsive" src="../../Logo3.png" alt="logo Pillow Interactive"/>
            </figure>
            
            {/******** Navbar desktop ****************/}
            <nav className="header-navbar">
                <NavLink className="header-navlink" to="/" >Accueil</NavLink>
                <NavLink className="header-navlink" to="/studio" >Studio</NavLink>
                <NavLink className="header-navlink" to="/contact" >Contact</NavLink>
                <NavLink className="header-navlink" to="/connexion" >Se connecter</NavLink>
            </nav>
            
            {/***** Bouton burger menu mobile et tablette ***/}
            <button onClick={toggleBurgerMenu} className={`burger-menu-button ${burgerLineAnimation}`} >
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
            </button>
            
            {/***** Burger menu *****/}
            {burgerMenu && (
                <nav className="burger-menu">
                    <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/" >Accueil</NavLink>
                    <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/studio" >Studio</NavLink>
                    <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/contact" >Contact</NavLink>
                    <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/connexion" >Se connecter</NavLink>
                </nav>
            )}
             

        </header>
    )
}

export default Header