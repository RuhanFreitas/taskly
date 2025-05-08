import { PrismaClient, Task } from '@prisma/client'
import { ITaskRepository } from '../protocols/ITask/ITaskRepository'
import { ApiError, BadRequestError } from '../helpers/ApiErrors'

export class TaskRepository implements ITaskRepository {
    constructor(private readonly mongoPrisma: PrismaClient) {}

    async create(data: Task): Promise<Task> {
        const task = await this.mongoPrisma.task.create({ data })

        if (!task) {
            throw new ApiError()
        }

        return task
    }

    async getAllByUserId(userId: string): Promise<Task[]> {
        const tasks = await this.mongoPrisma.task.findMany({
            where: { userId },
        })

        if (!tasks) {
            throw new ApiError('Aqui')
        }

        return tasks
    }

    async getById(id: string): Promise<Task> {
        const task = await this.mongoPrisma.task.findUnique({ where: { id } })

        if (!task) {
            throw new BadRequestError('Task not found.')
        }

        return task
    }

    async updateById(id: string, data: Partial<Task>): Promise<Task> {
        const task = await this.mongoPrisma.task.update({ where: { id }, data })

        return task
    }

    async changeStatus(id: string): Promise<Task> {
        let task = await this.getById(id)

        task = await this.mongoPrisma.task.update({
            where: { id },
            data: { isCompleted: !task.isCompleted },
        })

        return task
    }

    async deleteById(id: string): Promise<Task> {
        const task = await this.mongoPrisma.task.delete({ where: { id } })

        return task
    }
}
