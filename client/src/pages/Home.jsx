import { NavLink , useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import Newsletter from '../components/Newsletter'
import axios from 'axios'
import { token } from "../context/token"
import { useAuth } from '../context/AuthContext'

import discordLogo from '../assets/discord-logo-0.png'
import facebookLogo from '../assets/facebook-logo-facebook-icon-transparent-free-png.png'
import twitterXLogo from '../assets/logo-twitterX.png'

const Home = () => {
    
    const navigate = useNavigate()
    const {user} = useAuth()
    
    // const gamesArray = [
    //     {
    //         id : 0,
    //         title : "Pirate Yacht 1",
    //         summary: "",
    //         img: "./image3jeu1.jpg"
    //     },
    //     {
    //         id : 1,
    //         title : "Pirate Yacht 2",
    //         summary: "",
    //         img: "./image2jeu2.jpg"
    //     },
    //     {
    //         id : 2,
    //         title : "Pirate Yacht 3",
    //         summary: "",
    //         img: "./image3jeu3.jpg"
    //     },
    //     {
    //         id : 3,
    //         title : "Pirate Yacht 4",
    //         summary: "",
    //         img: "./image3jeu4.jpg"
    //     }
    //     ]
    const [allGames, setAllGames] = useState([])
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isSlided, setIsSlided] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0, 0)
        
        document.body.style.overflow = ""

        const fetchAllGames = async () => {
            try {
                const serverRes = await axios.get(`/api/game/getall`, { headers: token() })
                setAllGames(serverRes.data)
                setIsLoading(false)
            } catch (e) {
                console.error(e.stack)
                setIsLoading(false)
            }
        }

        fetchAllGames()
        
    }, [])


    useEffect(() => {
        
        /* Fonction qui fait défiler les images du slider automatiquement */
        const intervalId = setInterval(() => {
            
            if (!isLoading && allGames.length > 0) {
                setCurrentImageIndex((prevIndex) => {
                    const maxIndex = allGames.length < 2 ? allGames[0].otherImg.length : allGames.length
                    return (prevIndex + 1) % maxIndex
                })
            }
            
        }, 3000)

        return () => {
            clearInterval(intervalId)
        }
        
    }, [isLoading, allGames, isSlided])
    

    useEffect(() => {
        
        /* Fonction pour l'effet parallax */
        const handleScroll = () => {
            const yPos = window.scrollY
            const parallaxElements = document.querySelectorAll('.home-parallax-img')
            parallaxElements.forEach(element => {
                const scrollSpeed = parseFloat(element.getAttribute('data-scroll-speed'))
                element.style.transform = `translateY(${yPos * scrollSpeed}px)`
            })
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
        
    }, [])
    
    
    /* Fonction qui change le jeu afficher selon choix utilisateur */
    const seeThatGame = (gameId) => {
        setCurrentImageIndex(gameId)
        setIsSlided(!isSlided)
    }
    
    /* Fonction pour rediriger vers jeu */
    const goToGame = (gameIndex) => {
        
        setTimeout(() => {
            navigate(`/game/${gameIndex}`)
        }, 100)
    }
    

    
    return (
        
        <main className="home-page-main container">
            
            
                {/*** Slider d'en-tête de la page d'accueil ***/}
                {!isLoading && (
                
                    <header className="home-page-header">
                    
                        <figure className="home-parallax-img-container">
                        
                             {allGames.length < 2 ? (
                                
                                <>
                                
                                    <img loading="lazy" onClick={() => goToGame(allGames[0]._id)} className="img-home-slider home-page-article-img home-parallax-img" src={import.meta.env.VITE_API_URL + allGames[0].otherImg[currentImageIndex]} alt={allGames[0].title} data-scroll-speed="0.4" />
                                    <h1 className="home-page-header-title">{allGames[0].title}</h1>
                                    <div className="flex-cercle-slider">
                                        {allGames[0].otherImg.map((oneImage, index) => (
                                            <div onClick={() => seeThatGame(index)} key={index} className={index === currentImageIndex ? "current-img-cercle-slider" : "cercle-slider"}></div>
                                        ))}
                                    </div>
                                    
                                </>
                            )
                                :
                            (
                                
                                <>
                                    <img loading="lazy" onClick={() => goToGame(allGames[currentImageIndex]._id)} className="img-home-slider home-page-article-img home-parallax-img" src={import.meta.env.VITE_API_URL + allGames[currentImageIndex].mainImg} alt={allGames[currentImageIndex].title} data-scroll-speed="0.4" />
                                    <h1 className="home-page-header-title">{allGames[currentImageIndex].title}</h1>
                                    <div className="flex-cercle-slider">
                                        {allGames.map((oneGame, index) => (
                                            <div onClick={() => seeThatGame(allGames[currentImageIndex]._id)} key={index} className={index === currentImageIndex ? "current-img-cercle-slider" : "cercle-slider"}></div>
                                        ))}
                                    </div>
                                
                                </>
                                
                            )}
                            
                        </figure>
                        
                    </header>
                        
            )}
            
            
            {/**** Article réseaux sociaux *******/}
            <article className="home-page-social-media-article">
                    
                    
                    {/****** Section avec le texte *******/}
                    <section>
                        <h2>Rejoignez notre communauté</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec justo ac lacus fringilla tincidunt. Sed varius commodo elit, in vestibulum nisl tincidunt non. Vivamus vitae mauris nec mauris lobortis congue. Sed a velit sed sem tempor semper. Suspendisse potenti.</p>
                       {/* <a className="home-page-social-media-article-section-link" href="#" > Nous rejoindre </a> */}
                    </section>
                    
                    
                    {/*** Section avec les logos réseaux sociaux ***/}
                    <section className="home-page-social-media-section">
                        <figure>
                            <img loading="lazy" className="img-responsive" src={discordLogo} alt="" />
                        </figure>
                        
                        <figure>
                            <img loading="lazy" className="img-responsive" src={facebookLogo} alt="" />
                        </figure>
                        
                        <figure>
                            <img loading="lazy" className="img-logo-twitter" src={twitterXLogo} alt="" />
                        </figure>
                    </section>
                    
                
            </article>
            
            {/**** Composant newsletter ****/}
            <Newsletter />
            
        </main>
        
    )
}

export default Home