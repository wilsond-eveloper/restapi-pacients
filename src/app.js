import express from 'express'
import authRoute from './routes/auth.route.js'
import noteRoute from './routes/note.route.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api',authRoute)
app.use('/api', noteRoute)

export default app