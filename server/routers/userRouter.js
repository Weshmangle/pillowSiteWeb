import express from 'express'
import { register, login } from '../controllers/userController.js'
import uploadProfilPicture from '../middlewares/profilPictureMulter.js'
// import { isAuthorized , isLogged } from '../middlewares/auth.js'

const userRouter = express.Router()


/* Routes */
userRouter.post("/register", register)
userRouter.post("/login", login)



export default userRouter