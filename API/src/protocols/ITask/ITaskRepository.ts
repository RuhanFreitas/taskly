import { Task } from '@prisma/client'

export interface ITaskRepository {
    create(data: Omit<Task, 'id'>): Promise<Task>

    getAllByUserId(userId: string): Promise<Task[]>

    getById(id: string): Promise<Task>

    updateById(id: string, data: Partial<Task>): Promise<Task>

    changeStatus(id: string): Promise<Task>

    deleteById(id: string): Promise<Task>
}
