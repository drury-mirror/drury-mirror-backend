import express from 'express'
import connection from '../database.js'
import { z } from 'zod'
import { v6 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'

const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(128)
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase character' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase character' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character' })

const userSchema = z.object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    password: passwordSchema,
    confirm_password: z.string(),
}).refine(user => user.password === user.confirm_password, {
    message: 'Passwords do not match', path: ['confirm_password'],
})

const router = express.Router()

router.post('/', async (req, res) => {
    const valid = userSchema.safeParse(req.body)

    if (!valid.success) {
        res.status(400).json({ message: 'Invalid form data' })
        return
    }

    const [users] = await connection.query('select id from user where email = ?', [valid.data.email])

    if (!Array.isArray(users)) {
        res.status(500).json({ message: 'Internal server error.' })
        return
    }

    if (users.length > 0) {
        res.status(400).json({ message: 'A user with that email already exists.' })
        return
    }

    const id = uuid()
    const passwordHash = await bcrypt.hash(valid.data.password, 11)

    await connection.query('insert into user (id, email, first_name, last_name, password_hash) values (?, ?, ?, ?, ?)',
        [id, valid.data.email, valid.data.first_name, valid.data.last_name, passwordHash]
    )

    res.status(200).json(req.body)
})

export default router
