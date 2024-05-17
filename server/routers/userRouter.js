import express from 'express'
import {register, login, getAllUsers, getOneUser, deleteOneUser, checkUser, updateUserRole} from '../controllers/userController.js'
import uploadProfilPicture from '../middlewares/profilPictureMulter.js'
import { isAuthorized , isLogged } from '../middlewares/auth.js'

const userRouter = express.Router()


/******** Routes **********/
// post
/* Création d'un compte */
userRouter.post("/register", register)

/* Connexion à un compte */
userRouter.post("/login", login)


// get
/* Récupérer tout les utilisateurs */
userRouter.get("/getall",isLogged, isAuthorized(["super-admin"]), getAllUsers)

/* Récupérer un seul utilisateur */
userRouter.get("/getone/:userId", isLogged, isAuthorized(["super-admin"]), getOneUser)

/* Authentification avec le token */
userRouter.get("/check", isLogged, checkUser)


// put
/* Changer le role d'un compte */
userRouter.put("/updaterole/:userId", isLogged, isAuthorized(["super-admin"]), updateUserRole)


// delete
/* Supprimer un utilisateur */
userRouter.delete("/deleteone/:userId", isLogged, isAuthorized(["super-admin"]), deleteOneUser)



export default userRouter