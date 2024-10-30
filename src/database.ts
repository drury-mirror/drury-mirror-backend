import mysql from 'mysql2/promise'
import 'dotenv/config'

export default mysql.createPool({
    host: 'mcs.drury.edu',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
})
