import express from 'express'
import { createGame , getAllGames , getOneGame , deleteOneGame , updateGame} from '../controllers/gameController.js'
import { isAuthorized , isLogged } from '../middlewares/auth.js'
import uploadGamesImages from '../middlewares/gamesImagesMulter.js'


const gameRouter = express.Router()


/******** ROUTES **********/


/********** post ************/
/* Créer un jeu */
gameRouter.post("/new", isLogged, isAuthorized(["admin", "super-admin"]), uploadGamesImages.fields([
    { name: 'mainImg', maxCount: 1 },
    { name: 'otherImg1', maxCount: 1 },
    { name: 'otherImg2', maxCount: 1 },
    { name: 'otherImg3', maxCount: 1 },
    { name: 'otherImg4', maxCount: 1 },
    { name: 'otherImg5', maxCount: 1 },
    { name: 'otherImg6', maxCount: 1 },
]), createGame)


/*********** get ****************/
/* Récupérer tout les jeux */
gameRouter.get("/getall", getAllGames)

/* Récupérer un jeu */
gameRouter.get("/getone/:gameId", getOneGame)


/************ put **************/
/* Modifier un jeu */
gameRouter.put("/update/:gameId", isLogged, isAuthorized(["admin", "super-admin"]), uploadGamesImages.fields([
    { name: 'mainImg', maxCount: 1 },
    { name: 'otherImg1', maxCount: 1 },
    { name: 'otherImg2', maxCount: 1 },
    { name: 'otherImg3', maxCount: 1 },
    { name: 'otherImg4', maxCount: 1 },
    { name: 'otherImg5', maxCount: 1 },
    { name: 'otherImg6', maxCount: 1 },
]), updateGame)


/********** delete ***************/
/* Supprimer un jeu */
gameRouter.delete("/deleteone/:gameId", isLogged, isAuthorized(["admin", "super-admin"]), deleteOneGame)


export default gameRouter