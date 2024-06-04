import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


/* Création d'un compte */
export const register = async (req, res) => {
    
    try {
        
        const { username, email, password, role} = req.body
        
        if (username.trim() === ""
        || email.trim() === ""
        || password.trim() === ""
        || role.trim() === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        }
        
        const loginTime = new Date()
        
        const newUser = new User({
            username,
            email,
            password,
            loginTime,
            role
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
        
        const loginTime = new Date()
        
        oneUser.loginTime = loginTime
        
        await oneUser.save()
        
        res.status(200).json({
            id : oneUser._id,
            username : oneUser.username,
            role : oneUser.role,
            email : oneUser.email,
            userToken,
            loginTime
        })
        
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de se connecter à ce compte"})
        
    }
    
}


/* Récupérer tout les utilisateurs */
export const getAllUsers = async (req, res) => {
    
    try {
        
        const allUsers = await User.find({}).select("-password").sort({ createdAt: -1 })
        
        res.status(200).json(allUsers)
        
    } catch (e) {
        
        res.status(400).json({message : "Echec lors de la récupération des utilisateurs"})
        
    }
}


/* Récupérer un seul utilisateur */
export const getOneUser = async (req, res) => {
    
    try {
        
        const {userId} = req.params
        const requestedUser = await User.findById(userId).select("-password")
        res.status(200).json(requestedUser)
        
    } catch (e) {
        
       res.status(400).json({message : "Impossible d'afficher ce compte"}) 
        
    }
}


/* Changer les informations du compte */
export const updateUserRole = async (req, res) => {
    
    try {
        
        const { userId } = req.params
        
        const { role } = req.body
        
        if (role !== "admin"
        && role !== "super-admin") {
            
            return res.status(400).json({message : "Veuillez choisir un role d'utilisateur valide"})
            
        }
        
        const user = await User.findById(userId)
        
        if (!user) {
            
            return res.status(404).json({ message: "Cet utilisateur n'existe pas" })
            
        } else if (role === user.role) {
            
            return res.status(400).json({message : "Cet utilisateur à déjà ce role"})
            
        } else if (user.role === "super-admin") {
            
            const otherSuperAdmin = await User.find({role : "super-admin"})
            
            if (otherSuperAdmin.length === 1) {
                return res.status(401).json({message : "Vous devez nommer au moins 1 autre super administrateur"})
            }
            
        }
        
        const newRole = {
            
            role,
            
        }
        
        await User.findByIdAndUpdate(userId, newRole)
        
        res.status(200).json({message : "Rôle mis à jour avec succès"})
        
    } catch (e) {
        
        res.status(401).json({message : "Echec de la mise à jour du role"})
        
    }
}


/* Changer les informations du compte */
export const updateAccount = async (req, res) => {
    
    try {
        
        const { userId } = req.params
        
        const { username , email } = req.body
        
        const updatedAccount = {}
        
        if (username && username.trim() !== "") {
            
            updatedAccount.username = username
        
        }
        
        if (email && email.trim()  !== "") {
            
            updatedAccount.email = email
        
        }
        
        await User.findByIdAndUpdate(userId, updatedAccount)
        
        res.status(200).json({message : "Compte mis à jour avec succès"})
        
    } catch (e) {
        
        res.status(401).json({message : "Echec de la mise à jour du compte"})
        
    }
}


/* Changer le mot de passe d'un utilisateur */
export const updatePassword = async (req, res) => {
    
    try {
        
        const { userId } = req.params
        const { password } = req.body
        
        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
        
        if (password.trim() === "") {
            
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
            
        } else if (!checkPassword.test(password)) {
            
            return res.status(400).json({message : "Veuillez choisir un mot de passe plus sécurisé"})
            
        }
        
        const newPassword = {
            password
        }
        
        const salt = await bcrypt.genSalt(10)
        newPassword.password = await bcrypt.hash(password, salt)
        
        
        await User.findByIdAndUpdate(userId, newPassword)
        
        res.status(200).json({message : "Mot de passe mis à jour avec succès"})
        
    } catch (e) {
        
        res.status(401).json({message : "Impossible de mettre à jour le mot de passe"})
        
    }
}


/* Authentification avec le token */
export const checkUser = async (req, res) => {
    
    try {
        
        const user = await User.findById(req.userId).select("-password")
        res.status(200).json(user)
        
    } catch (e) {
        
        res.status(400).json({message : "Erreur lors de l'authentification"})
        
    }
}


/* Supprimer un utilisateur */
export const deleteOneUser = async (req, res) => {
    
    try {
        
        const {userId} = req.params
        
        const user = await User.findById(userId)
        
        if (!user) {
            
            return res.status(404).json({ message: "Cet utilisateur n'existe pas" })
            
        } else if (user.role === "super-admin") {
            
            const otherSuperAdmin = await User.find({role : "super-admin"})
            
            if (otherSuperAdmin.length === 1) {
                return res.status(401).json({message : "Vous devez nommer au moins 1 autre super administrateur"})
            }
            
        }
        
        await User.findByIdAndDelete(userId)
        
        res.status(200).json({message : "Compte supprimé avec succès"})
        
    } catch (e) {
        
        res.status(400).json({message : "Echec de la suppression du compte"})
        
    }
    
}

