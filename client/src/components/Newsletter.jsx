import { useState , useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Newsletter = () => {
    
    
    const [inputValue, setInputValue] = useState({
        email : ""
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
            
            const { email } = inputValue
            
            if (email.trim() === "") {
                return toast.error("Veuillez saisir votre adresse email")
            }
            
            const serverRes = await axios.post("/api/newsletter/new", inputValue)
            
            
            setInputValue({
                email : ""
            })
    
            scrollTo(0,0)
            
            return toast.success(serverRes.data.message)
            
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
        }
    }
    
    
    return (
        <article className="newsletter-article">
            <h2>Inscrivez-vous à notre newsletter</h2>
            <p className="newsletter-paragraph">Donec in vestibulum urna. Sed aliquam tellus at metus vehicula ultricies. Integer semper viverra velit, non efficitur libero aliquam non. Suspendisse potenti. Proin in odio vel sapien cursus viverra. In hac habitasse platea dictumst.</p>
            
            
            {/**** Formulaire ****/}
            <form onSubmit={handleSubmit}>
                <fieldset className="newsletter-fieldset">
                    <input value={inputValue.username} onChange={handleChange} name="email" type="text" required />
                    <label htmlFor="email" >Adresse email</label>
                 </fieldset>
                 
                 <button type="submit" className="newsletter-button" >S'abonner</button>
            </form>
        </article>
    )
}

export default Newsletter