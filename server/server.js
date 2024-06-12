import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {dataBaseConnection} from './config/database.js'
import router from './routers/router.js'


/* Charge les variables d'environnement */
dotenv.config()

/* Établit la connexion à la base de données */
dataBaseConnection

/* Initialise une application Express */
const app = express()


/********* Middlewares ************/
/* Middleware pour parser le corps des requêtes JSON */
app.use(express.json())

/* Middleware pour parser les données URL-encodées (application/x-www-form-urlencoded) */
app.use(express.urlencoded({extended : true}))

/* Middleware pour servir les fichiers statiques du répertoire "public" */
app.use(express.static("public"))

/* Autorise uniquement le client à accéder aux ressources des routes API */
app.use(cors({
    origin: process.env.CLIENT_URL
}))

/* Route API (toutes préfixées par /api) */
app.use("/api", router)


/******* Démarre le serveur et écoute sur le port défini
dans les variables d'environnement *********************/
app.listen(process.env.PORT, () => {
    console.log(`[ NODE.JS - SERVER ] Server is running : ${process.env.BASE_URL}:${process.env.PORT}`)
})
