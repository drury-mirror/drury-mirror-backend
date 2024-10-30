import express from 'express'
import database from './database.js'

const app = express()
const port = 3000

app.get('/', async (_req, res) => {
    const db = await database.getConnection()
    const [rows, fields] = await db.execute('SELECT * FROM User');
    db.release()
    res.status(200).json(rows)
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
