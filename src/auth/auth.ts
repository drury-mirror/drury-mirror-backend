import express from 'express'
import userCreate from './user/userCreate.js'

const router = express.Router()

router.use(userCreate)

export default router
