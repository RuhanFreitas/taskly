import { Task } from '@prisma/client'
import { ITaskController } from '../protocols/ITask/ITaskController'
import { ITaskService } from '../protocols/ITask/ITaskService'
import { Request, Response } from 'express'
import { CookiesService } from '../utils/CookiesService'
import { JwtService } from '../utils/JwtService'
import { BadRequestError } from '../helpers/ApiErrors'
import { AuthenticatedRequest } from '../middlewares/auth'

export class TaskController implements ITaskController {
    cookieService
    jwtService
    constructor(private readonly taskService: ITaskService) {
        this.cookieService = CookiesService
        this.jwtService = JwtService
    }

    async create(req: AuthenticatedRequest, res: Response): Promise<void> {
        let data = req.body
        const userId = req.userId

        data = { ...data, userId }

        const task = await this.taskService.create(data)

        res.status(200).json({
            payload: task,
            message: 'Task created sucessfully.',
        })
    }

    async getUserTasks(
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> {
        const userId = req.userId

        if (!userId) {
            throw new BadRequestError('You messed up!')
        }

        const tasks = await this.taskService.getUserTasks(userId)

        res.status(200).json({
            payload: tasks,
            message: 'All tasks received successfully.',
        })
    }

    async update(req: Request, res: Response): Promise<void> {
        const taskId = req.params.id
        const data = req.body

        const task = await this.taskService.update(taskId, data)

        res.status(200).json({
            payload: task,
            message: 'Task updated sucessfully.',
        })
    }

    async changeStatus(req: Request, res: Response): Promise<void> {
        const taskId = req.params.id

        const task = await this.taskService.changeStatus(taskId)

        res.status(200).json({
            payload: task,
            message: 'Task status updated successfully.',
        })
    }

    async delete(req: Request, res: Response): Promise<void> {
        const taskId = req.params.id

        const task = await this.taskService.delete(taskId)

        res.status(200).json({
            payload: task,
            message: 'Task deleted sucessfully.',
        })
    }
}
