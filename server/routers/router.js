import express from 'express'
import userRouter from "./userRouter.js"
import gameRouter from "./gameRouter.js"
import studioRouter from "./studioRouter.js"
import contactRouter from "./contactRouter.js"
import newsletterRouter from "./newsletterRouter.js"


const router = express.Router()

router.use("/user", userRouter)
router.use("/game", gameRouter)
router.use("/studio", studioRouter)
router.use("/contact", contactRouter)
router.use("/newsletter", newsletterRouter)

export default router