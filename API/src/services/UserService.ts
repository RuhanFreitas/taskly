import { User } from '@prisma/client'
import { IUserService } from '../protocols/IUser/IUserService'
import { UserValidator } from '../utils/UserValidator'
import { BadRequestError } from '../helpers/ApiErrors'
import { IUserRepository } from '../protocols/IUser/IUserRepository'
import { BcryptService } from '../utils/BcryptService'

export class UserService implements IUserService {
    userValidator
    bcryptService
    constructor(private readonly userRepository: IUserRepository) {
        this.userValidator = UserValidator
        this.bcryptService = BcryptService
    }

    async create(data: Omit<User, 'id'>): Promise<User> {
        let userData = data

        const isDataValid = this.userValidator.validateCredentials(userData)

        if (!isDataValid) {
            throw new BadRequestError('Fields not completed correctly.')
        }

        const hashedPassword = await this.bcryptService.hashPassword(
            userData.password
        )

        userData = { ...userData, password: hashedPassword }

        let user = await this.userRepository.create(userData)

        user = { ...user, password: '' }

        return user
    }

    async login(email: string, password: string): Promise<User> {
        let user = await this.getByEmail(email)

        const isPasswordValid = await this.bcryptService.comparePassword(
            password,
            user.password
        )

        if (!isPasswordValid) {
            throw new BadRequestError('Misleading information.')
        }

        user = { ...user, password: '' }

        return user
    }

    async getById(id: string): Promise<User> {
        const userId = id

        const user = this.userRepository.findById(userId)

        return user
    }

    async getByEmail(email: string): Promise<User> {
        const userEmail = email

        const isEmailValid = this.userValidator.checkEmail(userEmail)

        if (!isEmailValid) {
            throw new BadRequestError('Invalid email.')
        }

        const user = await this.userRepository.findByEmail(userEmail)

        return user
    }

    async updateById(id: string, data: Partial<User>): Promise<User> {
        const userId = id

        const updatedUser = await this.userRepository.updateById(userId, data)

        return updatedUser
    }

    async deleteById(id: string): Promise<User> {
        const userId = id

        const deletedUser = await this.userRepository.deleteById(userId)

        return deletedUser
    }
}
