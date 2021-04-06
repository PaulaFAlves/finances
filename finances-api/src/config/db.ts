import { createConnection } from 'typeorm'

export const connectServerOnDB = async () => {
    const connection = await createConnection()
    console.log(`Connected to DB ${connection.options.database}`)

    process.on('SIGINT', () => {
        connection.close().then(() => console.log('Connection closed'))
    })
}