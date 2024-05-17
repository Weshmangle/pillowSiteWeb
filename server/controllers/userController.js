import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


/* Création d'un compte */
export const register = async (req, res) => {
    
    try {
        
        const { username, email, password } = req.body
        
        if (username.trim() === ""
        || email.trim() === ""
        || password.trim() === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        }
        
        const newUser = new User({
            username,
            email,
            password
        })
        
        const salt = await bcrypt.genSalt(10)
        
        newUser.password = await bcrypt.hash(password , salt)
        
        await newUser.save()
        
        res.status(200).json({ message : "Création du compte réussi" })
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de créer ce compte"})
        
    }
    
}


/* Connexion à un compte */
export const login = async (req, res) => {
    
    try {
        
        const { username, password } = req.body
        
        if (username.trim() === ""
        || password.trim() === "") {
            return res.status(401).json({message : "Veuillez remplir tout les champs"})
        }
        
        const oneUser = await User.findOne({username})
        
        if (!oneUser) {
            return res.status(404).json({message : "Aucun compte trouvé avec ce nom d'utilisateur"})
        }
        
        const validPassword = bcrypt.compareSync(password, oneUser.password)
        
        if (!validPassword) {
            return res.status(401).json({message : "Mot de passe incorrect"})
        }
        
        const userToken = jwt.sign({id : oneUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION})
        
        
        res.status(200).json({
            id : oneUser._id,
            username : oneUser.username,
            role : oneUser.role,
            email : oneUser.email,
            userToken
        })
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de se connecter à ce compte"})
        
    }
    
}

/* Récupérer tout les utilisateurs */

/* Récupérer un seul utilisateur */

/* Changer les informations du compte */

/* Changer le mot de passe d'un utilisateur */

/* Authentification */

/* Supprimer un utilisateur */