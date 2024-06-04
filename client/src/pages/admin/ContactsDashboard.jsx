import { useEffect , useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { token } from "../../context/token"
import { toast } from 'react-toastify'


const ContactsDashboard = () => {
    
    const {user} = useAuth()
    
    /*********** Suppression de contact *************/
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemsToDelete, setItemsToDelete] = useState(null)
   
    const [updatePage, setUpdatePage] = useState(false)
    const [allContacts, setAllContacts] = useState([])
    
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAllContacts = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/contact/getall`, {headers : token()})
                setAllContacts(serverRes.data)
                
    
            } catch (e) {}
            
        }
        
        fetchAllContacts()
        
    }, [updatePage])
    
    
    // Fonction qui ferme les modales
   const handleHideModal = () => {
        
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        setItemsToDelete(null)
        
    }
    
    
    /*********** Suppression de contact *************/
   
   // Fonction qui affiche le modal de suppression de contact
   const showConfirmDeleteModal = (contactIndex) => {
       setShowDeleteModal(true)
       document.body.style.overflow = "hidden"
       setItemsToDelete(contactIndex)
   }
   

   // Fonction qui supprime un contact
    const handleDelete = async () => {
        
        try {
            
        
            const serverRes = await axios.delete(`/api/contact/delete/${itemsToDelete}`, {headers : token()})
            
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
        
            <h1>Contacts</h1>
          
            
          {/******** Tableau des contacts *******/}
          <table className="dashboard-table">
                
                <thead>
                    
                    <tr>
                    
                        <th>Email</th>
                        <th className="admin-role-row">Status</th>
                        <th className="admin-lastconnexion-row">Date de réception</th>
                        <th className="admin-action-row">Action</th>
                    
                    </tr>
                    
                </thead>
                
                <tbody>
                
                    {allContacts.map((oneContact) => (
                    
                        <tr key={oneContact._id}>
                        
                            <td><NavLink className="dashboard-table-navlink" to={`check/${oneContact._id}`}>{oneContact.email}</NavLink></td>
                            <td className={`admin-role-row ${oneContact.status === "Traité" ? "dashboard-status-positive" : "dashboard-status-negative"} `}>{oneContact.status}</td>
                            <td className="admin-lastconnexion-row">{new Date().toLocaleDateString() === new Date(oneContact.createdAt).toLocaleDateString() ?
                                `Aujourd'hui à ${new Date(oneContact.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneContact.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                new Date().getDate() - 1 === new Date(oneContact.createdAt).getDate() && new Date().getMonth() === new Date(oneContact.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneContact.createdAt).getFullYear() ?
                                    `Hier à ${new Date(oneContact.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneContact.createdAt).getMinutes().toString().padStart(2, '0')}` : 
                                    new Date().getDate() - 2 === new Date(oneContact.createdAt).getDate() && new Date().getMonth() === new Date(oneContact.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneContact.createdAt).getFullYear() ?
                                        `Avant-hier à ${new Date(oneContact.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneContact.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                        new Date().getDate() - 5 < new Date(oneContact.createdAt).getDate() && new Date().getMonth() === new Date(oneContact.createdAt).getMonth() &&  new Date().getFullYear() === new Date(oneContact.createdAt).getFullYear() ?
                                            new Date(oneContact.createdAt).toLocaleDateString('fr-FR', { weekday: 'long' }) + ` à ${new Date(oneContact.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneContact.createdAt).getMinutes().toString().padStart(2, '0')}`:
                                            `le ${new Date(oneContact.createdAt).getDate()} ${new Date(oneContact.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + " "} à ${new Date(oneContact.createdAt).getHours().toString().padStart(2, '0')}:${new Date(oneContact.createdAt).getMinutes().toString().padStart(2, '0')}`}
                            </td>
                            <td className="admin-action-row">
                                <div>
                                    <NavLink className="dashboard-update-button">Modifier</NavLink>
                                    <NavLink onClick={() => showConfirmDeleteModal(oneContact._id)} className="dashboard-delete-button">Supprimer</NavLink>
                                </div>
                            </td>
                            
                        </tr>
                        
                    ))}
                    
                </tbody>
                
            </table>
            
            {/****** Modal de confirmation de suppression d'un contact ******/}
            {showDeleteModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Voulez-vous vraiment supprimer ce contact ?</p>
                        <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> 
                    </dialog>
                </>
            )}
            
        </main>
    )
}

export default ContactsDashboard