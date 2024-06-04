import express from 'express'
import { getAllContacts, getOneContact, deleteContact, createContact, updateContact } from '../controllers/contactController.js'
import { isAuthorized , isLogged } from '../middlewares/auth.js'


const contactRouter = express.Router()


/**************** ROUTES *****************/
/********** post ************/
/* Créer un nouveau contact */
contactRouter.post("/new", createContact)


/*********** get ****************/
/* Récupérer tout les contacts */
contactRouter.get("/getall", isLogged, isAuthorized(["admin", "super-admin"]), getAllContacts)

/* Récupérer un seul contact */
contactRouter.get("/getone/:contactId", isLogged, isAuthorized(["admin", "super-admin"]), getOneContact)


/************ put **************/
/* Modifier un contact */
contactRouter.put("/update/:contactId", isLogged, isAuthorized(["admin", "super-admin"]), updateContact)


/********** delete ***************/
/* Supprimer un contact */
contactRouter.delete("/delete/:contactId", isLogged, isAuthorized(["admin", "super-admin"]), deleteContact)



export default contactRouter