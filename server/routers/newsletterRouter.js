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
newsletterRouter.get("/getall", isLogged, isAuthorized(["admin", "super-admin"]), getAllSubscribers)

/* Récupérer un seul abonné */
newsletterRouter.get("/getone/:subscriberId", isLogged, isAuthorized(["admin", "super-admin"]), getOneSubscriber)


/************ put **************/
/* Modifier un abonné */
// newsletterRouter.put("/update/:subscriberId", updateSubscriber)


/********** delete ***************/
/* Supprimer un abonné */
newsletterRouter.delete("/delete/:subscriberId", isLogged, isAuthorized(["admin", "super-admin"]), deleteSubscriber)



export default newsletterRouter