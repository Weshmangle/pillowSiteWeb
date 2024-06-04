import { useEffect , useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { token } from "../../context/token"
import { toast } from 'react-toastify'


const NewslettersDashboard = () => {
    
    const {user} = useAuth()
    
    /*********** Suppression d'abonné *************/
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemsToDelete, setItemsToDelete] = useState(null)
   
    const [updatePage, setUpdatePage] = useState(false)
    const [allNewsletters, setAllNewsletters] = useState([])
    
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAllNewsletters = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/newsletter/getall`, {headers : token()})
                setAllNewsletters(serverRes.data)
                
    
            } catch (e) {}
            
        }
        
        fetchAllNewsletters()
        
    }, [updatePage])
    
    
    /*********** Suppression d'abonné *************/
    // Fonction qui affiche le modal de suppression d'abonné
    const showConfirmDeleteModal = (newsletterIndex) => {
       setShowDeleteModal(true)
       document.body.style.overflow = "hidden"
       setItemsToDelete(newsletterIndex)
   }
   
   
    // Fonction qui ferme les modales
    const handleHideModal = () => {
        
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        setItemsToDelete(null)
        
    }


    // Fonction qui supprime un abonné
    const handleDelete = async () => {
        
        try {
            
        
            const serverRes = await axios.delete(`/api/newsletter/delete/${itemsToDelete}`, {headers : token()})
            
            setUpdatePage(!updatePage)
            setShowDeleteModal(false)
            document.body.style.overflow = ""
            setItemsToDelete(null)
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    
    return (
        <main className="container dashboard-main">
        
            <h1>Newsletter subscribers</h1>
          
            
          {/******** Tableau des contacts *******/}
          <table className="dashboard-table">
                
                <thead>
                    
                    <tr>
                    
                        <th>Email</th>
                        <th className="admin-lastconnexion-row">Date d'inscription</th>
                        <th className="admin-action-row">Action</th>
                    
                    </tr>
                    
                </thead>
                
                <tbody>
                
                    {allNewsletters.map((oneSubscriber) => (
                    
                        <tr key={oneSubscriber._id}>
                        
                            <td>{oneSubscriber.email}</td>
                            <td className="admin-lastconnexion-row">{new Date().toLocaleDateString() === new Date(oneSubscriber.createdAt).toLocaleDateString() ?
                                `Aujourd'hui à ${new Date(oneSubscriber.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneSubscriber.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                new Date().getDate() - 1 === new Date(oneSubscriber.createdAt).getDate() && new Date().getMonth() === new Date(oneSubscriber.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneSubscriber.createdAt).getFullYear() ?
                                    `Hier à ${new Date(oneSubscriber.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneSubscriber.createdAt).getMinutes().toString().padStart(2, '0')}` : 
                                    new Date().getDate() - 2 === new Date(oneSubscriber.createdAt).getDate() && new Date().getMonth() === new Date(oneSubscriber.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneSubscriber.createdAt).getFullYear() ?
                                        `Avant-hier à ${new Date(oneSubscriber.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneSubscriber.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                        new Date().getDate() - 5 < new Date(oneSubscriber.createdAt).getDate() && new Date().getMonth() === new Date(oneSubscriber.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneSubscriber.createdAt).getFullYear() ?
                                            new Date(oneSubscriber.createdAt).toLocaleDateString('fr-FR', { weekday: 'long' }) + ` à ${new Date(oneSubscriber.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneSubscriber.createdAt).getMinutes().toString().padStart(2, '0')}`:
                                            `le ${new Date(oneSubscriber.createdAt).getDate()} ${new Date(oneSubscriber.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + " "} à ${new Date(oneSubscriber.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneSubscriber.createdAt).getMinutes().toString().padStart(2, '0')}`}
                            </td>
                            <td className="admin-action-row">
                                <div>
                                    <NavLink className="dashboard-update-button">Modifier</NavLink>
                                    <NavLink onClick={() => showConfirmDeleteModal(oneSubscriber._id)} className="dashboard-delete-button">Supprimer</NavLink>
                                </div>
                            </td>
                            
                        </tr>
                        
                    ))}
                    
                </tbody>
                
            </table>
            
            
            {/****** Modal de confirmation de suppression d'un abonné ******/}
            {showDeleteModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Voulez-vous vraiment supprimer cet abonné ?</p>
                        <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> 
                    </dialog>
                </>
            )}
            
        </main>
    )
}

export default NewslettersDashboard