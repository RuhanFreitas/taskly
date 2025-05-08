import { PrismaClient, User } from '@prisma/client'
import { IUserRepository } from '../protocols/IUser/IUserRepository'
import { ApiError } from '../helpers/ApiErrors'

export class UserRepository implements IUserRepository {
    constructor(private readonly mongoPrisma: PrismaClient) {}

    async create(data: User): Promise<User> {
        let user = await this.mongoPrisma.user.create({ data })

        if (!user) {
            throw new ApiError()
        }

        return user
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.mongoPrisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            throw new ApiError()
        }

        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.mongoPrisma.user.findUnique({ where: { id } })

        if (!user) {
            throw new ApiError()
        }

        return user
    }

    async updateById(id: string, data: Partial<User>): Promise<User> {
        const user = await this.mongoPrisma.user.update({ where: { id }, data })

        if (!user) {
            throw new ApiError()
        }

        return user
    }

    async deleteById(id: string): Promise<User> {
        const user = await this.mongoPrisma.user.delete({ where: { id } })

        if (!user) {
            throw new ApiError()
        }

        return user
    }
}
