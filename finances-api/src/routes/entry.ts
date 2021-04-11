import { UserController } from './../controller/UserController';
import { Router } from 'express'
import { EntryController } from '../controller/EntryController'
import { Entry } from '../entity/Entry';

export const entryRouter = Router()
const entryController = new EntryController()
const userController = new UserController()

entryRouter.post('/', async (req, res) => {
    const { userId, value, description, date } = req.body
    const user = await userController.userById(userId)

    if (user) {
        const entry = new Entry(value, description, date, userId)
        const savedEntry = await entryController.save(entry)
        res.json(savedEntry)
    } else {
        res.status(404).json({ mensagem: 'Usuario nao encontrado' })
    }

})