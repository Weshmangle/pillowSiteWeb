import express from 'express'
import userRouter from "./userRouter.js"
import gameRouter from "./gameRouter.js"
import studioRouter from "./studioRouter.js"

const router = express.Router()

router.use("/user", userRouter)
router.use("/game", gameRouter)
router.use("/studio", studioRouter)

export default router