import express from 'express'
import userRouter from "./userRouter.js"
import gameRouter from "./gameRouter.js"

const router = express.Router()

router.use("/user", userRouter)
router.use("/game", gameRouter)

export default router