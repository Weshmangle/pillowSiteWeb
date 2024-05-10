import { useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'


const OneGame = () => {
    
    const {gameId} = useParams()
    
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
    
    const selectedGame = gamesArray[gameId]
    
    const evenNumber = /^-?\d*[02468]$/
    
    const [counter, setCounter] = useState(0)
    

    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
    }, []);
    
    
    
    return (
        <main className="onegame-page-main container">
            <header className="onegame-page-header">
                <figure className="onegame-page-figure">
                    <img className="img-responsive onegame-header-img" src={selectedGame.img} alt={`image de ${selectedGame.title}`} />
                </figure>
            </header>
            
            <article className="onegame-page-article">
                <h1 className="onegame-page-selectedgame-title">{selectedGame.title}</h1>
                
                {selectedGame.gameFootage.map((oneSection, index) => (
                    <section className={evenNumber.test(index) ? `onegame-page-selectedgame` : `onegame-page-selectedgame-inverted`} key={index}>
                        <figure className="onegame-page-selectedgame-figure">
                            <img className="img-responsive" src={oneSection} alt="" />
                        </figure>
                        
                        <section className="onegame-page-selectedgame-section">
                            <h1 className="onegame-page-section-title">{selectedGame.paragTitle[index]}</h1>
                            <p>{selectedGame.paragText[index]}</p>
                        </section>
                    </section>
                ))}
            </article>
            
            
        </main>
    )
}

export default OneGame