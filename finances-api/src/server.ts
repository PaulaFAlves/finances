import { app } from './app'

const PORT = 3000

const server = app.listen(PORT, () => console.log(`Listen to port ${PORT}`))

process.on('SIGINT', () => {
    server.close()
    console.log('App ended')
})