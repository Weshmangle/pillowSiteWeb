import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { token } from "../context/token"
import { toast } from 'react-toastify'


const Studio = () => {
    
    const {user} = useAuth()
    
    const [editInputValue, setEditInputValue] = useState({
        title : "",
        teamMember : [{},{},{},{},{},{}],
        paragTitle : ["","","","",""],
        paragText : ["","","","",""]
    })
    const [studioPageData, setStudioPageData] = useState({
        title : "",
        teamMember : [{},{},{},{},{},{}],
        paragTitle : ["","","","",""],
        paragText : ["","","","",""]
    })
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
    const [editMemberImg, setEditMemberImg] = useState(null)
    const [editPageTitle, setEditPageTitle] = useState(false)
    const [editSectionIndex, setEditSectionIndex] = useState(null)
    const [editCardIndex, setEditCardIndex] = useState(null)
    const [updatePage, setUpdatePage] = useState(false)
    
    /* Id du document MongoDB qui contient les données des images */
    const studioPageId = "6659e3e30f89f9ec4aa3e5db"
    
    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
        document.body.style.overflow = ""
        
        const fetchStudioPage = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/studio/get/${studioPageId}`)
                setEditInputValue(serverRes.data)
                setStudioPageData(serverRes.data)
                
            } catch (e) {}
            
        }
        
        fetchStudioPage()
        
    }, [updatePage])
    
    
    /* Fonction qui mets à jour les states en fonction des valeurs des inputs */
    const handleChange = (e, index) => {
        
        const {name, value} = e.target
        
         if (name === "name" || name === "role") {
             
            setEditInputValue(prevState => {
                
                const updatedTeamMembers = [...prevState.teamMember]
                updatedTeamMembers[index] = { ...updatedTeamMembers[index], [name]: value }
                return { ...prevState, teamMember: updatedTeamMembers }
            
            })
            
        } else if (name !== `paragTitle[${index}]` && name !== `paragText[${index}]`) {
            
            setEditInputValue(prevState => ({ ...prevState, [name]: value }))
        
        } else {
            
            setEditInputValue(prevState => {
                
                const updatedArray = [...prevState[name.split('[')[0]]]
                updatedArray[index] = value
                return { ...prevState, [name.split('[')[0]]: updatedArray }
            
            })
        }
        
    }
    
    
    /* Fonction qui cache les inputs qui servent à modifier un paragraphe et les données de l'équipe */
    const handleHideEditor = () => {
        setEditSectionIndex(null)
        setEditInputValue(studioPageData)
        setEditCardIndex(null)
    }
    
    
    /* Fonction qui ferme le modal de confirmation de modification */
    const handleHideModal = () => {
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
    }
    
    
    /* Fonction qui affiche le modal de confirmation de modification */
    const showConfirmEdit = (e) => {
        e.preventDefault()
        document.body.style.overflow = "hidden"
        setShowConfirmEditModal(true)
        setEditMemberImg(null)
        setEditCardIndex(null)
    }



/********** Modifier les membres de l'équipe **********/
     /* Fonction qui permet de télécharger des images */
    const handleFileChange = (e, index) => {
        
        const file = e.target.files[0]
        
        if (file) {
            
            setEditInputValue(prevState => {
                
                const updatedTeamMember = prevState.teamMember.map((member, i) => {
                    if (i === index) {
                        
                        return { ...member, memberImg: file }
                    
                    } else {
                        
                        return { ...member }
                    }
                })
    
                return { ...prevState, teamMember: updatedTeamMember };
            
            })
        }
    }
    
    
    /* Fonction qui affiche input de type file pour modifier image des membres de l'équipe */
    const displayFileInput = (index) => {
        document.body.style.overflow = "hidden"
        setEditMemberImg(index)
        handleHideEditor()
        setEditPageTitle(false)
    }
    
    
    /* Fonction qui cache l'input de type file qui permet de modifier l'image des membres de l'équipe */
    const hideFileInput = () => {
        setEditMemberImg(null)
        document.body.style.overflow = ""
        setEditInputValue(studioPageData)
    }
    
    
    /* Fonction qui affiche et cache l'input pour modifier le titre de la page */
    const togglePageTitleInput = () => {
        setEditPageTitle(!editPageTitle)
        handleHideEditor()
    }
 
    
    
/********* Modifier les paragraphes de la page ********/
    /* Fonction qui affiche les inputs qui servent à modifier un paragraphe */
    const handleShowEditor = (index) => {
        setEditSectionIndex(index)
        setEditPageTitle(false)
        setEditInputValue(studioPageData)
        setEditCardIndex(null)
    }
    
    
    /* Fonction qui affiche les inputs qui servent à modifier les données des membres */
    const handleShowCardEditor = (index) => {
        setEditCardIndex(index)
        setEditSectionIndex(null)
        setEditPageTitle(false)
        setEditInputValue(studioPageData)
    }
    
    
    /* Fonction qui soumet les changements et envoie la requête put au serveur */
    const handleEdit = async () => {
        
       try {
            
            const formData = new FormData()
            
            const { title, paragTitle, paragText, teamMember } = editInputValue;

            const processedTeamMembers = teamMember.map((member, index) => {
                
                if (member.memberImg instanceof File) {
                    formData.append(`memberImg[${index}]`, member.memberImg)
                }
                
                return { ...member, memberImg: member.memberImg instanceof File ? "" : member.memberImg }
            
            })
            
            
            
            formData.append("title", title);
            formData.append("teamMember", JSON.stringify(processedTeamMembers));
            formData.append("paragTitle", JSON.stringify(paragTitle));
            formData.append("paragText", JSON.stringify(paragText));
    
            const serverRes = await axios.put(`/api/studio/update/${studioPageId}`, formData, { headers: token() });
    
            setUpdatePage(!updatePage)
            handleHideModal()
            setEditSectionIndex(null)
            setEditSectionIndex(null)
            
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    
    return (
        <main className="studio-page-main">
        
            {!editPageTitle ? (
            
                <h1 className="studio-page-title">{editInputValue.title}{user && user.userToken && <i onClick={togglePageTitleInput} className="fa-solid fa-pen admin-studio-update-pen"></i>}</h1>
            
            ) : (
            
                <>
                  <form encType="multipart/form-data" className="studio-page-edit-form">
                      
                      <fieldset className="loginpage-input-label">
                            <input value={editInputValue.title} onChange={handleChange} name="title" type="text" required />
                            <label htmlFor="title" >Titre de la page</label>
                        </fieldset>
                        
                        <button onClick={showConfirmEdit} className="liveupdatepage-confirm-button">Valider</button>
                        <button onClick={togglePageTitleInput} className="liveupdatepage-cancel-button">Annuler</button>
                  
                  </form>
                </>
            )}
            
            
            {/****** Contenu de la page **********/}
            <article className="studio-page-article">
            
                {editInputValue.paragTitle.map((oneParag, index) => (
                    
                    <React.Fragment key={index}>
                        {/**** Section avec un titre et un paragraphe ****/}
                        <section key={index} className="studio-page-section">
                        
                            {editSectionIndex !== index ? (
                            
                                <>
                                    <h2>{oneParag}</h2>{user && user.userToken && <i onClick={() => handleShowEditor(index)} className="fa-solid fa-pen admin-studio-update-pen"></i>}
                                    <p className="studio-page-paragraph">{editInputValue.paragText[index]}</p>
                                </>
                                
                            ) : (
                                
                                <form encType="multipart/form-data" className="studio-page-edit-form">
                                    
                                    <fieldset className="loginpage-input-label">
                                        <input value={editInputValue.paragTitle[index]} onChange={(e) => handleChange(e, index)} name={`paragTitle[${index}]`} type="text" className="loginpage-input" required />
                                        <label htmlFor={`paragTitle[${index}]`}>Titre</label>
                                    </fieldset>
        
                                    <fieldset className="studiopage-textarea-label">
                                        <textarea value={editInputValue.paragText[index]} onChange={(e) => handleChange(e, index)} name={`paragText[${index}]`} type="text" className="loginpage-textarea" required />
                                        <label htmlFor={`paragText[${index}]`}>Paragraphe</label>
                                    </fieldset>
        
                                    <button onClick={showConfirmEdit} className="liveupdatepage-confirm-button">Valider</button>
                                    <button onClick={handleHideEditor} className="liveupdatepage-cancel-button">Annuler</button>
                                
                                </form>
                                
                            )}
                            
                        </section>
                    </React.Fragment>
                    
                ))}
                
            {/***** Section présentation de l'équipe *****/}
                <section>
                
                    <h2> Notre équipe </h2>
                    
                    <div className="studio-page-team-flex">
                    
                        {editInputValue.teamMember.map((oneMember, index) => (
                        
                            <React.Fragment key={index}>
                                <section className="studio-page-team-cards">
                                    
                                    {user && user.userToken && <i onClick={() => displayFileInput(index)} className="fa-solid fa-pen admin-studio-update-memberImg-pen"></i>}
                                    <img className="img-responsive" src={import.meta.env.VITE_API_URL+oneMember.memberImg} alt={`photo de ${oneMember.name}`} />
                                    
                                    {editCardIndex !== index ? (
                                    
                                        <>
                                            <h3 className="studio-page-edit-title">{oneMember.name}{user && user.userToken && <i onClick={() => handleShowCardEditor(index)} className="fa-solid fa-pen admin-studio-update-pen"></i>}</h3>
                                            <p>{oneMember.role}</p>
                                        </>
                                        
                                    ) : (
                                    
                                        <form encType="multipart/form-data" className="studio-page-edit-form">
                                            
                                            <fieldset className="loginpage-input-label">
                                                <input value={editInputValue.teamMember[index].name} onChange={(e) => handleChange(e, index)} name={`name`} type="text" className="loginpage-input" required />
                                                <label htmlFor={`Nom`}>Nom</label>
                                            </fieldset>
                
                                            <fieldset className="loginpage-input-label">
                                                <input value={editInputValue.teamMember[index].role} onChange={(e) => handleChange(e, index)} name={`role`} type="text" className="loginpage-textarea" required />
                                                <label htmlFor={`role`}>Rôle</label>
                                            </fieldset>
                
                                            <button onClick={showConfirmEdit} className="liveupdatepage-confirm-button">Valider</button>
                                            
                                            <button onClick={handleHideEditor} className="liveupdatepage-cancel-button">Annuler</button>
                                        </form>
                                        
                                    )}
                                    
                                </section>
                                
                                {editMemberImg === index && (
                                
                                    <>
                                        <form encType="multipart/form-data">
                                            
                                            <div onClick={() => hideFileInput()} className="file-edit-background"></div>
                                            <input onChange={(e) => handleFileChange(e, index)} id="memberImg" name="memberImg" type="file" className="liveupdate-gamepage-other-input-file" />
                                            
                                            <button onClick={(e) => showConfirmEdit(e)} className="liveupdate-gamepage-otherImg-confirm-button">Valider</button>
                                            <button onClick={() => hideFileInput()} className="liveupdate-gamepage-otherImg-cancel-button">Annuler</button>
                                        
                                        </form>
                                    </>
                                    
                                )}
                                
                            </React.Fragment>
                        ))}
                        
                    </div>
                    
                </section>
                
                
                {/****** Modal de confirmation de modification de la page ******/}
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
                
            </article>
            
        </main>
    )
}

export default Studio