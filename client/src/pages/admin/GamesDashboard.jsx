import { useEffect , useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { token } from "../../context/token"
import { toast } from 'react-toastify'
import  Tiny   from '../../components/Tiny'

const GameDashboard = () => {
   
   const {user} = useAuth()
    
   const [allGames, setAllGames] = useState([])
   const [updatePage, setUpdatePage] = useState(false)
   
   
   /*********** Suppression de jeu *************/
   const [showDeleteModal, setShowDeleteModal] = useState(false)
   const [itemsToDelete, setItemsToDelete] = useState(null)
   
   /************** Ajout de jeu ****************/
   const [createInputValue, setCreateInputValue] = useState({
        title : "",
        summary : "",
        visibility : "",
        mainImg : "",
        otherImg1 : "",
        otherImg2 : "",
        otherImg3 : "",
        otherImg4 : "",
        otherImg5 : "",
        otherImg6 : "",
        paragTitle : ["", "", "", "", "", ""],
        paragText : ["", "", "", "", "", ""]
    })
   const [showCreateModal, setShowCreateModal] = useState(false)
   const [showConfirmCreationModal, setShowConfirmCreateModal] = useState(false)
   
    /************** Modifier le jeu ****************/
   const [editInputValue, setEditInputValue] = useState({
        title : "",
        summary : "",
        visibility : "",
        mainImg : "",
        otherImg1 : "",
        otherImg2 : "",
        otherImg3 : "",
        otherImg4 : "",
        otherImg5 : "",
        otherImg6 : "",
        paragTitle : ["","","","","",""],
        paragText : ["","","","","",""]
    })
   const [showEditModal, setShowEditModal] = useState(false)
   const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
   const [itemsToEdit, setItemsToEdit] = useState(null)


   useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAllGames = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/game/getall`, {headers : token()})
                setAllGames(serverRes.data)
                
    
            } catch (e) {}
            
        }
        
        fetchAllGames()
        
    }, [updatePage])
   
   
   // Fonction qui ferme les modales
   const handleHideModal = () => {
        
        setShowDeleteModal(false)
        setShowEditModal(false)
        setShowConfirmEditModal(false)
        setShowCreateModal(false)
        setShowConfirmCreateModal(false)
        document.body.style.overflow = ""
        setItemsToDelete(null)
        setCreateInputValue({
            title : "",
            summary : "",
            visibility : "",
            mainImg : "",
            otherImg1 : "",
            otherImg2 : "",
            otherImg3 : "",
            otherImg4 : "",
            otherImg5 : "",
            otherImg6 : "",
            paragTitle : ["", "", "", "", "", ""],
            paragText : ["", "", "", "", "", ""]
        })
        
    }
   
   
   /* Fonction qui permet de télécharger des images */
   const handleFileChange = (e, name) => {
       
        const file = e.target.files[0]
        
        
        if (name === "otherImg1") {
            setEditInputValue({ ...editInputValue, otherImg1: e.target.files[0] })
        } else if (name === "otherImg2") {
            setEditInputValue({ ...editInputValue, otherImg2: e.target.files[0] })
        } else if (name === "otherImg3") {
            setEditInputValue({ ...editInputValue, otherImg3: e.target.files[0] })
        } else if (name === "otherImg4") {
            setEditInputValue({ ...editInputValue, otherImg4: e.target.files[0] })
        } else if (name === "otherImg5") {
            setEditInputValue({ ...editInputValue, otherImg5: e.target.files[0] })
        } else if (name === "otherImg6") {
            setEditInputValue({ ...editInputValue, otherImg6: e.target.files[0] })
        } else if (name === "mainImg") {
            setEditInputValue({ ...editInputValue, mainImg: e.target.files[0] })
        }
        
        
        if (name === "otherImg1") {
            setCreateInputValue({ ...createInputValue, otherImg1: e.target.files[0] })
        } else if (name === "otherImg2") {
            setCreateInputValue({ ...createInputValue, otherImg2: e.target.files[0] })
        } else if (name === "otherImg3") {
            setCreateInputValue({ ...createInputValue, otherImg3: e.target.files[0] })
        } else if (name === "otherImg4") {
            setCreateInputValue({ ...createInputValue, otherImg4: e.target.files[0] })
        } else if (name === "otherImg5") {
            setCreateInputValue({ ...createInputValue, otherImg5: e.target.files[0] })
        } else if (name === "otherImg6") {
            setCreateInputValue({ ...createInputValue, otherImg6: e.target.files[0] })
        } else if (name === "mainImg") {
            setCreateInputValue({ ...createInputValue, mainImg: e.target.files[0] })
        }
        
        
    }
   
   
   /*********** Suppression de jeu *************/
   
   // Fonction qui affiche le modal de suppression de jeu
   const showConfirmDeleteModal = (gameIndex) => {
       setShowDeleteModal(true)
       document.body.style.overflow = "hidden"
       setItemsToDelete(gameIndex)
   }
   

   // Fonction qui supprime un jeu
    const handleDelete = async () => {
        
        try {
            
            setUpdatePage(!updatePage)
            setShowDeleteModal(false)
            document.body.style.overflow = ""
        
            const serverRes = await axios.delete(`/api/game/deleteone/${itemsToDelete}`, {headers : token()})
            
            setItemsToDelete(null)
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
   
   
   /************** Ajout de jeu ****************/
   
   /* Fonction qui change la valeur des state en fonction 
    des changements de valeur du formulaire d'ajout de jeu */
   const handleChange = (e, index) => {
        
        const {name, value, files} = e.target
        
        
        if (name === 'paragTitle') {
            const updatedParagTitles = [...createInputValue.paragTitle];
            updatedParagTitles[index] = value;
            setCreateInputValue({ ...createInputValue, paragTitle: updatedParagTitles });
        } else if (name === 'paragText') {
            const updatedParagTexts = [...createInputValue.paragText];
            updatedParagTexts[index] = value;
            setCreateInputValue({ ...createInputValue, paragText: updatedParagTexts });
        } else if (name === "mainImg") {
            setCreateInputValue({ ...createInputValue, mainImg: e.target.files[0] })
        } else {
            setCreateInputValue({...createInputValue, [name] : value})
        }
        
        
    }
   
    
   // Fonction qui affiche le modal de d'ajout d'un jeu
   const showCreate = () => {
       setShowCreateModal(true)
       setShowConfirmCreateModal(false)
       document.body.style.overflow = "hidden"
   }
    
    
   // Fonction qui affiche le modal de confirmation de modification d'un jeu
   const showConfirmCreation = (e) => {
       e.preventDefault()
       
       
      if (createInputValue.title === ""
      || createInputValue.summary === ""
      || createInputValue.visibility === ""
      || createInputValue.mainImg === ""
      || createInputValue.otherImg1 === ""
      || createInputValue.otherImg2 === ""
      || createInputValue.otherImg3 === ""
      || createInputValue.otherImg4 === ""
      || createInputValue.otherImg5 === ""
      || createInputValue.otherImg6 === ""
      || createInputValue.paragTitle.length < 6
      || createInputValue.paragText.length < 6) {
          return toast.error("Veuillez remplir tout les champs et mettre une image par paragraphe")
      } else {
           setShowCreateModal(false)
           setShowConfirmCreateModal(true)
           document.body.style.overflow = "hidden"
      }
   }
   

    // Fonction qui ajoute un nouveau jeu
    const handleCreate = async () => {
        
        try {
            
            
            const formData = new FormData()
            
            
            const {title, summary, visibility, paragTitle, paragText, mainImg, otherImg1, otherImg2, otherImg3, otherImg4, otherImg5, otherImg6} = createInputValue
            
            formData.append("title", title);
            formData.append("summary", summary);
            formData.append("visibility", visibility);
            formData.append("mainImg", mainImg);
            
            formData.append("otherImg1", otherImg1);
            formData.append("otherImg2", otherImg2);
            formData.append("otherImg3", otherImg3);
            formData.append("otherImg4", otherImg4);
            formData.append("otherImg5", otherImg5);
            formData.append("otherImg6", otherImg6);

        
            formData.append("paragTitle", (paragTitle))
            formData.append("paragText", (paragText))

            
            const serverRes = await axios.post(`/api/game/new`, formData, {headers : token()})
            
            
            setUpdatePage(!updatePage)
            handleHideModal()
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    /************** Modifier le jeu ****************/
    
   /* Fonction qui change la valeur des state en fonction 
    des changements de valeur du formulaire de modification de jeu */
   const handleEditChange = (e, index) => {
        
        const { name, value } = e.target
        
        if (name !== "paragTitle" && name !== "paragText") {
            setEditInputValue({...editInputValue, [name] : value})
        } else {
            setEditInputValue(prevState => {
                const updatedArray = [...prevState[name]]
                updatedArray[index] = value
                return {
                    ...prevState,
                    [name]: updatedArray
                }
            })
        }
        
        
    }
    
    
   // Fonction qui affiche le modal de modification d'un jeu
   const showEdit = (e, game) => {
       e.preventDefault()
       setShowEditModal(true)
       setShowConfirmEditModal(false)
       document.body.style.overflow = "hidden"
       setItemsToEdit(game._id)

        setEditInputValue({
            title: game.title,
            summary: game.summary,
            visibility: game.visibility,
            mainImg : game.mainImg,
            otherImg1: game.otherImg[0],
            otherImg2: game.otherImg[1],
            otherImg3: game.otherImg[2],
            otherImg4: game.otherImg[3],
            otherImg5: game.otherImg[4],
            otherImg6: game.otherImg[5],
            paragTitle: [
                game.paragTitle[0], 
                game.paragTitle[1], 
                game.paragTitle[2], 
                game.paragTitle[3], 
                game.paragTitle[4], 
                game.paragTitle[5]
            ],
            paragText: [
                game.paragText[0], 
                game.paragText[1], 
                game.paragText[2], 
                game.paragText[3], 
                game.paragText[4], 
                game.paragText[5]
            ],
        });
        
        console.log(editInputValue)
   }
   
   
   // Fonction qui affiche le modal de confirmation de modification d'un jeu
   const showConfirmEdit = (e) => {
       e.preventDefault()
       setShowEditModal(false)
       setShowConfirmEditModal(true)
       document.body.style.overflow = "hidden"
   }
   
    
   // Fonction qui modifie un jeu
    const handleEdit = async () => {
        
        
        try {
            
            const formData = new FormData()
            
            const {title, summary, visibility, paragTitle, paragText, mainImg, otherImg1, otherImg2, otherImg3, otherImg4, otherImg5, otherImg6} = editInputValue
            
            
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

            
            const serverRes = await axios.put(`/api/game/update/${itemsToEdit}`, formData, {headers : token()})
            
            
            setUpdatePage(!updatePage)
            handleHideModal()
            
            console.log(formData)
            
            return toast.success(serverRes.data.message)
            
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
   
   
   return (
       <main className="container dashboard-main">
       
          <h1>Jeux</h1>
          
          
          <button onClick={showCreate} className="dashboard-create-button">Ajouter un jeu</button>
          
          
          {/******** Tableau des jeux *******/}
          <table className="dashboard-table">
                
                <thead>
                    
                    <tr>
                        <th>Nom du jeu</th>
                        <th className="admin-role-row">Visibilité</th>
                        <th className="admin-lastconnexion-row">Date d'ajout</th>
                        <th className="admin-action-row">Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {allGames.map((oneGame) => (
                        <tr key={oneGame._id}>
                            <td>{oneGame.title}</td>
                            <td className="admin-role-row">{oneGame.visibility === "private" ? "Privé" : "Public"}</td>
                            <td className="admin-lastconnexion-row">{new Date().toLocaleDateString() === new Date(oneGame.createdAt).toLocaleDateString() ?
                                `Aujourd'hui à ${new Date(oneGame.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneGame.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                new Date().getDate() - 1 === new Date(oneGame.createdAt).getDate() && new Date().getMonth() === new Date(oneGame.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneGame.createdAt).getFullYear() ?
                                    `Hier à ${new Date(oneGame.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneGame.createdAt).getMinutes().toString().padStart(2, '0')}` : 
                                    new Date().getDate() - 2 === new Date(oneGame.createdAt).getDate() && new Date().getMonth() === new Date(oneGame.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneGame.createdAt).getFullYear() ?
                                        `Avant-hier à ${new Date(oneGame.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneGame.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                        new Date().getDate() - 5 < new Date(oneGame.createdAt).getDate() && new Date().getMonth() === new Date(oneGame.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneGame.createdAt).getFullYear() ?
                                            new Date(oneGame.createdAt).toLocaleDateString('fr-FR', { weekday: 'long' }) + ` à ${new Date(oneGame.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneGame.createdAt).getMinutes().toString().padStart(2, '0')}`:
                                            `le ${new Date(oneGame.createdAt).getDate()} ${new Date(oneGame.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + " "} à ${new Date(oneGame.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneGame.createdAt).getMinutes().toString().padStart(2, '0')}`}
                            </td>
                            <td className="admin-action-row">
                                <div>
                                    <NavLink onClick={(e) => showEdit(e, oneGame)} className="dashboard-update-button">Modifier</NavLink>
                                    <NavLink onClick={() => showConfirmDeleteModal(oneGame._id)} className="dashboard-delete-button">Supprimer</NavLink>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            
            
            {/****** Modal de suppression d'un jeu ******/}
            {showDeleteModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Voulez-vous vraiment supprimer ce jeu ?</p>
                        <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> 
                    </dialog>
                </>
            )}
            
            
            {/****** Modal d'ajout d'un nouveau jeu ******/}
            {showCreateModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <h2>Ajouter un nouveau jeu</h2>
                        
                        <form encType="multipart/form-data" onSubmit={showConfirmCreation}>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={createInputValue.title} onChange={handleChange} name="title" type="text" className="loginpage-input" required />
                                <label htmlFor="title" >Nom du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={createInputValue.summary} onChange={handleChange} name="summary" type="text" className="loginpage-textarea" required />
                                <label htmlFor="summary" >Résumé</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input onChange={(e) => handleFileChange(e, "mainImg")} id="mainImg" name="mainImg" type="file"  className="loginpage-input" />
                                <label htmlFor="mainImg" >Image principale du jeu</label>
                             </fieldset>
                              
                            <h3>Description du jeu</h3>
                            
                            {/**** 1er Paragraphe *****/}
                            <p>1er paragraphe</p>
                            
                             <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg1")}
                                    id={`otherImg1`}
                                    name="otherImg1"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg1`}>2ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={createInputValue.paragTitle[0]} onChange={(e) => handleChange(e, 0)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >1er sous-titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={createInputValue.paragText[0]} onChange={(e) => handleChange(e, 0)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > 1er paragraphe</label>
                            </fieldset>
                             
                             
                             {/**** 2ème Paragraphe *****/}
                             <p>2ème paragraphe</p>
                             
                             <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg2")}
                                    id={`otherImg2`}
                                    name="otherImg2"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg2`}>3ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={createInputValue.paragTitle[1]} onChange={(e) => handleChange(e, 1)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >2ème sous-titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={createInputValue.paragText[1]} onChange={(e) => handleChange(e, 1)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > 2ème paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 3ème Paragraphe *****/}
                            <p>3ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg3")}
                                    id={`otherImg3`}
                                    name="otherImg3"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg3`}>4ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={createInputValue.paragTitle[2]} onChange={(e) => handleChange(e, 2)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >3ème sous-titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={createInputValue.paragText[2]} onChange={(e) => handleChange(e, 2)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > 3ème paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 4ème Paragraphe *****/}
                            <p>4ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg4")}
                                    id={`otherImg4`}
                                    name="otherImg4"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg4`}>5ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={createInputValue.paragTitle[3]} onChange={(e) => handleChange(e, 3)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >4ème sous-titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={createInputValue.paragText[3]} onChange={(e) => handleChange(e, 3)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > 4ème paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 5ème Paragraphe *****/}
                            <p>5ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg5")}
                                    id={`otherImg5`}
                                    name="otherImg5"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg5`}>6ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={createInputValue.paragTitle[4]} onChange={(e) => handleChange(e, 4)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >5ème sous-titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={createInputValue.paragText[4]} onChange={(e) => handleChange(e, 4)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > 5ème paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 6ème Paragraphe *****/}
                            <p>6ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg6")}
                                    id={`otherImg6`}
                                    name="otherImg6"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg6`}>7ème image du jeu</label>
                            </fieldset>
                            
                             <fieldset className="loginpage-input-label">
                                <input value={createInputValue.paragTitle[5]} onChange={(e) => handleChange(e, 5)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >6ème sous-titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={createInputValue.paragText[5]} onChange={(e) => handleChange(e, 5)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > 6ème paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** Visibilité *****/}
                             <fieldset className="role-fieldset">
                                <label>Visibilité</label>
                                
                                <div>
                                    <input
                                        type="radio"
                                        id="visibilityPublic"
                                        name="visibility"
                                        value="public"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="visibilityPublic">Public</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="visibilityPrivate"
                                        name="visibility"
                                        value="private"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="visibilityPrivate">Privée</label>
                                </div>
                            
                            </fieldset>
                             
                            
                            <button className="modal-confirm-button" type="submit">Valider</button>
                            
                        </form>
                        
                    </dialog>
                </>
            )}
            
            
            {/****** Modal de confirmation de d'ajout d'un nouveau jeu ******/}
            {showConfirmCreationModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Voulez-vous vraiment ajouter ce jeu ?</p>
                        <button className="modal-confirm-button"  onClick={() => handleCreate()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> 
                    </dialog>
                </>
            )}
            
            
            
            {/****** Modal de modification d'un jeu ******/}
            {showEditModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <h2>Modifier informations du jeu</h2>
                        
                        <form encType="multipart/form-data" onSubmit={showConfirmEdit}>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={editInputValue.title} onChange={handleEditChange} name="title" type="text" className="loginpage-input" required />
                                <label htmlFor="title" >Titre du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={editInputValue.summary} onChange={handleEditChange} name="summary" type="text" className="loginpage-input" required />
                                <label htmlFor="summary" >Résumé du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input onChange={(e) => handleFileChange(e, "mainImg")} id="mainImg" name="mainImg" type="file"  className="loginpage-input" />
                                <label htmlFor="mainImg" >Image principale du jeu</label>
                             </fieldset>
                              
                            <h3>Description du jeu</h3>
                            
                            {/**** 1er Paragraphe *****/}
                            <p>1er paragraphe</p>
                            
                             <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg1")}
                                    id={`otherImg1`}
                                    name="otherImg1"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg1`}>2ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={editInputValue.paragTitle[0]} onChange={(e) => handleEditChange(e, 0)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >Titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={editInputValue.paragText[0]} onChange={(e) => handleEditChange(e, 0)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > Paragraphe</label>
                            </fieldset>
                             
                             
                             {/**** 2ème Paragraphe *****/}
                             <p>2ème paragraphe</p>
                             
                             <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg2")}
                                    id={`otherImg2`}
                                    name="otherImg2"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg2`}>3ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={editInputValue.paragTitle[1]} onChange={(e) => handleEditChange(e, 1)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >Titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={editInputValue.paragText[1]} onChange={(e) => handleEditChange(e, 1)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > Paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 3ème Paragraphe *****/}
                            <p>3ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg3")}
                                    id={`otherImg3`}
                                    name="otherImg3"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg3`}>4ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={editInputValue.paragTitle[2]} onChange={(e) => handleEditChange(e, 2)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >Titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={editInputValue.paragText[2]} onChange={(e) => handleEditChange(e, 2)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > Paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 4ème Paragraphe *****/}
                            <p>4ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg4")}
                                    id={`otherImg4`}
                                    name="otherImg4"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg4`}>5ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={editInputValue.paragTitle[3]} onChange={(e) => handleEditChange(e, 3)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >Titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={editInputValue.paragText[3]} onChange={(e) => handleEditChange(e, 3)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" >Paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 5ème Paragraphe *****/}
                            <p>5ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg5")}
                                    id={`otherImg5`}
                                    name="otherImg5"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg5`}>6ème image du jeu</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={editInputValue.paragTitle[4]} onChange={(e) => handleEditChange(e, 4)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >Titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={editInputValue.paragText[4]} onChange={(e) => handleEditChange(e, 4)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" >Paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** 6ème Paragraphe *****/}
                            <p>6ème paragraphe</p>
                            
                            <fieldset className="loginpage-input-label">
                                <input
                                    onChange={(e) => handleFileChange(e, "otherImg6")}
                                    id={`otherImg6`}
                                    name="otherImg6"
                                    type="file"
                                    className="loginpage-input"
                                />
                                <label htmlFor={`otherImg6`}>7ème image du jeu</label>
                            </fieldset>
                            
                             <fieldset className="loginpage-input-label">
                                <input value={editInputValue.paragTitle[5]} onChange={(e) => handleEditChange(e, 5)} name="paragTitle" type="text" className="loginpage-input" required />
                                <label htmlFor="paragTitle" >Titre</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-textarea-label">
                                <textarea value={editInputValue.paragText[5]} onChange={(e) => handleEditChange(e, 5)} name="paragText" type="text" className="loginpage-textarea" required />
                                <label htmlFor="paragText" > Paragraphe</label>
                            </fieldset>
                            
                            
                            {/**** Visibilité *****/}
                             <fieldset className="role-fieldset">
                                <label>Visibilité</label>
                                
                                <div>
                                    <input
                                        type="radio"
                                        id="visibilityPublic"
                                        name="visibility"
                                        value="public"
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <label htmlFor="visibilityPublic">Public</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="visibilityPrivate"
                                        name="visibility"
                                        value="private"
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <label htmlFor="visibilityPrivate">Privée</label>
                                </div>
                            
                            </fieldset>
                             
                            
                            <button className="modal-confirm-button" type="submit">Valider</button>
                            
                        </form>
                        
                    </dialog>
                </>
            )}
            
            
            {/****** Modal de confirmation de modification d'un jeu ******/}
            {showConfirmEditModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => showEdit()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Voulez-vous vraiment effectuer ces changements ?</p>
                        <button className="modal-confirm-button"  onClick={() => handleEdit()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => showEdit()}>Annuler</button> 
                    </dialog>
                </>
            )}
            
       </main>
   ) 
}

export default GameDashboard