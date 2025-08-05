import { Router } from 'express'
import { getAllUsers } from '../controllers/user.controller.js';
const userRouter = Router();

userRouter.get("/", getAllUsers)

userRouter.get("/:id", (req, res) => {
    res.send({ title: "Get a user" })
})

userRouter.post("/", (req, res) => {
    res.send({ title: "CREATE a user" })
})

userRouter.put("/:id", (req, res) => {
    res.send({ title: "UPDATE a user" })
})

userRouter.delete("/:id", (req, res) => {
    res.send({ title: "DELETE a user" })
})

export default userRouter;