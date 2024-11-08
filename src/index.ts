import 'dotenv/config'
import express from 'express'

import routes from './routes/index.js'

const app = express()

app.use(express.json())

app.use('/user', routes.user)
app.use('/login', routes.login)

app.listen(process.env.PORT, () => {
    console.log(`App listening on http://localhost:${process.env.PORT}`)
})
