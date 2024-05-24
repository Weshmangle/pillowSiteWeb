import { useParams , useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import axios from 'axios'
import { token } from "../../context/token"
import { useAuth } from '../../context/AuthContext'



const UpdateAdmin = () => {
    
    const {id} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [account, setAccount] = useState({})
    const [updatePage, setUpdatePage] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemsToDelete, setItemsToDelete] = useState(null)
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAccount = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/user/getone/${id}`, {headers : token()})
                setAccount(serverRes.data)
                
            } catch (e) {}
            
        }
        
        fetchAccount()
        
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
    
    
    // Fonction qui supprime le compte
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/user/deleteone/${itemsToDelete}`, {headers : token()})
            
            setItemsToDelete(null)
            
            navigate("/super-admin/tableaudebord/admins")
            // return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            // return toast.error(e.response.data.message)
            
        }
    }
    
    
    return (
      <main className="container updateaccount-page-main">
      
        <h1>Modifier le compte {account.username}</h1>
        <article>
            <h2>Informations du compte</h2>
            <p>Nom d'utilisateur : {account.username}</p>
            <p>Adresse email : {account.email}</p>
            <p>Rôle : {account.role}</p>
            <p>Date de création : {new Date().toLocaleDateString() === new Date(account.createdAt).toLocaleDateString() ?
                                     `Aujourd'hui à ${new Date(account.createdAt).getHours().toString().padStart(2, '0')}:${new Date(account.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                      new Date().getDate() - 1 === new Date(account.createdAt).getDate() && new Date().getMonth() === new Date(account.createdAt).getMonth() &&  new Date().getFullYear() === new Date(account.createdAt).getFullYear() ?
                                          `Hier à ${new Date(account.createdAt).getHours().toString().padStart(2, '0')}:${new Date(account.createdAt).getMinutes().toString().padStart(2, '0')}` : 
                                          new Date().getDate() - 2 === new Date(account.createdAt).getDate() && new Date().getMonth() === new Date(account.createdAt).getMonth() &&  new Date().getFullYear() === new Date(account.createdAt).getFullYear() ?
                                               `Avant-hier à ${new Date(account.createdAt).getHours().toString().padStart(2, '0')}:${new Date(account.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                                new Date().getDate() - 5 < new Date(account.createdAt).getDate() && new Date().getMonth() === new Date(account.createdAt).getMonth() &&  new Date().getFullYear() === new Date(account.createdAt).getFullYear() ?
                                                    new Date(account.createdAt).toLocaleDateString('fr-FR', { weekday: 'long' }) + ` à ${new Date(account.createdAt).getHours().toString().padStart(2, '0')}:${new Date(account.createdAt).getMinutes().toString().padStart(2, '0')}` :
                                                    `le ${new Date(account.createdAt).getDate()} ${new Date(account.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + " "} à ${new Date(account.createdAt).getHours().toString().padStart(2, '0')}:${new Date(account.createdAt).getMinutes().toString().padStart(2, '0')}`}
            </p>
            <p>Dernière connexion : {new Date().toLocaleDateString() === new Date(account.loginTime).toLocaleDateString() ?
                                     `Aujourd'hui à ${new Date(account.loginTime).getHours().toString().padStart(2, '0')}:${new Date(account.loginTime).getMinutes().toString().padStart(2, '0')}` :
                                      new Date().getDate() - 1 === new Date(account.loginTime).getDate() && new Date().getMonth() === new Date(account.loginTime).getMonth() &&  new Date().getFullYear() === new Date(account.loginTime).getFullYear() ?
                                          `Hier à ${new Date(account.loginTime).getHours().toString().padStart(2, '0')}:${new Date(account.loginTime).getMinutes().toString().padStart(2, '0')}` : 
                                          new Date().getDate() - 2 === new Date(account.loginTime).getDate() && new Date().getMonth() === new Date(account.loginTime).getMonth() &&  new Date().getFullYear() === new Date(account.loginTime).getFullYear() ?
                                               `Avant-hier à ${new Date(account.loginTime).getHours().toString().padStart(2, '0')}:${new Date(account.loginTime).getMinutes().toString().padStart(2, '0')}` :
                                                new Date().getDate() - 5 < new Date(account.loginTime).getDate() && new Date().getMonth() === new Date(account.loginTime).getMonth() &&  new Date().getFullYear() === new Date(account.loginTime).getFullYear() ?
                                                    new Date(account.loginTime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ` à ${new Date(account.loginTime).getHours().toString().padStart(2, '0')}:${new Date(account.loginTime).getMinutes().toString().padStart(2, '0')}` :
                                                    `le ${new Date(account.loginTime).getDate()} ${new Date(account.loginTime).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + " "} à ${new Date(account.loginTime).getHours().toString().padStart(2, '0')}:${new Date(account.loginTime).getMinutes().toString().padStart(2, '0')}`}
            </p>
        
        </article>
        
        <article>
            {user.id !== account._id && <button className="updateaccount-page-update-button">Modifier le rôle</button>}
            <button className="updateaccount-page-update-button">Modifier le mot de passe</button>
            <button className="updateaccount-page-update-button">Modifier le compte</button>
            {user.id !== account._id && <button onClick={() => showConfirmDeleteModal(id)} className="updateaccount-page-delete-button">Supprimer le compte</button>}
        </article>
        
        
        {/****** Modal de suppression d'utilisateur ******/}
        {showDeleteModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                    <p>Voulez-vous vraiment supprimer ce compte ?</p>
                    <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> 
                </dialog>
            </>
        )}
            
      </main>
    )
}

export default UpdateAdmin