import { useEffect , useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { token } from "../../context/token"
import { toast } from 'react-toastify'

const GameDashboard = () => {
   
   const {user} = useAuth()
    
   const [allGames, setAllGames] = useState([])
   const [updatePage, setUpdatePage] = useState(false)
   const [showDeleteModal, setShowDeleteModal] = useState(false)
   const [itemsToDelete, setItemsToDelete] = useState(null)
   
    
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
        document.body.style.overflow = ""
        setItemsToDelete(null)
        
    }
    
    
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
    
   
   return (
       <main className="container dashboard-main">
       
          <h1>Jeux</h1>
          
          <button className="dashboard-create-button">Créer un jeu</button>
          
          
          {/******** Tableau des jeux *******/}
          <table className="dashboard-table">
                
                <thead>
                    <tr>
                        <th>Nom du jeu</th>
                        <th className="admin-role-row">Visibilité</th>
                        <th className="admin-lastconnexion-row">Date de création</th>
                        <th className="admin-action-row">Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {allGames.map((oneGame) => (
                        <tr key={oneGame._id}>
                            <td>{oneGame.title}</td>
                            <td className="admin-role-row">{oneGame.visibility === "private" ? "Privée" : "Public"}</td>
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
                                    <NavLink className="dashboard-update-button">Modifier</NavLink>
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
            
            
       </main>
   ) 
}

export default GameDashboard