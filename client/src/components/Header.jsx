import { useState , useEffect } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
import { token } from "../context/token"

const Header = () => {
    
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    
    const [allGames, setAllGames] = useState([])
    
    const [burgerMenu, setBurgerMenu] = useState(false)
    const [burgerLineAnimation, setBurgerLineAnimation] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isLogoutDropdownOpen, setIsLogoutDropdownOpen] = useState(false)
    const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false)
    const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false)
    const [burgerDropdown, setBurgerDropdown] = useState(false)
    const [dashboardsDropdown, setDashboardsDropdown] = useState(false)
    const [pagesDropdown, setPagesDropdown] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
     
    // const allGames = [
    //     {
    //         id : 0,
    //         title : "Pirate Yacht 1",
    //         summary: "",
    //         img: "../../image1jeu1.jpg",
    //         gameFootage: ["../../image2jeu1.jpg", "../../image3jeu1.jpg", "../../image4jeu1.jpg"],
    //         paragTitle: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    //         paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ,
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ]     
    //     },
    //     {
    //         id : 1,
    //         title : "Pirate Yacht 2",
    //         summary: "",
    //         img: "../../image3jeu2.jpg",
    //         gameFootage: ["../../image2jeu2.jpg", "../../image1jeu2.jpg", "../../image4jeu2.jpg"],
    //         paragTitle: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    //         paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ,
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi." ]     
    //     },
    //     {
    //         id : 2,
    //         title : "Pirate Yacht 3",
    //         summary: "",
    //         img: "../../image2jeu3.jpg",
    //         gameFootage: ["../../image1jeu3.jpg", "../../image3jeu3.jpg"],
    //         paragTitle: ["Lorem Ipsum", "Lorem Ipsum"],
    //         paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi."]
    //     },
    //     {
    //         id : 3,
    //         title : "Pirate Yacht 4",
    //         summary: "",
    //         img: "../../image2jeu4.jpg",
    //         gameFootage: ["../../image1jeu4.jpg", "../../image3jeu4.jpg"],
    //         paragTitle: ["Lorem Ipsum", "Lorem Ipsum"],
    //         paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi."]
    //     }
    //     ]
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAllGames = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/game/getall`)
                setAllGames(serverRes.data)
                setIsLoading(false)
    
            } catch (e) {
                setIsLoading(false)
            }
            
        }
        
        fetchAllGames()
        
    }, [])
    
    
    // Fonction qui ferme le modal
    const handleHideModal = () => {
        
        setShowLogoutModal(false)
        document.body.style.overflow = ""
        
    }
    
    
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
    
    
    /* Fonction qui fait disparaitre les menus déroulants desktop */
    const handleLinkClick = () => {
        setIsDropdownOpen(false)
        setIsPagesDropdownOpen(false)
        setIsDashboardDropdownOpen(false)
    }
    
    
    /* Fonction qui ferme et ouvre le menu déroulant jeux dans le menu burger */
    const toggleDropdown = () => {
        setBurgerDropdown(!burgerDropdown)
    }
    
    
    /* Fonction qui ferme et ouvre le menu déroulant dashboards dans le menu burger */
    const toggleDashboardsDropdown = () => {
        setDashboardsDropdown(!dashboardsDropdown)
    }
    
    
    /* Fonction qui ferme et ouvre le menu déroulant autres pages dans le menu burger */
    const togglePagesDropdown = () => {
        setPagesDropdown(!pagesDropdown)
    }
    
    
    /* Fonction qui fait apparaître le modal de confirmation de déconnexion */
    const confirmLogout = () => {
        setShowLogoutModal(true)
        document.body.style.overflow = "hidden"
        console.log(allGames)
    }
    
    /* Fonction qui appelle la fonction la fonction de déconnexion du context */
    const handleLogout = () => {
        logout()
        setBurgerMenu(false)
        setBurgerLineAnimation("")
        setIsLogoutDropdownOpen(false)
        handleHideModal()
    }
    
    
    
    return (
        <>
        <header className="header-flex container">
            
            {/******** Logo Pillow Interactive ************/}
            <figure onClick={() => navigate("/")} className="figure">
                <img className="img-responsive" src="../../Logo3.png" alt="logo Pillow Interactive"/>
            </figure>
            
            
            {/******** Navbar desktop ****************/}
            <nav className="header-navbar">
                
                <NavLink className="header-navlink" to="/" >Accueil</NavLink>
                
                {/***** Si utilisateur connecté... sinon... ****/}
                {user && user.userToken ? (
                    <>
                        {/****** Menu déroulant dashboards ******/}
                        <NavLink className="header-navbar-dashboards-dropdown" to="#"
                        onMouseEnter={() => setIsDashboardDropdownOpen(true)}
                        onMouseLeave={() => setIsDashboardDropdownOpen(false)}>
                            Dashboards <i className={`caret fa-solid fa-chevron-down ${isDashboardDropdownOpen ? "rotate-caret" : ""}`}></i>
                            
                            <ul className={`${isDashboardDropdownOpen ? 'header-navbar-dashboards-list' : 'display-none'}`}>
                                {user.role === "super-admin" && (
                                    <li><NavLink onClick={handleLinkClick} to="/super-admin/tableaudebord/admins">Administrateurs</NavLink></li>
                                )}
                                <li><NavLink onClick={handleLinkClick} to="/admin/tableaudebord/jeux">Jeux</NavLink></li>
                                <li><NavLink onClick={handleLinkClick} to="#">Contacts</NavLink></li>
                                <li><NavLink onClick={handleLinkClick} to="#">Newsletters</NavLink></li>
                            </ul>
                        </NavLink>
                        
                        {/****** Menu déroulant jeux ******/}
                        <NavLink
                        className="header-navlink-games-dropdown" to="#" 
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}>
                            Jeux <i className={`caret fa-solid fa-chevron-down ${isDropdownOpen ? "rotate-caret" : ""}`}></i>
                            
                            <ul className={`${isDropdownOpen ? 'header-navbar-games-list' : 'display-none'}`}>
                                {allGames.map((oneGame) => (
                                    <li key={oneGame._id}><NavLink onClick={handleLinkClick} to={`/game/${oneGame._id}`}>{oneGame.title}</NavLink></li>
                                ))}
                            </ul>
                            
                        </NavLink>
                
                        {/****** Menu déroulant autres pages ******/}
                        <NavLink className="header-navbar-pages-dropdown" to="#"
                        onMouseEnter={() => setIsPagesDropdownOpen(true)}
                        onMouseLeave={() => setIsPagesDropdownOpen(false)}>
                            Autres pages <i className={`caret fa-solid fa-chevron-down ${isPagesDropdownOpen ? "rotate-caret" : ""}`}></i>
                            
                            <ul className={`${isPagesDropdownOpen ? 'header-navbar-pages-list' : 'display-none'}`}>
                                <li><NavLink onClick={handleLinkClick} to="/studio" >Studio</NavLink></li>
                                <li><NavLink onClick={handleLinkClick} to="/contact" >Contact</NavLink></li>
                            </ul>
                        </NavLink>
                        
                        {/****** Menu déroulant déconnexion ******/}
                        <NavLink className="header-navlink-account-dropdown" to="#"
                        onMouseEnter={() => setIsLogoutDropdownOpen(true)}
                        onMouseLeave={() => setIsLogoutDropdownOpen(false)}>
                            {user.username} <i className={`caret fa-solid fa-chevron-down ${isLogoutDropdownOpen ? "rotate-caret" : ""}`}></i>
                            
                            <ul className={`${isLogoutDropdownOpen ? 'header-navbar-account-list' : 'display-none'}`}>
                                <li><NavLink onClick={() => confirmLogout()} className="" to="#" >Se déconnecter</NavLink></li>
                            </ul>
                        </NavLink>
                    </>
                    
                ) : (
                
                    <>  
                        {/****** Menu déroulant jeux ******/}
                        <NavLink
                        className="header-navlink-games-dropdown" to="#" 
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}>
                            Jeux <i className={`caret fa-solid fa-chevron-down ${isDropdownOpen ? "rotate-caret" : ""}`}></i>
                            
                            <ul className={`${isDropdownOpen ? 'header-navbar-games-list' : 'display-none'}`}>
                                {allGames.map((oneGame) => (
                                    <li key={oneGame._id}><NavLink onClick={handleLinkClick} to={`/game/${oneGame._id}`}>{oneGame.title}</NavLink></li>
                                ))}
                            </ul>
                            
                        </NavLink>
                        <NavLink className="header-navlink" to="/studio" >Studio</NavLink>
                        <NavLink className="header-navlink" to="/contact" >Contact</NavLink>
                        <NavLink className="header-navlink" to="/connexion" >Se connecter</NavLink>
                    </>
                )}
                
            </nav>
            
            
            {/***** Bouton burger menu mobile et tablette ***/}
            <button onClick={toggleBurgerMenu} className={`burger-menu-button ${burgerLineAnimation}`} >
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
            </button>
            
            
            {/************ Burger menu *************/}
            {burgerMenu && (
            
                <nav className="burger-menu">
                    
                     <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/" >Accueil</NavLink>
                     
                    {/***** Si utilisateur connecté... sinon... ****/}
                    {user && user.userToken ? (
                        <>  
                            
                            {/****** Menu déroulant dashboards ******/}
                            <NavLink onClick={toggleDashboardsDropdown} className="burger-menu-navlink" to="#">
                                Dashboards <i className={`caret fa-solid fa-chevron-down ${dashboardsDropdown ? "rotate-caret" : ""}`}></i>
                                
                                <ul className={`burger-menu-dropdown-list ${dashboardsDropdown ? 'display-dropdown' : 'display-none'}`}>
                                    {user.role === "super-admin" && (
                                        <li><NavLink onClick={toggleBurgerMenu} to="/super-admin/tableaudebord/admins">Administrateurs</NavLink></li>
                                    )}
                                    <li><NavLink onClick={toggleBurgerMenu} to="#">Jeux</NavLink></li>
                                    <li><NavLink onClick={toggleBurgerMenu} to="#">Contacts</NavLink></li>
                                    <li><NavLink onClick={toggleBurgerMenu} to="#">Newsletters</NavLink></li>
                                </ul>
                            </NavLink>
                            
                            {/****** Menu déroulant jeux ******/}
                            <NavLink onClick={toggleDropdown} className="burger-menu-navlink" to="#">
                                Jeux <i className={`caret fa-solid fa-chevron-down ${burgerDropdown ? "rotate-caret" : ""}`}></i>
                                
                                <ul className={`burger-menu-dropdown-list ${burgerDropdown ? "display-dropdown" : "display-none"}`}>
                                    {allGames.map((oneGame) => (
                                        <li key={oneGame._id}><NavLink onClick={toggleBurgerMenu} to={`/game/${oneGame._id}`}>{oneGame.title}</NavLink></li>
                                    ))}
                                </ul>
                                
                            </NavLink>
                            
                            {/****** Menu déroulant autres pages ******/}
                            <NavLink onClick={togglePagesDropdown} className="burger-menu-navlink" to="#">
                                Autres pages <i className={`caret fa-solid fa-chevron-down ${pagesDropdown ? "rotate-caret" : ""}`}></i>
                                
                                <ul className={`burger-menu-dropdown-list ${pagesDropdown ? 'header-navbar-pages-list' : 'display-none'}`}>
                                    <li><NavLink onClick={toggleBurgerMenu} to="/studio" >Studio</NavLink></li>
                                    <li><NavLink onClick={toggleBurgerMenu} to="/contact" >Contact</NavLink></li>
                                </ul>
                            </NavLink>
                            
                            {/***** Bouton déconnexion *******/}
                            <NavLink onClick={() => confirmLogout()} className="burger-menu-navlink" to="#" >Se déconnecter</NavLink>
                        </>
                    ) : (
                        <>
                            {/****** Menu déroulant jeux ******/}
                            <NavLink onClick={toggleDropdown} className="burger-menu-navlink" to="#">
                                Jeux <i className={`caret fa-solid fa-chevron-down ${burgerDropdown ? "rotate-caret" : ""}`}></i>
                                
                                <ul className={`burger-menu-dropdown-list ${burgerDropdown ? "display-dropdown" : "display-none"}`}>
                                    {allGames.map((oneGame) => (
                                        <li key={oneGame._id}><NavLink onClick={toggleBurgerMenu} to={`/game/${oneGame._id}`}>{oneGame.title}</NavLink></li>
                                    ))}
                                </ul>
                                
                            </NavLink>
                            <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/studio" >Studio</NavLink>
                            <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/contact" >Contact</NavLink>
                            <NavLink onClick={toggleBurgerMenu} className="burger-menu-navlink" to="/connexion" >Se connecter</NavLink>
                        </>
                    )}
                    
                </nav>
                
            )}
             

        </header>
        
        {/***** Modal de confirmation de modification de rôle ***/}
        {showLogoutModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                    <p>Voulez-vous vraiment vous déconnecter ?</p>
                    
                    <button className="modal-confirm-button"  onClick={() => handleLogout()}>Oui</button> 
                    <button className="modal-cancel-button" onClick={() => handleHideModal()}>Non</button>

                </dialog>
            </>
        )}
        </>
    )
}

export default Header