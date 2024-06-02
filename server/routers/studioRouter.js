import express from 'express'
import { createStudio , updateStudio , getStudioPage } from '../controllers/studioController.js'
import { isAuthorized , isLogged } from '../middlewares/auth.js'
import uploadTeamMemberImg from '../middlewares/teamMembersMulter.js'


const studioRouter = express.Router()


/******** ROUTES **********/
/********** post ************/
/* Créer une page studio */
studioRouter.post("/new", uploadTeamMemberImg.any(), createStudio)


/*********** get ****************/
/* Récupérer la page studio */
studioRouter.get("/get/:id", getStudioPage)


/************ put **************/
/* Modifier la page studio */
studioRouter.put("/update/:id", uploadTeamMemberImg.any(), updateStudio)



/********** delete ***************/



export default studioRouter