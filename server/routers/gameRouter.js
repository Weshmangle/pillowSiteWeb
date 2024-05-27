import express from 'express'
import { createGame , getAllGames , getOneGame , deleteOneGame } from '../controllers/gameController.js'
import { isAuthorized , isLogged } from '../middlewares/auth.js'
import uploadGamesImages from '../middlewares/gamesImagesMulter.js'


const gameRouter = express.Router()


/******** Routes **********/
// post
/* Créer un jeu */
gameRouter.post("/newgame", uploadGamesImages.fields([
    { name: 'mainImg', maxCount: 1 },
    { name: 'otherImg'},
]), createGame)


// get
/* Récupérer tout les jeux */
gameRouter.get("/getall", getAllGames)

/* Récupérer un jeu */
gameRouter.get("/getone/:gameId", getOneGame)

// put

// delete
gameRouter.delete("/deleteone/:gameId", deleteOneGame)


export default gameRouter