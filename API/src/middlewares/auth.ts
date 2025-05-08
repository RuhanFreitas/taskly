import { NextFunction, Request, Response } from 'express'
import { CookiesService } from '../utils/CookiesService'
import { JwtService } from '../utils/JwtService'
import { BadRequestError, UnauthorizedError } from '../helpers/ApiErrors'

export interface AuthenticatedRequest extends Request {
    userId?: string
}

export const AuthMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authToken = CookiesService.getCookie(req)

    if (!authToken) {
        throw new UnauthorizedError(
            `You don't have permission to acess this operation.`
        )
    }

    const decoded = JwtService.verifyToken(authToken)

    if (!decoded) {
        throw new UnauthorizedError(
            `You don't have permission to acess this operation.`
        )
    }

    req.userId = JwtService.getUserId(authToken)

    next()
}
