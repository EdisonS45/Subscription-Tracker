import { Router } from 'express'
const authRouter = Router()

authRouter.post("/sign-up", (req, res) => {
    res.send({ title: "Signup" })
})

authRouter.post("/sign-in", (req, res) => {
    res.send({ title: "Signin" })
})

authRouter.post("/sign-out", (req, res) => {
    res.send({ title: "Signout" })
})

export default authRouter