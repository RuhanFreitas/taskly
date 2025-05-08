import { Task } from '@prisma/client'
import { ITaskService } from '../protocols/ITask/ITaskService'
import { ITaskRepository } from '../protocols/ITask/ITaskRepository'
import { TaskValidator } from '../utils/TaskValidator'
import { IUserRepository } from '../protocols/IUser/IUserRepository'
import { BadRequestError } from '../helpers/ApiErrors'

export class TaskService implements ITaskService {
    taskValidator
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly userRepository: IUserRepository
    ) {
        this.taskValidator = TaskValidator
    }

    async create(taskData: Omit<Task, 'id'>): Promise<Task> {
        const date = new Date(taskData.date)

        taskData = {
            ...taskData,
            date,
        }

        this.taskValidator.validate(taskData)

        const task = await this.taskRepository.create(taskData)

        return task
    }

    async getTask(id: string): Promise<Task> {
        const task = await this.taskRepository.getById(id)

        return task
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new BadRequestError(
                `You don't have acess to this kind of operation.`
            )
        }

        const tasks = await this.taskRepository.getAllByUserId(userId)

        return tasks
    }

    async update(id: string, data: Partial<Task>): Promise<Task> {
        const taskId = id

        const task = await this.taskRepository.updateById(id, data)

        return task
    }

    async changeStatus(id: string): Promise<Task> {
        const task = await this.taskRepository.changeStatus(id)

        return task
    }

    async delete(id: string): Promise<Task> {
        let task = await this.taskRepository.getById(id)

        if (!task) {
            throw new BadRequestError('You messed up.')
        }

        task = await this.taskRepository.deleteById(id)

        return task
    }
}
