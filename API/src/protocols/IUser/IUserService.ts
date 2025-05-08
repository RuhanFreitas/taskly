import { User } from '@prisma/client'

export interface IUserService {
    create(data: Omit<User, 'id'>): Promise<User>

    login(email: string, password: string): Promise<User>

    getByEmail(email: string): Promise<User>

    getById(id: string): Promise<User>

    updateById(id: string, data: Partial<User>): Promise<User>

    deleteById(id: string): Promise<User>
}
