import express from 'express'

const app = express()
const port = 3000

app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
