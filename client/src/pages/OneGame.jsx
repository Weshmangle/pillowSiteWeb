import { useParams } from 'react-router-dom'
import { useEffect } from 'react'


const OneGame = () => {
    
    const {gameId} = useParams()
    
    const gamesArray = [
        {
            id : 0,
            title : "Pirate Yacht 1",
            summary: "",
            img: "../../image1jeu1.jpg"
        },
        {
            id : 1,
            title : "Pirate Yacht 2",
            summary: "",
            img: "../../image2jeu2.jpg"
        },
        {
            id : 2,
            title : "Pirate Yacht 3",
            summary: "",
            img: "../../image3jeu3.jpg"
        },
        {
            id : 3,
            title : "Pirate Yacht 4",
            summary: "",
            img: "../../image4jeu2.jpg"
        }
        ]
    
    const selectedGame = gamesArray[gameId]
    
    
    useEffect(() => {
        
    }, []);
    
    
    return (
        <main className="onegame-page-main container">
            <header className="onegame-page-header">
                <figure className="onegame-page-figure">
                    <img className="img-responsive onegame-header-img" src={selectedGame.img} alt={`image de ${selectedGame.title}`} />
                </figure>
            </header>
            
            
        </main>
    )
}

export default OneGame