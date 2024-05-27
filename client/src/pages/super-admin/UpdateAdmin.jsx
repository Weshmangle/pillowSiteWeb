import { useParams , useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import axios from 'axios'
import { token } from "../../context/token"
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'


const UpdateAdmin = () => {
    
    const {id} = useParams()
    const {user, update} = useAuth()
    const navigate = useNavigate()
    
    const [account, setAccount] = useState({})
    const [updatePage, setUpdatePage] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditRoleModal, setShowEditRoleModal] = useState(false)
    const [showConfirmEditRoleModal, setShowConfirmEditRoleModal] = useState(false)
    const [showEditPWDModal, setShowEditPWDModal] = useState(false)
    const [showConfirmEditPWDModal, setShowConfirmEditPWDModal] = useState(false)
   
    const [itemsToDelete, setItemsToDelete] = useState(null)
    const [itemsToEdit, setItemsToEdit] = useState(null)
    const [userUpdatedRole, setUserUpdatedRole] = useState({
        role:""
    })
    const [userPreviousRole, setUserPreviousRole] = useState("")
    const [passwordsValue, setPasswordsValue] = useState({
        password : "",
        confirmedPassword : ""
    })
    const [accountValue, setAccountValue] = useState({
        username : "",
        email : ""
    })
    const [previousAccountValue, setPreviousAccountValue] = useState({
        username : "",
        email : ""
    })
    
    const [togglePWD, setTogglePWD] = useState(false)
    const [toggleConfirmedPWD, setToggleConfirmedPWD] = useState(false)
    
    /* State qui va servir à afficher une croix ou un check selon validiter du mot de passe saisit */
    const [passwordValidator, setPasswordValidator] = useState({
        minLength: false,
        uppercase : false,
        lowercase : false,
        specialCharacter : false
    })
    const [showUpdateAccountModal, setShowUpdateAccountModal] = useState(false)
    const [showConfirmUpdateAccountModal, setShowConfirmUpdateAccountModal] = useState(false)
   
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAccount = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/user/getone/${id}`, {headers : token()})
                setAccount(serverRes.data)
                setAccountValue({
                    username: serverRes.data.username,
                    email: serverRes.data.email
                })
                setPreviousAccountValue({
                    username: serverRes.data.username,
                    email: serverRes.data.email
                })
                
            } catch (e) {}
            
        }
        
        fetchAccount()
        
        
        
    }, [updatePage])
    
    
    /* Fonctions qui cache ou affiche la saisit dans les champs */
    const togglePasswordVisibility = () => {
        setTogglePWD(!togglePWD)
    }
    const toggleConfirmedPasswordVisibility = () => {
        setToggleConfirmedPWD(!toggleConfirmedPWD)
    }
    
    
    /* Fonction qui change la valeur des state en fonction 
    des changements de valeur des formulaires */
    const handleChange = (e) => {
        
        const {name, value} = e.target
        
        setUserUpdatedRole({...userUpdatedRole, role : e.target.value})
        setPasswordsValue({...passwordsValue, [name] : value})
        setAccountValue({...accountValue, [name] : value})
        
        
        if (name === "password") {
            
            const minLength = value.length >= 8;
            const uppercase = /[A-Z]/.test(value);
            const lowercase = /[a-z]/.test(value);
            const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
            
            if (value === "") {
                return setPasswordValidator({
                minLength,
                uppercase,
                lowercase,
                specialChar,
                isFocus : false
            })
            
            }
            
            return setPasswordValidator({
                minLength,
                uppercase,
                lowercase,
                specialChar,
                isFocus : true
            })
        }
        
    }
    
    
    /* Fonction qui affiche le modal de confirmation de changement du rôle du compte */ 
    const handleSubmit = (e) => {
        e.preventDefault()
        setShowConfirmEditRoleModal(true)
        setShowEditRoleModal(false)
    }
    
    
    /* Fonction qui affiche le modal de confirmation de changement de mot de passe du compte */
    const handleSubmitNewPWD = (e) => {
        e.preventDefault()
        setShowConfirmEditPWDModal(true)
        setShowEditPWDModal(false)
    }
    
    
    // Fonction qui ferme les modales
    const handleHideModal = () => {
        
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        setItemsToDelete(null)
        setShowEditRoleModal(false)
        setItemsToEdit(null)
        setShowConfirmEditRoleModal(false)
        setShowConfirmEditPWDModal(false)
        setShowEditPWDModal(false)
        setPasswordsValue({
            password : "",
            confirmedPassword : ""
        })
        setPasswordValidator({
            minLength: false,
            uppercase : false,
            lowercase : false,
            specialCharacter : false
        })
        setShowUpdateAccountModal(false)
        setShowConfirmUpdateAccountModal(false)
        
    }
    
    
    // Fonction qui affiche le modal de suppression
    const showConfirmDeleteModal = (itemsIndex) => {
        setShowDeleteModal(true)
        document.body.style.overflow = "hidden"
        setItemsToDelete(itemsIndex)
    }
    
    
    // Fonction qui affiche le modal de modification de rôle
    const editRoleModal = (adminIndex, currentRole) => {
        
        setShowEditRoleModal(true)
        document.body.style.overflow = "hidden"
        setItemsToEdit(adminIndex)
        setUserPreviousRole(currentRole)
        setUserUpdatedRole({
            role : currentRole
        })
        
    }
    
    
    // Fonction qui affiche le modal de modification de mot de passe
    const editPWDModal = (adminIndex) => {
        
        setShowEditPWDModal(true)
        document.body.style.overflow = "hidden"
        setItemsToEdit(adminIndex)
        
    }
    
    
    // Fonction qui affiche le modal de modification de nom d'utilisateur et/ou d'email
    const updateAccountModal = () => {
        setShowUpdateAccountModal(true)
        document.body.style.overflow = "hidden"
    }
    
    
    // Fonction qui soumet la suppression du compte
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/user/deleteone/${itemsToDelete}`, {headers : token()})
            
            setItemsToDelete(null)
            
            navigate("/super-admin/tableaudebord/admins")
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    // Fonction qui soumet le formulaire de changement de role du compte
    const handleEditRole = async () => {
        
        
        try {
            
            setUpdatePage(!updatePage)
            
            if (userUpdatedRole.role !== "admin"
            && userUpdatedRole.role !== "super-admin") {
                
                setShowEditRoleModal(true)
                setShowConfirmEditRoleModal(false)
                return toast.error("Rôle invalide")
                
            } else if (userUpdatedRole.role === userPreviousRole) {
                
                setShowEditRoleModal(true)
                setShowConfirmEditRoleModal(false)
                return toast.error("Vous n'avez fait aucune modification de rôle")
            
            }
            
            setUpdatePage(!updatePage)
            setShowConfirmEditRoleModal(false)
            document.body.style.overflow = ""
            
            const serverRes = await axios.put(`/api/user/updaterole/${itemsToEdit}`, userUpdatedRole, {headers : token()})
            
            toast.success(serverRes.data.message)
            
            if (userUpdatedRole.role === "admin" && user.id === account._id) {
                navigate("/")
            }
            
            setUserToEdit(null)
            
            setUserUpdatedRole({
                role:""
            })
            
            update()
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    /* Fonction qui soumet le formulaire de changement de mot de passe */ 
    const handleEditPWD = async () => {
        
        try {
            
            const {password, confirmedPassword} = passwordsValue
            
            const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
            
            if (password.trim() === ""
            || confirmedPassword.trim() === ""
            ) {
                setShowConfirmEditPWDModal(false)
                setShowEditPWDModal(true)
                return toast.error("Veuillez remplir tout les champs")
                
            } else if (!checkPassword.test(password)) {
                setShowConfirmEditPWDModal(false)
                setShowEditPWDModal(true)
                return toast.error("Mot de passe pas assez sécurisé")
            
            } else if (password !== confirmedPassword) {
                setShowConfirmEditPWDModal(false)
                setShowEditPWDModal(true)
                return toast.warning("Les mots de passe ne sont pas identique")
            
            }
            
            const serverRes = await axios.put(`/api/user/updatepassword/${id}`, passwordsValue, {headers : token()})
            
            toast.success(serverRes.data.message)
            
            handleHideModal()
            
            setUpdatePage(!updatePage)
            
            update()
            
        } catch (e) {
            
            toast.error(e.response.data.message)
            
        }
    }
    
    
    /* Fonction qui affiche le modal de confirmation de changement d'email et/ou de nom d'utilisateur */ 
    const confirmUpdateModal = async (e) => {
        e.preventDefault()
        setShowConfirmUpdateAccountModal(true)
        setShowUpdateAccountModal(false)
    }
    
    
    /* Fonction qui soumet le formulaire de changement d'email et/ou de nom d'utilisateur */ 
    const handleSubmitUpdate = async () => {
        
        try {
            
            const {username, email} = accountValue
            
            const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            
            if (username.trim() === ""
            || email.trim() === ""
            ) {
                setShowConfirmUpdateAccountModal(false)
                setShowUpdateAccountModal(true)
                return toast.error("Veuillez remplir tout les champs")
                
            } else if (!checkEmail.test(email)) {
                setShowConfirmUpdateAccountModal(false)
                setShowUpdateAccountModal(true)
                return toast.error("Adresse email invalide")
            
            } else if (email === previousAccountValue.email
                      && username === previousAccountValue.username) {
                setShowConfirmUpdateAccountModal(false)
                setShowUpdateAccountModal(true)
                return toast.warning("Vous n'avez effectué aucun changement")
            
            }
            
            const serverRes = await axios.put(`/api/user/updateaccount/${id}`, accountValue, {headers : token()})
            
            toast.success(serverRes.data.message)
            
            handleHideModal()
            
            setUpdatePage(!updatePage)
            
            update()
            
            
        } catch (e) {
            
            toast.error(e.response.data.message)
            
        }
    }
    
    
    /* Fonction qui retourne une croix ou un check en fonction de la valeur de l'argument */
    const iconValidator = (isValid) => {
        return isValid ? <i className="fa-solid fa-check" style={{color : "lime"}}></i> : <i className="fa-solid fa-xmark" style={{color: "red"}}></i>
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
            <button onClick={() => editRoleModal(id, account.role)} className="updateaccount-page-update-button">Modifier le rôle</button>
            <button onClick={() => editPWDModal(id)} className="updateaccount-page-update-button">Modifier le mot de passe</button>
            <button onClick={() => updateAccountModal()} className="updateaccount-page-update-button">Modifier le compte</button>
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
        
        
        {/****** Modal de modification de role d'utilisateur ******/}
        {showEditRoleModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                    <p>Modifier le rôle de ce compte</p>
                    
                    <form onSubmit={handleSubmit}>
                        <select className="modal-form-select" name="role" onChange={handleChange} value={userUpdatedRole.role}>
                            <option value="admin">Administrateur</option>
                            <option value="super-admin">Super administrateur</option>
                        </select>
                        
                        <button className="modal-confirm-button" type="submit">Valider</button>
                    </form>
                </dialog>
            </>
        )}
        
        
        {/***** Modal de confirmation de modification de rôle ***/}
        {showConfirmEditRoleModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                    <p>Voulez-vous vraiment modifier le role de ce compte ?</p>
                    
                    <button className="modal-confirm-button"  onClick={() => handleEditRole()}>Confirmer</button> 
                    <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button>

                </dialog>
            </>
        )}
        
        
        {/****** Modal de modification de mot de passe ******/}
        {showEditPWDModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                    <p>Modifier le mot de passe de ce compte</p>
                    
                    <form onSubmit={handleSubmitNewPWD}>
                    
                        <fieldset className="loginpage-input-label">
                            {!togglePWD ? (
                                <i onClick={togglePasswordVisibility} className="fa-regular fa-eye password-visibility"></i>
                            ) : (
                                <i onClick={togglePasswordVisibility} className="fa-regular fa-eye-slash password-visibility"></i>
                            )}
                            <input value={passwordsValue.password} onChange={handleChange} name="password" type={togglePWD ? "text" : "password"}  className="loginpage-input" required />
                            <label htmlFor="password" >Nouveau mot de passe</label>
                         </fieldset>
                          
                         <fieldset className="loginpage-input-label">
                            {!toggleConfirmedPWD ? (
                                <i onClick={toggleConfirmedPasswordVisibility} className="fa-regular fa-eye password-visibility"></i>
                            ) : (
                                <i onClick={toggleConfirmedPasswordVisibility} className="fa-regular fa-eye-slash password-visibility"></i>
                            )}
                            <input value={passwordsValue.confirmedPassword} onChange={handleChange} name="confirmedPassword" type={toggleConfirmedPWD ? "text" : "password"} className="loginpage-input" required />
                            <label htmlFor="confirmedPassword" >Confirmer le mot de passe</label>
                         </fieldset>
                         
                         
                         {/**** Section qui affiche si le mot de passe est valide ***/}
                         {passwordValidator.isFocus &&
                                <section className="section-password-validator">
                                    <p className="password-validator">{iconValidator(passwordValidator.lowercase)} 1 lettre minuscule minimum</p>
                                    <p className="password-validator">{iconValidator(passwordValidator.uppercase)} 1 lettre majuscule minimum</p>
                                    <p className="password-validator">{iconValidator(passwordValidator.specialChar)} 1 caractère spécial minimum</p>
                                    <p className="password-validator">{iconValidator(passwordValidator.minLength)} 8 caractères minimum</p>
                                    <p className="password-validator">{iconValidator(passwordsValue.password && passwordsValue.confirmedPassword === passwordsValue.password)} Mot de passe de confirmation identique</p>
                                </section>
                         }
                        
                        <button className="modal-confirm-button" type="submit">Valider</button>
                        
                    </form>
                    
                </dialog>
            </>
        )}
          
        
        {/****** Modal de confirmation de modification de mot de passe ******/}
        {showConfirmEditPWDModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>

                    <p>Voulez-vous vraiment modifier le mot de passe de ce compte ?</p>
                    
                    <button className="modal-confirm-button"  onClick={() => handleEditPWD()}>Confirmer</button> 
                    <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button>
                    
                </dialog>
            </>
        )}
        
        
        {/****** Modal de modification d'email ou/et nom d'utilisateur ******/}
        {showUpdateAccountModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                    <p>Modifier le mot de passe de ce compte</p>
                    
                    <form onSubmit={confirmUpdateModal}>
                    
                         <fieldset className="loginpage-input-label">
                            <input value={accountValue.username} onChange={handleChange} name="username" type="text" className="loginpage-input" required />
                            <label htmlFor="username" >Nom d'utilisateur</label>
                         </fieldset>
                         
                         <fieldset className="loginpage-input-label">
                            <input value={accountValue.email} onChange={handleChange} name="email" type="text"  className="loginpage-input" required />
                            <label htmlFor="email" >Adresse email</label>
                         </fieldset>
                        
                        <button className="modal-confirm-button" type="submit">Valider</button>
                        
                    </form>
                    
                </dialog>
            </>
        )}
        
        {/****** Modal de confirmation de modification de nom d'utilisateur et/ou email ******/}
        {showConfirmUpdateAccountModal && (
            <>
                <div onClick={() => handleHideModal()} className="modal-background"></div>
                
                <dialog className="modal" open>
                    <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>

                    <p>Voulez-vous vraiment modifier ce compte ?</p>
                    
                    <button className="modal-confirm-button"  onClick={() => handleSubmitUpdate()}>Confirmer</button> 
                    <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button>
                    
                </dialog>
            </>
        )}
        
      </main>
    )
}

export default UpdateAdmin