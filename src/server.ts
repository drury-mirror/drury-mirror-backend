import express from 'express'
import connection from './database.js'
import 'dotenv/config'

const app = express()
app.use(express.json())

app.get('/', async (_req, res) => {
    const [results, _fields] = await connection.query('SELECT * FROM User')
    res.status(200).json(results)
})

app.post('/user', async (req, res) => {
    const body = req.body
    res.status(200).json(body)
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on http://localhost:${process.env.PORT}`)
})
