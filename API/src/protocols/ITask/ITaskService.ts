import { Task } from '@prisma/client'

export interface ITaskService {
    create(taskData: Omit<Task, 'id'>): Promise<Task>

    getUserTasks(userId: string): Promise<Task[]>

    getTask(id: string): Promise<Task>

    update(id: string, data: Partial<Task>): Promise<Task>

    changeStatus(id: string): Promise<Task>

    delete(id: string): Promise<Task>
}
