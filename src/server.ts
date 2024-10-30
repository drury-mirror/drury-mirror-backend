import express from 'express'
import connection from './database.js'

const app = express()
const port = 3000

app.get('/', async (_req, res) => {
    const [results, _fields] = await connection.query('SELECT * FROM User');
    res.status(200).json(results)
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
