import express from 'express'
import 'dotenv/config'
import auth from './auth/auth.js'

const app = express()

app.use(express.json())

app.use('/auth', auth)

app.listen(process.env.PORT, () => {
    console.log(`App listening on http://localhost:${process.env.PORT}`)
})
