import { User } from '@prisma/client'

export interface IUserRepository {
    create(data: Omit<User, 'id'>): Promise<User>

    findByEmail(email: string): Promise<User>

    findById(id: string): Promise<User>

    updateById(id: string, data: Partial<User>): Promise<User>

    deleteById(id: string): Promise<User>
}
