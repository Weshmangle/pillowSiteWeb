import { useEffect , useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import {token} from "../../context/token"


const AdminsDashboard = () => {
    
    const {user} = useAuth()
    
    const [allAdmins, setAllAdmins] = useState([])
    const [updatePage, setUpdatePage] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemsToDelete, setItemsToDelete] = useState(null)
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAllAdmins = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/user/getall`, {headers : token()})
                setAllAdmins(serverRes.data)
                
            } catch (e) {}
            
        }
        
        fetchAllAdmins()
        
    }, [updatePage])
    
    
    // Fonction qui ferme le modal
    const handleHideModal = () => {
        
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        setItemsToDelete(null)
    }
    
    
    // Fonction qui affiche le modal de suppression
    const showConfirmDeleteModal = (itemsIndex) => {
        setShowDeleteModal(true)
        document.body.style.overflow = "hidden"
        setItemsToDelete(itemsIndex)
    }
    
    
    // Fonction qui supprime un article
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/user/deleteone/${itemsToDelete}`, {headers : token()})
            
            setItemsToDelete(null)
            
            // return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            // return toast.error(e.response.data.message)
            
        }
    }
    
    
    return (
        <main className="container dashboard-main">
            
            <h1>Administrateurs</h1>
            
            <table className="dashboard-table">
                
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Rôle</th>
                        <th>Dernière connexion</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {allAdmins.map((oneAdmin) => (
                        <tr key={oneAdmin._id}>
                            <td style={{ color: user.id === oneAdmin._id ? 'lime' : 'white' }}>{oneAdmin.username}</td>
                            <td style={{ color: user.id === oneAdmin._id ? 'lime' : 'white' }}>{oneAdmin.role}</td>
                            <td style={{ color: user.id === oneAdmin._id ? 'lime' : 'white' }}>{new Date().getDate() === new Date(oneAdmin.loginTime).getDate() ?
                                "Aujourd'hui " :
                                new Date().getDate() - 1 === new Date(oneAdmin.loginTime).getDate() ?
                                    "Hier " : 
                                    new Date().getDate() - 2 === new Date(oneAdmin.loginTime).getDate() ?
                                        "Avant-hier " :
                                        new Date().getDate() - 5 < new Date(oneAdmin.loginTime).getDate() ?
                                            new Date(oneAdmin.loginTime).toLocaleDateString('fr-FR', { weekday: 'long' }) + " " :
                                            new Date(oneAdmin.loginTime).toLocaleDateString() + " "
                                } à {new Date(oneAdmin.loginTime).getHours().toString().padStart(2, '0')}:{new Date(oneAdmin.loginTime).getMinutes().toString().padStart(2, '0')}</td>
                            <td>
                                <div>
                                    <NavLink className="dashboard-update-button">Modifier</NavLink>
                                    {oneAdmin.role === "admin" && <NavLink onClick={() => showConfirmDeleteModal(oneAdmin._id)} className="dashboard-delete-button">Supprimer</NavLink>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
                
            </table>
            
            {/****** Modal de suppression d'utilisateur ******/}
            {showDeleteModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Voulez-vous vraiment supprimer ce compte ?</p>
                        <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> 
                    </dialog>
                </>
            )}
            
        </main>
    )
}

export default AdminsDashboard