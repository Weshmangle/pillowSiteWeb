import { useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { useAuth } from '../context/AuthContext'
import  Tiny   from '../components/Tiny'
import axios from 'axios'
import { token } from "../context/token"

const OneGame = () => {
    
    const {gameId} = useParams()
    const {user} = useAuth()
    
    // const gamesArray = [
    //     {
    //         id : 0,
    //         title : "Pirate Yacht 1",
    //         summary: "",
    //         img: "../../image1jeu1.jpg",
    //         otherImg: ["../../image2jeu1.jpg", "../../image3jeu1.jpg", "../../image4jeu1.jpg"],
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
    //         otherImg: ["../../image2jeu2.jpg", "../../image1jeu2.jpg", "../../image4jeu2.jpg"],
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
    //         otherImg: ["../../image1jeu3.jpg", "../../image3jeu3.jpg"],
    //         paragTitle: ["Lorem Ipsum", "Lorem Ipsum"],
    //         paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi."]
    //     },
    //     {
    //         id : 3,
    //         title : "Pirate Yacht 4",
    //         summary: "",
    //         img: "../../image2jeu4.jpg",
    //         otherImg: ["../../image1jeu4.jpg", "../../image3jeu4.jpg"],
    //         paragTitle: ["Lorem Ipsum", "Lorem Ipsum"],
    //         paragText: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi.",
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eget magna vel sodales. Proin vel sapien id nisi laoreet tincidunt. Vivamus tempus eros at metus vulputate, ut sodales justo congue. Nullam scelerisque, purus vel vestibulum sodales, tortor justo gravida purus, sit amet ullamcorper libero elit id mi."]
    //     }
    //     ]
    // const oneGame = gamesArray[gameId]
    
    const [oneGame, setOneGame] = useState([])
    const [updatePage, setUpdatePage] = useState(false)
    const [editSectionIndex, setEditSectionIndex] = useState(null)
    const [editGameName, setEditGameName] = useState(false)
    const [showMainImgFileInput, setShowMainImgFileInput] = useState(false)
    const [editOtherImgFileInput, setEditOtherImgFileInput] = useState(null)
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
    
    const [editInputValue, setEditInputValue] = useState({
        title : "",
        summary : "",
        visibility : "",
        mainImg : "",
        otherImg: ["","","","","",""],
        paragTitle : ["","","","","",""],
        paragText : ["","","","","",""]
    })

    
    useEffect(() => {
        
        /* Scroll remis à zéro */
        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchOneGame = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/game/getone/${gameId}`)
                setOneGame(serverRes.data)
                setEditInputValue({
                    title: serverRes.data.title,
                    summary: serverRes.data.summary,
                    visibility: serverRes.data.visibility,
                    mainImg : serverRes.data.mainImg,
                    otherImg : [serverRes.data.otherImg[0],
                        serverRes.data.otherImg[1],
                        serverRes.data.otherImg[2],
                        serverRes.data.otherImg[3],
                        serverRes.data.otherImg[4],
                        serverRes.data.otherImg[5]
                    ],
                    paragTitle: [
                        serverRes.data.paragTitle[0], 
                        serverRes.data.paragTitle[1], 
                        serverRes.data.paragTitle[2], 
                        serverRes.data.paragTitle[3], 
                        serverRes.data.paragTitle[4], 
                        serverRes.data.paragTitle[5]
                    ],
                    paragText: [
                        serverRes.data.paragText[0], 
                        serverRes.data.paragText[1], 
                        serverRes.data.paragText[2], 
                        serverRes.data.paragText[3], 
                        serverRes.data.paragText[4], 
                        serverRes.data.paragText[5]
                    ],
                })
                
            } catch (e) {}
            
        }
        
        fetchOneGame()
        
        
        /* Fonction pour l'effet parallax */
        const handleScroll = () => {
            
            const yPos = window.scrollY
            const parallaxElements = document.querySelectorAll('.parallax-img, .game-parallax-img')
            
            parallaxElements.forEach(element => {
                const scrollSpeed = parseFloat(element.getAttribute('data-scroll-speed'))
                element.style.transform = `translateY(${yPos * scrollSpeed}px)`
            })
            
        }
        
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
        
    }, [updatePage])
    
    
    // setTimeout() Pour charger les images
    
    
    /* Fonction qui permet de télécharger des images */
    const handleFileChange = (e, name) => {
       
        const file = e.target.files[0]
        
        const {otherImg} = editInputValue
        
        if (name === "otherImg1") {
            setEditInputValue([ ...otherImg[0] = e.target.files[0] ])
        } else if (name === "otherImg2") {
            setEditInputValue([ ...eotherImg[1] = e.target.files[0] ])
        } else if (name === "otherImg3") {
            setEditInputValue([ ...otherImg[2] = e.target.files[0] ])
        } else if (name === "otherImg4") {
            setEditInputValue([ ...otherImg[3] = e.target.files[0] ])
        } else if (name === "otherImg5") {
            setEditInputValue([ ...otherImg[4] = e.target.files[0] ])
        } else if (name === "otherImg6") {
            setEditInputValue([ ...otherImg[5] = e.target.files[0] ])
        } else if (name === "mainImg") {
            setEditInputValue({ ...editInputValue, mainImg: e.target.files[0] })
        }
        
    }
    
    
    const handleShowEditor = (index) => {
        setEditSectionIndex(index)
        setEditGameName(false)
    }

    
    const handleHideEditor = () => {
        setEditSectionIndex(null)
        setEditInputValue({
            title: oneGame.title,
            summary: oneGame.summary,
            visibility: oneGame.visibility,
            mainImg : oneGame.mainImg,
            otherImg: [oneGame.otherImg[0],
                oneGame.otherImg[1],
                oneGame.otherImg[2],
                oneGame.otherImg[3],
                oneGame.otherImg[4],
                oneGame.otherImg[5]
            ],
            paragTitle: [
                oneGame.paragTitle[0], 
                oneGame.paragTitle[1], 
                oneGame.paragTitle[2], 
                oneGame.paragTitle[3] || "", 
                oneGame.paragTitle[4] || "", 
                oneGame.paragTitle[5] || ""
            ],
            paragText: [
                oneGame.paragText[0], 
                oneGame.paragText[1], 
                oneGame.paragText[2], 
                oneGame.paragText[3] || "", 
                oneGame.paragText[4] || "", 
                oneGame.paragText[5] || ""
            ],
        })
    }
    
    
    const toggleGameNameInput = () => {
        setEditGameName(!editGameName)
        setEditSectionIndex(null)
        setEditInputValue({
            title: oneGame.title,
            summary: oneGame.summary,
            visibility: oneGame.visibility,
            mainImg : oneGame.mainImg,
            otherImg: [oneGame.otherImg[0],
                oneGame.otherImg[1],
                oneGame.otherImg[2],
                oneGame.otherImg[3],
                oneGame.otherImg[4],
                oneGame.otherImg[5]
            ],
            paragTitle: [
                oneGame.paragTitle[0], 
                oneGame.paragTitle[1], 
                oneGame.paragTitle[2], 
                oneGame.paragTitle[3] || "", 
                oneGame.paragTitle[4] || "", 
                oneGame.paragTitle[5] || ""
            ],
            paragText: [
                oneGame.paragText[0], 
                oneGame.paragText[1], 
                oneGame.paragText[2], 
                oneGame.paragText[3] || "", 
                oneGame.paragText[4] || "", 
                oneGame.paragText[5] || ""
            ],
        })
    }
    
    
    const handleChange = (e, index) => {
        const { name, value } = e.target
        
        if (name !== `paragTitle[${index}]` && name !== `paragText[${index}]`) {
            setEditInputValue({ ...editInputValue, [name]: value })
        } else {
            setEditInputValue(prevState => {
                const updatedArray = [...prevState[name.split('[')[0]]]
                updatedArray[index] = value
                return {
                    ...prevState,
                    [name.split('[')[0]]: updatedArray
                }
            })
        }
        
    }
    
    
    const toggleMainImgFileInput = () => {
        setShowMainImgFileInput(!showMainImgFileInput)
        setEditSectionIndex(null)
        setEditGameName(false)
        
        if (showMainImgFileInput) {
            document.body.style.overflow = ""
        } else if (!showMainImgFileInput) {
            document.body.style.overflow = "hidden"
        }
        
        setEditInputValue({
            title: oneGame.title,
            summary: oneGame.summary,
            visibility: oneGame.visibility,
            mainImg : oneGame.mainImg,
            otherImg: [oneGame.otherImg[0],
                oneGame.otherImg[1],
                oneGame.otherImg[2],
                oneGame.otherImg[3],
                oneGame.otherImg[4],
                oneGame.otherImg[5]
            ],
            paragTitle: [
                oneGame.paragTitle[0], 
                oneGame.paragTitle[1], 
                oneGame.paragTitle[2], 
                oneGame.paragTitle[3] || "", 
                oneGame.paragTitle[4] || "", 
                oneGame.paragTitle[5] || ""
            ],
            paragText: [
                oneGame.paragText[0], 
                oneGame.paragText[1], 
                oneGame.paragText[2], 
                oneGame.paragText[3] || "", 
                oneGame.paragText[4] || "", 
                oneGame.paragText[5] || ""
            ],
        })
    }
    
    
    const displayOtherImgFileInput = (index) => {
        setEditSectionIndex(null)
        setEditGameName(false)
        setEditOtherImgFileInput(index)
        document.body.style.overflow = "hidden"
        setEditInputValue({
            title: oneGame.title,
            summary: oneGame.summary,
            visibility: oneGame.visibility,
            mainImg : oneGame.mainImg,
            otherImg: [oneGame.otherImg[0],
                oneGame.otherImg[1],
                oneGame.otherImg[2],
                oneGame.otherImg[3],
                oneGame.otherImg[4],
                oneGame.otherImg[5]
            ],
            paragTitle: [
                oneGame.paragTitle[0], 
                oneGame.paragTitle[1], 
                oneGame.paragTitle[2], 
                oneGame.paragTitle[3] || "", 
                oneGame.paragTitle[4] || "", 
                oneGame.paragTitle[5] || ""
            ],
            paragText: [
                oneGame.paragText[0], 
                oneGame.paragText[1], 
                oneGame.paragText[2], 
                oneGame.paragText[3] || "", 
                oneGame.paragText[4] || "", 
                oneGame.paragText[5] || ""
            ],
        })
    }
    
    
    const hideOtherImgFileInput = () => {
        setEditOtherImgFileInput(null)
        document.body.style.overflow = ""
    }
    
    
    // Fonction qui affiche le modal de confirmation de modification d'un jeu
    const showConfirmEdit = (e) => {
       e.preventDefault()
       setShowConfirmEditModal(true)
       setEditOtherImgFileInput(null)
       setShowMainImgFileInput(false)
       document.body.style.overflow = "hidden"
    }
   
   
   // Fonction qui ferme les modales
   const handleHideModal = () => {
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        setEditSectionIndex(null)
        setEditGameName(false)
    }
    
   
    // Fonction qui modifie le jeu
    const handleEdit = async () => {
        
        
        try {
            
            const formData = new FormData()
            
            const {title, summary, visibility, paragTitle, paragText, mainImg, otherImg} = editInputValue
            
            const otherImg1 = otherImg[0]
            const otherImg2 = otherImg[1]
            const otherImg3 = otherImg[2]
            const otherImg4 = otherImg[3]
            const otherImg5 = otherImg[4]
            const otherImg6 = otherImg[5]
            
            
            formData.append("title", title)
            formData.append("summary", summary)
            formData.append("visibility", visibility)
            formData.append("mainImg", mainImg)
            
            formData.append("otherImg1", otherImg1)
            formData.append("otherImg2", otherImg2)
            formData.append("otherImg3", otherImg3)
            formData.append("otherImg4", otherImg4)
            formData.append("otherImg5", otherImg5)
            formData.append("otherImg6", otherImg6)

        
            formData.append("paragTitle", (paragTitle))
            formData.append("paragText", (paragText))

            
            const serverRes = await axios.put(`/api/game/update/${gameId}`, formData, {headers : token()})
            
            
            handleHideModal()
            
            setUpdatePage(!updatePage)
            
            setIsLoading(true)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }

    
    return (
        <main className="onegame-page-main container">
        
        
            {/***** En-tête de la page *****/}
            <header className="onegame-page-header">
            
                <figure className="onegame-page-figure parallax-img-container">
                    {user && user.userToken && <i onClick={toggleMainImgFileInput} className="fa-solid fa-pen admin-update-pen"></i>}
                    <img loading="lazy" className="img-responsive parallax-img onegame-header-img" src={`${import.meta.env.VITE_API_URL}${editInputValue.mainImg}`} alt={`image principal du jeu ${editInputValue.title}`} data-scroll-speed="0.5" />}
                    
                    {showMainImgFileInput && (
                        <>
                            <form>
                                <div onClick={() => toggleMainImgFileInput()} className="modal-background"></div>
                                <input onChange={(e) => handleFileChange(e, "mainImg")} id="mainImg" name="mainImg" type="file"  className="liveupdate-gamepage-input-file" />
                                <button onClick={showConfirmEdit} className="liveupdate-gamepage-mainImg-confirm-button">Valider</button>
                                <button onClick={toggleMainImgFileInput} className="liveupdate-gamepage-mainImg-cancel-button">Annuler</button>
                            </form>
                        </>
                    )}
                    
                    {!editGameName ? (
                        <h1 className="onegame-page-selectedgame-title">{oneGame.title}   {user && user.userToken && <i onClick={toggleGameNameInput} className="fa-solid fa-pen update-title-pen"></i>}</h1>
                    )
                    : (
                        <>
                          <form>
                              <fieldset className="liveupdate-gamepage-title-input-label">
                                    <label htmlFor="title" >Nom du jeu</label>
                                    <input value={editInputValue.title} onChange={handleChange} name="title" type="text" required />
                                </fieldset>
                                <button onClick={showConfirmEdit} className="liveupdatepage-title-confirm-button">Valider</button>
                                <button onClick={toggleGameNameInput} className="liveupdatepage-title-cancel-button">Annuler</button>
                          </form>
                        </>
                    )}
                    
                </figure>
                
            </header>
            
            
            {/******* Contenu principal *****/}
            <article className="onegame-page-article">
            
                {/***** Sections de présentation du jeu *******/}
                {editInputValue.otherImg.map((oneSection, index) => (
                
                    <section className="onegame-page-selectedgame" key={index}>
                    
                        {/***** Bloc avec image du jeu *****/}
                        <figure className="onegame-page-selectedgame-figure game-parallax-img-container">
                            {user && user.userToken && <i onClick={() => displayOtherImgFileInput(index)} className="fa-solid fa-pen admin-update-pen"></i>}
                            {editOtherImgFileInput === index && (
                                <>
                                    <form>
                                        <div onClick={() => hideOtherImgFileInput()} className="file-edit-background"></div>
                                        <input onChange={(e) => handleFileChange(e, `otherImg${index+1}`)} id="otherImg" name="otherImg" type="file"  className="liveupdate-gamepage-other-input-file" />
                                        <button onClick={showConfirmEdit} className="liveupdate-gamepage-otherImg-confirm-button">Valider</button>
                                        <button onClick={() => hideOtherImgFileInput()} className="liveupdate-gamepage-otherImg-cancel-button">Annuler</button>
                                    </form>
                                </>
                            )}
                            <img loading="lazy" className="game-parallax-img" src={import.meta.env.VITE_API_URL+oneSection} alt={`une image de ${editInputValue.title}`} data-scroll-speed="0.1" />
                        </figure>


                        {/*** Bloc avec le texte descriptif ***/}
                        <section className="onegame-page-selectedgame-section">
                            
                            {editSectionIndex !== index ? (
                                <>
                                    <h1 className="onegame-page-section-title">
                                        {editInputValue.paragTitle[index]} {user && user.userToken && <i onClick={() => handleShowEditor(index)} className="fa-solid fa-pen admin-update-pen"></i>}
                                    </h1>
                                    <p>{editInputValue.paragText[index]}</p>
                                </>
                            ) : (
                                <>
                                    <fieldset className="liveupdate-gamepage-input-label">
                                        <input value={editInputValue.paragTitle[index]} onChange={(e) => handleChange(e, index)} name={`paragTitle[${index}]`} type="text" className="loginpage-input" required />
                                        <label htmlFor={`paragTitle[${index}]`}>Titre</label>
                                    </fieldset>

                                    <fieldset className="liveupdate-gamepage-textarea-label">
                                        <textarea value={editInputValue.paragText[index]} onChange={(e) => handleChange(e, index)} name={`paragText[${index}]`} type="text" className="loginpage-textarea" required />
                                        <label htmlFor={`paragText[${index}]`}>Paragraphe</label>
                                    </fieldset>

                                    <button onClick={showConfirmEdit} className="liveupdatepage-confirm-button">Valider</button>
                                    <button onClick={handleHideEditor} className="liveupdatepage-cancel-button">Annuler</button>
                                </>
                            )}
                            
                        </section>
                        
                    </section>
                    
                ))}
                
            </article>
            
            
            {/****** Modal de confirmation de modification d'un jeu ******/}
            {showConfirmEditModal && (
                <>
                    <div onClick={handleHideModal} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={handleHideModal} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Voulez-vous vraiment effectuer ces changements ?</p>
                        <button className="modal-confirm-button"  onClick={handleEdit}>Confirmer</button> <button className="modal-cancel-button" onClick={handleHideModal}>Annuler</button> 
                    </dialog>
                </>
            )}
            
        </main>
    )
}

export default OneGame