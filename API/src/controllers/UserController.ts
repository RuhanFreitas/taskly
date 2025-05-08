import { Request, Response } from 'express'
import { IUserController } from '../protocols/IUser/IUserController'
import { IUserService } from '../protocols/IUser/IUserService'
import { CookiesService } from '../utils/CookiesService'
import { JwtService } from '../utils/JwtService'
import { BadRequestError, UnauthorizedError } from '../helpers/ApiErrors'
import { AuthenticatedRequest } from '../middlewares/auth'

export class UserController implements IUserController {
    cookieService
    jwtService
    constructor(private readonly userService: IUserService) {
        this.cookieService = CookiesService
        this.jwtService = JwtService
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body

        const user = await this.userService.create(data)

        const authToken = this.jwtService.generateToken(user.id)

        this.cookieService.setCookie(res, authToken)

        res.status(201).json({
            payload: user,
            message: 'User created sucessfully',
        })
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body

        const user = await this.userService.login(email, password)

        const authToken = this.jwtService.generateToken(user.id)

        this.cookieService.setCookie(res, authToken)

        res.status(200).json({
            payload: user,
            message: 'User logged in successfully.',
        })
    }

    async update(req: AuthenticatedRequest, res: Response): Promise<void> {
        const data = req.body

        const userId = req.userId

        if (!userId) {
            throw new BadRequestError(
                `You don't have permission to this kind of operation.`
            )
        }

        let user = await this.userService.updateById(userId, data)

        user = {
            ...user,
            password: '',
        }

        res.status(200).json({
            payload: user,
            message: 'Informations updated sucessfully.',
        })

        // finish update user service @@@
    }

    async logout(req: Request, res: Response): Promise<void> {
        this.cookieService.deleteCookie(res)
        res.status(200).json({
            message: 'User logged out sucessfully.',
        })
    }

    async getSelf(req: AuthenticatedRequest, res: Response): Promise<void> {
        const authToken = this.cookieService.getCookie(req)

        const userId = req.userId

        if (!authToken || !userId) {
            throw new UnauthorizedError(
                'You do not have permission to this kind of operation.'
            )
        }

        let user = await this.userService.getById(userId)

        user = { ...user, password: '' }

        res.status(200).json({
            payload: user,
            message: 'User information retrieved successfully.',
        })
    }
}
