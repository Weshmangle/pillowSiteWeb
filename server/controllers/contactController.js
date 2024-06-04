import Contact from "../models/contactModel.js"
import mongoose from 'mongoose'


/**************** POST **********************/
/* Créer un contact */
export const createContact = async (req, res) => {
    
    try {
        
        const { name, email, subject, message } = req.body
        const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if (name.trim() === ""
        || email.trim() === ""
        || subject.trim() === ""
        || message.trim() === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        } else if (name.length < 2) {
            return res.status(400).json({message : "Veuillez saisir un nom plus long"})
        } else if (email.length < 6) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus longue"})
        } else if (subject.length < 2) {
            return res.status(400).json({message : "Veuillez saisir un sujet de message plus long"})
        } else if (name.length > 25) {
            return res.status(400).json({message : "Veuillez saisir un nom plus court"})
        } else if (email.length > 30) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus courte"})
        } else if (subject.length > 30) {
            return res.status(400).json({message : "Veuillez saisir un sujet de message plus court"})
        } else if (!checkEmail.test(email)) {
            return res.status(400).json({message : "Veuillez saisir une adresse email valide"})
        } else if (message.length < 10) {
            return res.status(400).json({message : "Veuillez saisir un message plus long"})
        } else if (message.length > 3000) {
            return res.status(400).json({message : "Veuillez saisir un message plus court"})
        }
        
        
        const newContact = new Contact({
            name,
            email,
            subject,
            message,
            status : "Non traité"
        })
        
        
        await newContact.save()
        
        
        res.status(200).json({ message : "Message envoyé avec succès" })
        
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible d'envoyer le message"})
        
    }
}



/**************** GET **********************/
/* Récupérer tout les contacts */
export const getAllContacts = async (req, res) => {
    
    try {
        
        const contact = await Contact.find({}).sort({ createdAt: -1 })
        
        res.status(200).json(contact)
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de récupérer les contacts"})
        
    }
}


/* Récupérer un contact */
export const getOneContact = async (req, res) => {
    
    try {
        
        const { contactId } = req.params
        
        const contact = await Contact.findById(contactId)
        
        res.status(200).json(contact)
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de récupérer le contact"})
        
    }
}



/**************** PUT **********************/
/* Mettre à jour un contact */
export const updateContact = async (req, res) => {
    
    try {
        
        const { contactId } = req.params
        const { status } = req.body
        
        if (status.trim() === "") {
            return res.status(400).json({message : "Veuillez définir un status pour ce contact"})
        } else if (status !== "Non traité" && status !== "Traité") {
            return res.status(400).json({message : "Veuillez définir un status valide pour ce contact"})
        }
        
        const editContact = {
            status
        }
        
        await Contact.findByIdAndUpdate(contactId, editContact)
        
        res.status(200).json({message : "Status du contact mis à jour"})
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de mettre à jour le status du contact"})
    }
}


/**************** DELETE **********************/
/* Récupérer un contact */
export const deleteContact = async (req, res) => {
    
    try {
        
        const { contactId } = req.params
        
        await Contact.findByIdAndDelete(contactId)
        
        res.status(200).json({message : "Contact supprimer avec succès"})
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de supprimer le contact"})
        
    }
}