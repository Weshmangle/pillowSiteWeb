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
contactRouter.get("/getall", getAllContacts)

/* Récupérer un seul contact */
contactRouter.get("/getone/:contactId", getOneContact)


/************ put **************/
/* Modifier un contact */
contactRouter.put("/update/:contactId", updateContact)


/********** delete ***************/
/* Supprimer un contact */
contactRouter.delete("/delete/:contactId", deleteContact)



export default contactRouter