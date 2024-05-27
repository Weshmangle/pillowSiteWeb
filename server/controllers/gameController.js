import Game from "../models/gameModel.js"
import dotenv from 'dotenv'

dotenv.config()

/* Création d'un jeu */
export const createGame = async (req, res) => {
    
    try {
        
        const { title, summary, visibility, paragText, paragTitle} = req.body
        const files = req.files
        
        
        if (title.trim() === ""
        || summary.trim() === ""
        || visibility.trim() === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        }
        
        const mainImg = files.mainImg ? `/public/gamesImages/${files.mainImg[0].filename}` : null;
        const otherImg = files.otherImg ? files.otherImg.map(file => `/public/gamesImages/${file.filename}`) : [];
        
       
        
        const newGame = new Game({
            title,
            summary,
            visibility,
            mainImg,
            otherImg,
            paragTitle,
            paragText,
        })
        
        await newGame.save()
        
        res.status(200).json({ message : "Création du jeu réussi" })
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de créer ce jeu"})
        
    }
}

/* Récupérer tout les jeux */
export const getAllGames = async (req, res) => {
    
    try {
        
        const allGames = await Game.find({})
        
        res.status(200).json(allGames)
        
    } catch (e) {
        
        res.status(400).json({message : "Echec lors de la récupération des jeux"})
        
    }
}

/* Récupérer un seul utilisateur */
export const getOneGame = async (req, res) => {
    
    try {
        
        const {gameId} = req.params
        const requestedGame = await Game.findById(gameId)
        res.status(200).json(requestedGame)
        
    } catch (e) {
        
       res.status(400).json({message : "Impossible d'afficher ce jeu"}) 
        
    }
}

/* Supprimer un jeu */
export const deleteOneGame = async (req, res) => {
    
    try {
        
        const {gameId} = req.params
        
        const game = await Game.findById(gameId)
        
        await Game.findByIdAndDelete(gameId)
        
        res.status(200).json({message : "Jeu supprimé avec succès"})
        
    } catch (e) {
        
        res.status(400).json({message : "Echec de la suppression de ce jeu"})
        
    }
    
}