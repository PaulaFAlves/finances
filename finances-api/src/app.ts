import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as logger from 'morgan'

import { connectServerOnDB } from './config/db'
import { userRouter } from './routes/user'
import { entryRouter } from './routes/entry'

export const app = express()

app.use(cors())

app.use(express.json())

app.use(logger())

connectServerOnDB()

app.use('/user', userRouter)
app.use('/entry', entryRouter)
app.use('/', (req, res) => res.send('Finances API'))