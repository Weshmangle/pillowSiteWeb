import Game from "../models/gameModel.js"
import dotenv from 'dotenv'

import fs from 'fs';
import path from 'path';


dotenv.config()


/**************** POST **********************/
/* Création d'un jeu */
export const createGame = async (req, res) => {
    
    try {
        
        const { title, summary, visibility, paragText, paragTitle, otherImg1, otherImg2, otherImg3, otherImg4, otherImg5, otherImg6} = req.body
        const files = req.files
        
        
        if (title.trim() === ""
        || summary.trim() === ""
        || visibility.trim() === ""
        || otherImg1 === ""
        || otherImg2 === ""
        || otherImg3 === ""
        || otherImg4 === ""
        || otherImg5 === ""
        || otherImg6 === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        }
        
        const mainImg = `/gamesImages/${files.mainImg[0].filename}`;
        const otherImg = [
            `/gamesImages/${files.otherImg1[0].filename}`,
            `/gamesImages/${files.otherImg2[0].filename}`,
            `/gamesImages/${files.otherImg3[0].filename}`,
            `/gamesImages/${files.otherImg4[0].filename}`,
            `/gamesImages/${files.otherImg5[0].filename}`,
            `/gamesImages/${files.otherImg6[0].filename}`
        ]
        
        const titleArray = JSON.parse(paragTitle)
        const textArray = JSON.parse(paragText)
        
        const newGame = new Game({
            title,
            summary,
            visibility,
            mainImg,
            otherImg,
            paragTitle : titleArray,
            paragText : textArray,
        })
        
        await newGame.save()
        
        res.status(200).json({ message : "Création du jeu réussi" })
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de créer ce jeu"})
        
    }
}


/**************** GET **********************/
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


/**************** PUT **********************/
/* Modifier le jeu */
export const updateGame = async (req, res) => {
    
    try {
        
        const { title, summary, visibility, paragText, paragTitle, otherImg1, otherImg2, otherImg3, otherImg4, otherImg5, otherImg6 } = req.body
        const files = req.files
        const { gameId } = req.params
        
        
        const updateGame = {};
        
        if (title && title.trim() !== "") {
            const titleAlreadyTaken = await Game.findOne({title})
            
            if (titleAlreadyTaken && titleAlreadyTaken.id !== gameId) {
                return res.status(401).json({message : "Ce nom est déjà utilisé pour un autre jeu"})
            }
            updateGame.title = title
        }
        
        if (summary && summary.trim() !== "") {
            const summaryAlreadyUsed = await Game.findOne({summary})
            
            if (summaryAlreadyUsed && summaryAlreadyUsed.id !== gameId) {
                return res.status(401).json({message : "Ce résumé est déjà utilisé pour un autre jeu"})
            }
            updateGame.summary = summary
        }
        
        if (visibility && visibility.trim() !== "") {
            
            if (visibility !== "private" &&
            visibility !== "public") {
                return res.status(400).json({message : "Veuillez choisir une visibilité valide"})
            }
            updateGame.visibility = visibility
        }
        
        if (paragTitle && paragTitle.trim() !== "") {
            
            const titleArray = paragTitle.split(",")
            
            updateGame.paragTitle = titleArray
        }
        
        if (paragText && paragText.trim() !== "") {
            
            const textArray = paragText.split(",")
            
            updateGame.paragText = textArray
        }
        
        
        const game = await Game.findById(gameId)
        

        updateGame.otherImg = game.otherImg
        
        
        if (files) {
            
            if (files.mainImg) {
                
                updateGame.mainImg = `/gamesImages/${files.mainImg[0].filename}`
            
            }
            
            if (files.otherImg1) {
                
                updateGame.otherImg[0] = `/gamesImages/${files.otherImg1[0].filename}`
            
            }
            
            if (files.otherImg2) {
                
                updateGame.otherImg[1] = `/gamesImages/${files.otherImg2[0].filename}`
            
            }
            
            if (files.otherImg3) {
                
                updateGame.otherImg[2] = `/gamesImages/${files.otherImg3[0].filename}`
            
            }
            
            if (files.otherImg4) {
                
                updateGame.otherImg[3] = `/gamesImages/${files.otherImg4[0].filename}`
            
            }
            
            if (files.otherImg5) {
                
                updateGame.otherImg[4] = `/gamesImages/${files.otherImg5[0].filename}`
            
            }
            
            if (files.otherImg6) {
                
                updateGame.otherImg[5] = `/gamesImages/${files.otherImg6[0].filename}`
            
            }
            
        }
        
        
        const thisGame = await Game.findById(gameId)
        
        if (thisGame.title === title
        && thisGame.summary === summary
        && thisGame.visibility === visibility
        && !req.files
        ) {
            return res.status(400).json({message : "Vous n'avez fait aucun changement"})
        }
        
        await Game.findByIdAndUpdate(gameId, updateGame)
        
        return res.status(200).json({message : "Jeu bien mis à jour"})
        
    } catch (e) {
        
        return res.status(400).json({message : "Impossible de mettre à jour ce jeu"})
        
    }
}


/**************** DELETE **********************/
/* Supprimer un jeu */
export const deleteOneGame = async (req, res) => {
    
    try {
        
        const {gameId} = req.params
        
        const game = await Game.findById(gameId)
        
        await Game.findByIdAndDelete(gameId)
        
        
        res.status(200).json({message : "Jeu supprimé avec succès"})
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Echec de la suppression de ce jeu"})
        
    }
    
}

