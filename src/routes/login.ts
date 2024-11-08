import express from 'express'
import connection from '../database.js'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

const router = express.Router()

router.post('/', async (req, res) => {
    const valid = loginSchema.safeParse(req.body)

    if (!valid.success) {
        res.status(400).json({ message: 'Invalid form data' })
        return
    }

    const [users] = await connection.query('select password_hash from user where email = ?', [valid.data.email])

    if (!Array.isArray(users)) {
        res.status(500).json({ message: 'Internal server error.' })
        return
    }

    if (users.length != 1) {
        res.status(401).json({ message: 'Invalid email or password.' })
        return
    }

    const user: any = users[0]

    if (!user || !user.password_hash || !(await bcrypt.compare(valid.data.password, user.password_hash))) {
        res.status(401).json({ message: 'Invalid email or password.' })
        return
    }

    res.status(200).json(req.body)
})

export default router
