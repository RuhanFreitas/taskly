import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { errorMiddleware } from './middlewares/error'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRouter'
import taskRouter from './routes/taskRouter'
import { AuthMiddleware } from './middlewares/auth'

const app = express()

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/task', AuthMiddleware, taskRouter)

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
