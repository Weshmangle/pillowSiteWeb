import express from 'express'
import { getAllSubscribers, getOneSubscriber, deleteSubscriber, createSubscriber, updateSubscriber } from '../controllers/newsletterController.js'
import { isAuthorized , isLogged } from '../middlewares/auth.js'


const newsletterRouter = express.Router()


/**************** ROUTES *****************/
/********** post ************/
/* Créer un nouvelle abonné */
newsletterRouter.post("/new", createSubscriber)


/*********** get ****************/
/* Récupérer tout les abonnés */
newsletterRouter.get("/getall", getAllSubscribers)

/* Récupérer un seul abonné */
newsletterRouter.get("/getone/:subscriberId", getOneSubscriber)


/************ put **************/
/* Modifier un abonné */
// newsletterRouter.put("/update/:subscriberId", updateSubscriber)


/********** delete ***************/
/* Supprimer un abonné */
newsletterRouter.delete("/delete/:subscriberId", deleteSubscriber)



export default newsletterRouter