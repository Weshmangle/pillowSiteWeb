import { NavLink } from 'react-router-dom'
import { useEffect , useState } from 'react'
import Newsletter from '../components/Newsletter'


const Home = () => {
    
    const gamesArray = [
        {
            id : 0,
            title : "Pirate Yacht 1",
            summary: "",
            img: "./src/assets/image1jeu1.jpg"
        },
        {
            id : 1,
            title : "Pirate Yacht 2",
            summary: "",
            img: "./src/assets/image2jeu2.jpg"
        },
        {
            id : 2,
            title : "Pirate Yacht 3",
            summary: "",
            img: "./src/assets/image3jeu3.jpg"
        },
        {
            id : 3,
            title : "Pirate Yacht 4",
            summary: "",
            img: "./src/assets/image4jeu2.jpg"
        }
        ]
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isSlided, setIsSlided] = useState(false)


    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gamesArray.length)
        }, 3000)
        
        return () => clearInterval(intervalId)
        
    }, [isSlided])
    
    
    /* Fonction qui change le jeu afficher selon choix utilisateur */
    const seeThatGame = (gameId) => {
        setCurrentImageIndex(gameId)
        setIsSlided(!isSlided)
    }
    
    
    return (
        
        <main className="home-page-main container">
            
            
            {/****** Slider d'en-tête de la page d'accueil ********/}
            <header className="home-page-header">
                
                <figure>
                    <img className={`img-home-slider home-page-article-img`} src={gamesArray[currentImageIndex].img} alt={gamesArray[currentImageIndex].title} />
                    
                    
                    <h1 className={`home-page-header-title`}>{gamesArray[currentImageIndex].title}</h1>
                        
                    {/* <NavLink className="home-page-header-section-navlink" to="#">En savoir</NavLink> */}
                    
                    
                    <div className="flex-cercle-slider">
                    {gamesArray.map((game) => (
                        <div onClick={() => seeThatGame(game.id)} key={game.id} className={game.id === currentImageIndex ? "current-img-cercle-slider" : "cercle-slider"}></div>
                    ))}
                    </div>
                    
                </figure>
                
            </header>
            
            
            {/**** Article réseaux sociaux *******/}
            <article className="home-page-social-media-article">
                    
                    
                    {/****** Section avec le texte *******/}
                    <section>
                        <h2>Rejoignez notre communauté</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec justo ac lacus fringilla tincidunt. Sed varius commodo elit, in vestibulum nisl tincidunt non. Vivamus vitae mauris nec mauris lobortis congue. Sed a velit sed sem tempor semper. Suspendisse potenti.</p>
                       {/* <a className="home-page-social-media-article-section-link" href="#" > Nous rejoindre </a> */}
                    </section>
                    
                    
                    {/*** Section avec les logos réseaux sociaux ****/}
                    <section className="home-page-social-media-section">
                        <figure>
                            <img className="img-responsive" src="./src/assets/discord-logo-0.png" alt="" />
                        </figure>
                        
                        <figure>
                            <img className="img-responsive" src="./src/assets/facebook-logo-facebook-icon-transparent-free-png.png" alt="" />
                        </figure>
                        
                        <figure>
                            <img className="img-logo-twitter" src="./src/assets/logo-twitterX.png" alt="" />
                        </figure>
                    </section>
                    
                
            </article>
            
            {/**** Composant newsletter ****/}
            <Newsletter />
            
        </main>
        
    )
}

export default Home