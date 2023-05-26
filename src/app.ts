import express from 'express'
import morgan from 'morgan'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(userRoutes)
app.use(authRoutes)

export default app