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
        <main className="container dashboard-main">
            
            <h1>Message de {contact.name}</h1>
            
            <section className="dashboard-contact-info">
                <h2>Informations</h2>
                <p>{contact.email}</p>
                <p>Status : <span className={contact.status === "Traité" ? "dashboard-status-positive" : "dashboard-status-negative"}>{contact.status}</span></p>
                <p>Sujet du message : {contact.subject}</p>
            </section>
            
            <section>
                <h1>Message :</h1>
                <p>{contact.message}</p>
            </section>
        </main>
    )
}


export default CheckContact