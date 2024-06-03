import Newsletter from "../models/newsletterModel.js"
import mongoose from 'mongoose'


/**************** POST **********************/
/* Nouvelle abonné à la newsletter */
export const createSubscriber = async (req, res) => {
    
    try {
        
        const { email } = req.body
        const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if (email.trim() === "") {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        } else if (!checkEmail.test(email)) {
            return res.status(400).json({message : "Veuillez saisir une adresse email valide"})
        } else if (email.length < 6) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus longue"})
        } else if (email.length > 30) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus courte"})
        }
        
        
        const newSubscriber = new Newsletter({
            email
        })
        
        
        await newSubscriber.save()
        
        
        res.status(200).json({ message : "Inscription à la newsletter confirmé" })
        
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de vous inscrire à la newsletter"})
        
    }
}



/**************** GET **********************/
/* Récupérer tout les abonnés */
export const getAllSubscribers = async (req, res) => {
    
    try {
        
        const subscribers = await Newsletter.find({})
        
        res.status(200).json(subscribers)
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de récupérer les abonnés à la newsletter"})
        
    }
}


/* Récupérer un abonné */
export const getOneSubscriber = async (req, res) => {
    
    try {
        
        const { subscriberId } = req.params
        
        const subscriber = await Newsletter.findById(subscriberId)
        
        res.status(200).json(subscriber)
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de récupérer cet abonné"})
        
    }
}



/**************** PUT **********************/
/* Mettre à jour un abonné */
export const updateSubscriber = async (req, res) => {
    
    try {
        
        const { subscriberId } = req.params
        const { status } = req.body
        
        if (status.trim() === "") {
            return res.status(400).json({message : "Veuillez définir un status pour cet abonné"})
        } else if (status !== "Actif" && status !== "Inactif") {
            return res.status(400).json({message : "Veuillez définir un status valide pour cet abonné"})
        }
        
        const editSubscriber = {
            status
        }
        
        await Newsletter.findByIdAndUpdate(subscriberId, editSubscriber)
        
        res.status(200).json({message : "Status de l'abonné mis à jour"})
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de mettre à jour le status de l'abonné"})
    }
}


/**************** DELETE **********************/
/* Récupérer un contact */
export const deleteSubscriber = async (req, res) => {
    
    try {
        
        const { subscriberId } = req.params
        
        await Newsletter.findByIdAndDelete(subscriberId)
        
        res.status(200).json({message : "Abonné supprimé de la newsletter avec succès"})
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de supprimer l'abonné de la newsletter"})
        
    }
}