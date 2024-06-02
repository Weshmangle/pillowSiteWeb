import Studio from "../models/studioModel.js"
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()


/**************** POST **********************/
/* Créer page studio */
export const createStudio = async (req, res) => {
    
    try {
        
        const { title, paragTitle, paragText, teamMember } = req.body
        
        const files = req.files

        
        if (title.trim() === "") {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        }
        
        
        const membersImgs = files.map(file => `/membersImage/${file.filename}`)


        // const titleArray = Array.isArray(paragTitle) ? paragTitle : paragTitle.split(",")
        // const textArray = Array.isArray(paragText) ? paragText : paragText.split(",")
        // const teamMembersArray = Array.isArray(teamMember) ? teamMember : teamMember.split(`","`)


        const titleArray = JSON.parse(paragTitle)
        const textArray = JSON.parse(paragText)
        // const teamMembersArray = JSON.parse(teamMember)
        
        
        // Extraire les membres de l'équipe depuis req.body
        const teamMembersArray = Object.keys(req.body)
            .filter(key => key.startsWith('teamMember'))
            .reduce((acc, key) => {
                const match = key.match(/teamMember\[(\d+)\]\.(name|role)/)
                if (match) {
                    const index = match[1]
                    const field = match[2]
                    if (!acc[index]) {
                        acc[index] = {}
                    }
                    acc[index][field] = req.body[key]
                }
                return acc
            }, [])


        const formattedTeamMembers = teamMembersArray.map((member, index) => ({
            name: member.name,
            role: member.role,
            memberImg: membersImgs[index]
        }));
        
        
        const newStudio = new Studio({
            title,
            paragTitle : titleArray,
            paragText : textArray,
            teamMember : formattedTeamMembers
        })
        
        
        await newStudio.save()
        
        
        res.status(200).json({ message : "Création de la page studio réussi" })
        
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de créer la page studio"})
        
    }
}


/**************** GET **********************/
/* Récupérer la page studio */
export const getStudioPage = async (req, res) => {
    
    try {
        
        const { id } = req.params
        
        const studioPage = await Studio.findById(id)
        
        res.status(200).json(studioPage)
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible d'afficher la page studio"})
        
    }
}


/**************** PUT **********************/
/* Mettre à jour la page studio */
export const updateStudio = async (req, res) => {
    
    try {
        
        const { title, paragTitle, paragText, deleteTitleIndexes, deleteTextIndexes, deleteMemberIndexes } = req.body
        const files = req.files
        const { id } = req.params

        let titleArray = []
        let textArray = []
        
        
        if (paragTitle) {
            titleArray = JSON.parse(paragTitle)
        }

        if (paragText) {
            textArray = JSON.parse(paragText)
        }


        // Extraction des images des membres
        const membersImgs = files ? files.map(file => `/membersImage/${file.filename}`) : []

        // Suppression des titres et paragraphes spécifiés
        if (deleteTitleIndexes) {
            const indexesToDelete = JSON.parse(deleteTitleIndexes)
            titleArray = titleArray.filter((_, index) => !indexesToDelete.includes(index))
        }

        if (deleteTextIndexes) {
            const indexesToDelete = JSON.parse(deleteTextIndexes)
            textArray = textArray.filter((_, index) => !indexesToDelete.includes(index))
        }

        // Extraire les membres de l'équipe depuis req.body
        let teamMembersArray = Object.keys(req.body)
            .filter(key => key.startsWith('teamMember'))
            .reduce((acc, key) => {
                const match = key.match(/teamMember\[(\d+)\]\.(name|role)/)
                if (match) {
                    const index = match[1]
                    const field = match[2]
                    if (!acc[index]) {
                        acc[index] = {}
                    }
                    acc[index][field] = req.body[key]
                }
                return acc
            }, [])
            

        // Suppression des membres spécifiés
        if (deleteMemberIndexes) {
            const indexesToDelete = JSON.parse(deleteMemberIndexes)
            teamMembersArray = teamMembersArray.filter((_, index) => !indexesToDelete.includes(index))
        }

        const objectId = new mongoose.Types.ObjectId(id)
        const studio = await Studio.findById(objectId)

        if (!studio) {
            return res.status(404).json({ message: "Document non trouvé" })
        }

        // Mise à jour des champs
        studio.title = title || studio.title;
        studio.paragTitle = titleArray.length > 0 ? titleArray : studio.paragTitle
        studio.paragText = textArray.length > 0 ? textArray : studio.paragText


        // Mettre à jour les membres de l'équipe sans écraser les anciens membres
        if (teamMembersArray.length > 0) {
            
            // Fusionner les images téléchargées avec les membres existants
            teamMembersArray.forEach((member, index) => {
                if (member) {
                    member.memberImg = membersImgs[index] || member.memberImg
                }
            })

            // Mettre à jour le tableau des membres
            studio.teamMember = studio.teamMember.map((existingMember, index) => ({
                ...existingMember,
                ...(teamMembersArray[index] || {}),
                memberImg: teamMembersArray[index] ? teamMembersArray[index].memberImg || existingMember.memberImg : existingMember.memberImg,
            }))

            // Ajouter de nouveaux membres si nécessaire
            if (teamMembersArray.length > studio.teamMember.length) {
                const newMembers = teamMembersArray.slice(studio.teamMember.length).map((member, index) => ({
                    ...member,
                    memberImg: membersImgs[studio.teamMember.length + index] || member.memberImg,
                }))
                studio.teamMember.push(...newMembers)
            }
        }

        await studio.save()

        res.status(200).json({ message: "Mise à jour de la page studio réussie" })
   
    } catch (e) {
        
        console.log(e);
        res.status(400).json({ message: "Impossible de mettre à jour la page studio" })
    
    }
}



/**************** DELETE **********************/