import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { TaskRepository } from '../repositories/TaskRepository'
import { TaskService } from '../services/TaskService'
import { TaskController } from '../controllers/TaskController'
import { UserRepository } from '../repositories/UserRepository'

const mongoPrisma = new PrismaClient()

const userRepository = new UserRepository(mongoPrisma)

const taskRepository = new TaskRepository(mongoPrisma)
const taskService = new TaskService(taskRepository, userRepository)
const taskController = new TaskController(taskService)

const taskRouter = Router()

taskRouter.post('/', taskController.create.bind(taskController))
taskRouter.get('/', taskController.getUserTasks.bind(taskController))
taskRouter.put('/:id', taskController.update.bind(taskController))
taskRouter.patch(
    '/status/:id',
    taskController.changeStatus.bind(taskController)
)
taskRouter.delete('/:id', taskController.delete.bind(taskController))

export default taskRouter
