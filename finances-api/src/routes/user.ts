import { UserController } from './../controller/UserController';
import { Router } from 'express'
import { User } from '../entity/User';

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/', async (req, res) => {
    const { name, email} = req.body
    const user = new User(name, email)
    const savedUser = await userController.save(user)
    res.json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const users = await userController.allUsers()
    res.json(users)
})

userRouter.get('/entry/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId)
    const entry = await userController.entryByUser(userId)
    res.json(entry)
})