import { UserController } from '../controllers/UserController'
import { UserService } from '../services/UserService'
import { PrismaClient } from '@prisma/client'
import { UserRepository } from '../repositories/UserRepository'
import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/auth'

const mongoPrisma = new PrismaClient()

const userRepository = new UserRepository(mongoPrisma)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const userRouter = Router()

userRouter.post('/register', userController.create.bind(userController))
userRouter.post('/login', userController.login.bind(userController))
userRouter.post(
    '/logout',
    AuthMiddleware,
    userController.logout.bind(userController)
)
userRouter.get(
    '/getSelf',
    AuthMiddleware,
    userController.getSelf.bind(userController)
)

export default userRouter
