import { useEffect , useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { token } from "../../context/token"


const CheckContact = () => {
    
    const { contactId } = useParams()
    
    const [contact, setContact] = useState([])
    
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchContactMessage = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/contact/getone/${contactId}`, {headers : token()})
                setContact(serverRes.data)
                
    
            } catch (e) {}
            
        }
        
        fetchContactMessage()
        
    }, [])
    
    
    return (
        <main>
            <h1>Message de {contact.name}</h1>
            <p>{contact.email}</p>
            <p>Sujet du message : {contact.subject}</p>
            <p>Message : {contact.message}</p>
        </main>
    )
}


export default CheckContact