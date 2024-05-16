import { useState , useEffect } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'

const Header = () => {
    
    const navigate = useNavigate()
    
    const [burgerMenu, setBurgerMenu] = useState(false)
    const [burgerLineAnimation, setBurgerLineAnimation] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [burgerDropdown, setBurgerDropdown] = useState(false)
    
    const gamesArray = [
        {
            id : 0,
            title : "Pirate Yacht 1",
            summary: "",
            img: "../../image1jeu1.jpg",
            gameFootage: ["../../image2jeu1.jpg", "../../image3jeu1.jpg", "../../image4jeu1.jpg"],
            paragTitle: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
            paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ]     
        },
        {
            id : 1,
            title : "Pirate Yacht 2",
            summary: "",
            img: "../../image3jeu2.jpg",
            gameFootage: ["../../image2jeu2.jpg", "../../image1jeu2.jpg", "../../image4jeu2.jpg"],
            paragTitle: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
            paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ]     
        },
        {
            id : 2,
            title : "Pirate Yacht 3",
            summary: "",
            img: "../../image2jeu3.jpg",
            gameFootage: ["../../image1jeu3.jpg", "../../image3jeu3.jpg"],
            paragTitle: ["Lorem Ipsum", "Lorem Ipsum"],
            paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi."]
        },
        {
            id : 3,
            title : "Pirate Yacht 4",
            summary: "",
            img: "../../image2jeu4.jpg",
            gameFootage: ["../../image1jeu4.jpg", "../../image3jeu4.jpg"],
            paragTitle: ["Lorem Ipsum", "Lorem Ipsum"],
            paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi."]
        }
        ]
    
    
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
            setBurgerDropdown(false)
            
        } else {
            
            document.body.style.overflow = "hidden"
            setBurgerLineAnimation("burger-line-crossed")
            
        }
    }
    
    
    /* Fonction qui fait disparaitre le menu déroulant des jeux */
    const handleLinkClick = () => {
        setIsDropdownOpen(false)
    }
    
    
    /* Fonction qui ferme et ouvre le menu déroulant dans le menu burger */
    const toggleDropdown = () => {
        setBurgerDropdown(!burgerDropdown)
    }
    
    
    return (
        <header className="header-flex container">
            
            {/******** Logo Pillow Interactive ************/}
            <figure onClick={() => navigate("/")} className="figure">
                <img className="img-responsive" src="../../Logo3.png" alt="logo Pillow Interactive"/>
            </figure>
            
            
            {/******** Navbar desktop ****************/}
            <nav className="header-navbar">
                <NavLink className="header-navlink" to="/" >Accueil</NavLink>
                
                {/****** Menu déroulant ******/}
                <NavLink
                className="header-navlink-games-dropdown" to="#" 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}>
                    Jeux <i className={`caret fa-solid fa-chevron-down ${isDropdownOpen ? "rotate-caret" : ""}`}></i>
                    <ul className={`${isDropdownOpen ? 'header-navbar-games-list' : 'display-none'}`}>
                        {gamesArray.map((oneGame) => (
                            <li key={oneGame.id}><NavLink onClick={handleLinkClick} to={`/game/${oneGame.id}`}>{oneGame.title}</NavLink></li>
                        ))}
                    </ul>
                </NavLink>
                
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
                    
                    {/****** Menu déroulant burger ******/}
                    <NavLink onClick={toggleDropdown} className="burger-menu-navlink" to="#">
                        Jeux <i className={`caret fa-solid fa-chevron-down ${burgerDropdown ? "rotate-caret" : ""}`}></i>
                        <ul className={`burger-menu-games-list ${burgerDropdown ? "display-dropdown" : "display-none"}`}>
                            {gamesArray.map((oneGame) => (
                                <li key={oneGame.id}><NavLink onClick={toggleBurgerMenu} to={`/game/${oneGame.id}`}>{oneGame.title}</NavLink></li>
                            ))}
                        </ul>
                    </NavLink>
                    
                    <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/studio" >Studio</NavLink>
                    <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/contact" >Contact</NavLink>
                    <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/connexion" >Se connecter</NavLink>
                </nav>
            )}
             

        </header>
    )
}

export default Header