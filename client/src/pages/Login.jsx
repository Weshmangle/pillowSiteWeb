import { useState , useEffect } from 'react'
import axios from 'axios'
import {useAuth} from '../context/AuthContext'
import { toast } from 'react-toastify'


const Login = () => {
    
    const {user} = useAuth()
    const auth = useAuth()
    
    const [inputValue, setInputValue] = useState({
        username : "",
        password : ""
    })
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        
        // Scroll remis à zéro
        scrollTo(0,0)
        
    }, [])
    
    
    /* Fonction qui change la valeur des states en fonction de la valeur des champs */
    const handleChange = (e) => {
        
        const {name, value} = e.target
        setInputValue({...inputValue, [name] : value})
        
    }
    
    
    /* Fonction qui soumet le formulaire */
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        try {
            
            const { username , password } = inputValue
            
            if (username.trim() === ""
            || password.trim() === ""
            ) {
                return toast.error("Veuillez remplir tout les champs")
            }
        
            // const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
          
            // if (username.length > 35) {
            //     return setMessage("Veuillez saisir une adresse email plus petite")
            // } else if (!checkPassword.test(password)) {
            //     return setMessage("Mot de passe incorrect")
            // }
            
            const serverRes = await axios.post("/api/user/login", inputValue)
            
            await auth.login(serverRes.data)
            
            return toast.success(serverRes.data.message)
            
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
        }
    }
    
    
    return (
        <main className="login-page-main container">
        
            {/****** Bloc du formulaire *******/}
            <article className="loginpage-article">
            
            {user && user.userToken ? (
                
                <h1>Vous êtes déjà connecté</h1>
            
            ) : (
                
                <>
                    <h1 className="loginpage-title">Identifiez-vous</h1>
                        
                    {/**** Formulaire de connexion  ***********/}
                    <form onSubmit={handleSubmit}>
                      
                      <fieldset className="loginpage-input-label">
                        <input value={inputValue.username} onChange={handleChange} name="username" type="text" className="loginpage-input" required />
                        <label htmlFor="username" >Identifiant</label>
                      </fieldset>
                      
                      <fieldset className="loginpage-input-label">
                        <input value={inputValue.password} onChange={handleChange} name="password" type="password" className="loginpage-input" required />
                        <label htmlFor="password" >Mot de passe</label>
                      </fieldset>
                      
                      <button type="submit" className="loginpage-form-button"> Se connecter </button>
                    
                    </form>
                </>
            )}
            
            </article>
            
        </main>
    )
}

export default Login