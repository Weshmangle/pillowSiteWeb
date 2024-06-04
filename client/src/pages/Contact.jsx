import { useState , useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Contact = () => {
    
    
    const [inputValue, setInputValue] = useState({
        name : "",
        email: "",
        subject: "",
        message: ""
    })
    
    
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
            
            const { name, email, subject, message } = inputValue
            
            if (name.trim() === ""
            || email.trim() === ""
            || subject.trim() === ""
            || message.trim() === "") {
                return toast.error("Veuillez remplir tout les champs")
            }
            
            const serverRes = await axios.post("/api/contact/new", inputValue)
            
            
            setInputValue({
                name: "",
                email : "",
                subject: "",
                message: ""
            })
    
            scrollTo(0,0)
            
            return toast.success(serverRes.data.message)
            
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
        }
    }
    
    
    return (
        <main className="contact-page-main container">
            
            {/****** Bloc du formulaire *******/}
            <article className="contactpage-article">
            
            <h1 className="contactpage-title">Formulaire de contact</h1>
                
                {/***** Formulaire de contact ***********/}
                <form onSubmit={handleSubmit}>
                  
                  <fieldset className="contactpage-input-label">
                    <input value={inputValue.name} onChange={handleChange} name="name" type="text" className="contactpage-input" required />
                    <label htmlFor="name" >Nom</label>
                  </fieldset>
                  
                  <fieldset className="contactpage-input-label">
                    <input value={inputValue.email} onChange={handleChange} name="email" type="text" className="contactpage-input" required />
                    <label htmlFor="email" >Adresse email</label>
                  </fieldset>
                  
                  <fieldset className="contactpage-input-label">
                    <input value={inputValue.subject} onChange={handleChange} name="subject" type="text" className="contactpage-input" required />
                    <label htmlFor="subject" >Objet du message</label>
                  </fieldset>
                  
                  <textarea value={inputValue.message} onChange={handleChange} name="message" type="text" className="contactpage-textarea" placeholder="Votre message" required />
                    
                  <button type="submit" className="contactpage-form-button"> Envoyer </button>
                
                </form>
            
            </article>
            
        </main>
    )
}

export default Contact