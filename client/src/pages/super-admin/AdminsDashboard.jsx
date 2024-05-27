import { useEffect , useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import {token} from "../../context/token"
import { toast } from 'react-toastify'


const AdminsDashboard = () => {
    
    const {user} = useAuth()
    
    const [allAdmins, setAllAdmins] = useState([])
    const [updatePage, setUpdatePage] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemsToDelete, setItemsToDelete] = useState(null)
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false)
    const [showConfirmAccountCreationModal, setShowConfirmAccountCreationModal] = useState(false)
    const [inputValue, setInputValue] = useState({
        username : "",
        email : "",
        password : "",
        confirmedPassword: "",
        role : ""
    })
    
    /* State qui va servir à afficher une croix ou un check selon validiter du mot de passe saisit */
    const [passwordValidator, setPasswordValidator] = useState({
        minLength: false,
        uppercase : false,
        lowercase : false,
        specialCharacter : false
    })
    const [togglePWD, setTogglePWD] = useState(false)
    const [toggleConfirmedPWD, setToggleConfirmedPWD] = useState(false)
    
    
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
    
    
    /* Fonction qui change la valeur des state en fonction 
    des changements de valeur des formulaires */
    const handleChange = (e) => {
        
        const {name, value} = e.target
        
        setInputValue({...inputValue, [name] : value})
        
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
    
    
    /* Fonctions qui cache ou affiche la saisit dans les champs */
    const togglePasswordVisibility = () => {
        setTogglePWD(!togglePWD)
    }
    const toggleConfirmedPasswordVisibility = () => {
        setToggleConfirmedPWD(!toggleConfirmedPWD)
    }
    
    
    // Fonction qui ferme le modal
    const handleHideModal = () => {
        
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        setItemsToDelete(null)
        setShowCreateAccountModal(false)
        setShowConfirmAccountCreationModal(false)
        setInputValue({
            username: "",
            email: "",
            password:"",
            confirmedPassword: "",
            role: ""
        })
        setPasswordValidator({
                isFocus : false
        })
    }
    
    
    // Fonction qui affiche le modal de suppression
    const showConfirmDeleteModal = (itemsIndex) => {
        setShowDeleteModal(true)
        document.body.style.overflow = "hidden"
        setItemsToDelete(itemsIndex)
    }
    
    
    // Fonction qui affiche le modal de création de compte
    const showCreateAccount = () => {
        setShowCreateAccountModal(true)
        setShowConfirmAccountCreationModal(false)
        document.body.style.overflow = "hidden"
    }
    
    
    // Fonction qui affiche le modal de confirmation de création de compte
    const showConfirmAccountCreation = () => {
        setShowCreateAccountModal(false)
        setShowConfirmAccountCreationModal(true)
        document.body.style.overflow = "hidden"
    }
    
    
    // Fonction qui supprime un compte
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/user/deleteone/${itemsToDelete}`, {headers : token()})
            
            setItemsToDelete(null)
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    /* Fonction qui soumet le formulaire de changement d'email et/ou de nom d'utilisateur */ 
    const handleSubmitCreation = async () => {
        
        try {
            
            const {username, email, password, confirmedPassword, role} = inputValue
            
            const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
            
            
            if (username.trim() === ""
            || email.trim() === ""
            || password.trim() === ""
            || confirmedPassword.trim() === "") {
                setShowCreateAccountModal(true)
                setShowConfirmAccountCreationModal(false)
                return toast.error("Veuillez remplir tout les champs")
                
            } else if (!checkEmail.test(email)) {
                setShowCreateAccountModal(true)
                setShowConfirmAccountCreationModal(false)
                return toast.error("Adresse email invalide")
            
            } else if (!checkPassword.test(password)) {
                setShowCreateAccountModal(true)
                setShowConfirmAccountCreationModal(false)
                return toast.error("Mot de passe pas assez sécurisé")
            
            } else if (confirmedPassword !== password) {
                setShowCreateAccountModal(true)
                setShowConfirmAccountCreationModal(false)
                return toast.warning("Veuillez saisir des mots de passe identique")
            
            }
            
            const serverRes = await axios.post(`/api/user/register`, inputValue, {headers : token()})
            
            toast.success(serverRes.data.message)
            
            handleHideModal()
            
            setUpdatePage(!updatePage)
            
        } catch (e) {
            
            toast.error(e.response.data.message)
            
        }
    }
    
    
    /* Fonction qui retourne une croix ou un check en fonction de la valeur de l'argument */
    const iconValidator = (isValid) => {
        return isValid ? <i className="fa-solid fa-check" style={{color : "lime"}}></i> : <i className="fa-solid fa-xmark" style={{color: "red"}}></i>
    }
    
    
    return (
        <main className="container dashboard-main">
            
            <h1>Administrateurs</h1>
            
            <button onClick={showCreateAccount} className="dashboard-create-button">Créer un compte</button>
            
            {/******** Tableau des comptes admins *******/}
            <table className="dashboard-table">
                
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th className="admin-role-row">Rôle</th>
                        <th className="admin-lastconnexion-row">Dernière connexion</th>
                        <th className="admin-action-row">Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {allAdmins.map((oneAdmin) => (
                        <tr key={oneAdmin._id}>
                            <td style={{ color: user.id === oneAdmin._id ? 'lime' : 'white' }}>{oneAdmin.username}</td>
                            <td className="admin-role-row" style={{ color: user.id === oneAdmin._id ? 'lime' : 'white' }}>{oneAdmin.role}</td>
                            <td className="admin-lastconnexion-row" style={{ color: user.id === oneAdmin._id ? 'lime' : 'white' }}>{new Date().toLocaleDateString() === new Date(oneAdmin.loginTime).toLocaleDateString() ?
                                `Aujourd'hui à ${new Date(oneAdmin.loginTime).getHours().toString().padStart(2, '0')}:${new Date(oneAdmin.loginTime).getMinutes().toString().padStart(2, '0')}` :
                                new Date().getDate() - 1 === new Date(oneAdmin.loginTime).getDate() && new Date().getMonth() === new Date(oneAdmin.loginTime).getMonth() &&  new Date().getFullYear() === new Date(oneAdmin.loginTime).getFullYear() ?
                                    `Hier à ${new Date(oneAdmin.loginTime).getHours().toString().padStart(2, '0')}:${new Date(oneAdmin.loginTime).getMinutes().toString().padStart(2, '0')}` : 
                                    new Date().getDate() - 2 === new Date(oneAdmin.loginTime).getDate() && new Date().getMonth() === new Date(oneAdmin.loginTime).getMonth() &&  new Date().getFullYear() === new Date(oneAdmin.loginTime).getFullYear() ?
                                        `Avant-hier à ${new Date(oneAdmin.loginTime).getHours().toString().padStart(2, '0')}:${new Date(oneAdmin.loginTime).getMinutes().toString().padStart(2, '0')}` :
                                        new Date().getDate() - 5 < new Date(oneAdmin.loginTime).getDate() && new Date().getMonth() === new Date(oneAdmin.loginTime).getMonth() &&  new Date().getFullYear() === new Date(oneAdmin.loginTime).getFullYear() ?
                                            new Date(oneAdmin.loginTime).toLocaleDateString('fr-FR', { weekday: 'long' }) + ` à ${new Date(oneAdmin.loginTime).getHours().toString().padStart(2, '0')}:${new Date(oneAdmin.loginTime).getMinutes().toString().padStart(2, '0')}`:
                                            `le ${new Date(oneAdmin.loginTime).getDate()} ${new Date(oneAdmin.loginTime).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + " "} à ${new Date(oneAdmin.loginTime).getHours().toString().padStart(2, '0')}:${new Date(oneAdmin.loginTime).getMinutes().toString().padStart(2, '0')}`}
                            </td>
                            <td className="admin-action-row">
                                <div>
                                    <NavLink to={`/super-admin/tableaudebord/admins/settings/${oneAdmin._id}`} className="dashboard-update-button">Modifier</NavLink>
                                    {oneAdmin._id !== user.id && <NavLink onClick={() => showConfirmDeleteModal(oneAdmin._id)} className="dashboard-delete-button">Supprimer</NavLink>}
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
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Voulez-vous vraiment supprimer ce compte ?</p>
                        <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> 
                    </dialog>
                </>
            )}
            
            
            {/****** Modal de création d'un compte ******/}
            {showCreateAccountModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => handleHideModal()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Création de compte</p>
                        
                        <form onSubmit={showConfirmAccountCreation}>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={inputValue.username} onChange={handleChange} name="username" type="text" className="loginpage-input" required />
                                <label htmlFor="username" >Nom d'utilisateur</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                <input value={inputValue.email} onChange={handleChange} name="email" type="text" className="loginpage-input" required />
                                <label htmlFor="email" >Adresse email</label>
                            </fieldset>
                            
                            <fieldset className="loginpage-input-label">
                                {!togglePWD ? (
                                    <i onClick={togglePasswordVisibility} className="fa-regular fa-eye password-visibility"></i>
                                ) : (
                                    <i onClick={togglePasswordVisibility} className="fa-regular fa-eye-slash password-visibility"></i>
                                )}
                                <input value={inputValue.password} onChange={handleChange} name="password" type={togglePWD ? "text" : "password"}  className="loginpage-input" required />
                                <label htmlFor="password" >Mot de passe</label>
                             </fieldset>
                              
                             <fieldset className="loginpage-input-label">
                                {!toggleConfirmedPWD ? (
                                    <i onClick={toggleConfirmedPasswordVisibility} className="fa-regular fa-eye password-visibility"></i>
                                ) : (
                                    <i onClick={toggleConfirmedPasswordVisibility} className="fa-regular fa-eye-slash password-visibility"></i>
                                )}
                                <input value={inputValue.confirmedPassword} onChange={handleChange} name="confirmedPassword" type={toggleConfirmedPWD ? "text" : "password"} className="loginpage-input" required />
                                <label htmlFor="confirmedPassword" >Confirmer le mot de passe</label>
                             </fieldset>
                             
                             {/**** Section qui affiche si le mot de passe est valide ***/}
                             {passwordValidator.isFocus &&
                                    <section className="section-password-validator">
                                        <p className="password-validator">{iconValidator(passwordValidator.lowercase)} 1 lettre minuscule minimum</p>
                                        <p className="password-validator">{iconValidator(passwordValidator.uppercase)} 1 lettre majuscule minimum</p>
                                        <p className="password-validator">{iconValidator(passwordValidator.specialChar)} 1 caractère spécial minimum</p>
                                        <p className="password-validator">{iconValidator(passwordValidator.minLength)} 8 caractères minimum</p>
                                        <p className="password-validator">{iconValidator(inputValue.password && inputValue.confirmedPassword === inputValue.password)} Mot de passe de confirmation identique</p>
                                    </section>
                             }
                             
                             <fieldset className="role-fieldset">
                                <label>Rôle</label>
                                
                                <div>
                                    <input
                                        type="radio"
                                        id="roleAdmin"
                                        name="role"
                                        value="admin"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="roleAdmin">Administrateur</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="roleSuperAdmin"
                                        name="role"
                                        value="super-admin"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="roleSuperAdmin">Super Administrateur</label>
                                </div>
                            
                            </fieldset>
                             
                            
                            <button className="modal-confirm-button" type="submit">Valider</button>
                            
                        </form>
                        
                    </dialog>
                </>
            )}
            
            
            {/***** Modal de confirmation de création de compte ***/}
            {showConfirmAccountCreationModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    
                    <dialog className="modal" open>
                        <i onClick={() => showCreateAccount()} className="fa-solid fa-xmark modal-xmark"></i>
                        <p>Confirmez-vous la création de ce compte ?</p>
                        
                        <button className="modal-confirm-button"  onClick={() => handleSubmitCreation()}>Confirmer</button> 
                        <button className="modal-cancel-button" onClick={() => showCreateAccount()}>Annuler</button>
    
                    </dialog>
                </>
            )}
            
        </main>
    )
}

export default AdminsDashboard