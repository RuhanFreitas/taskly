import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../../middlewares/auth'

export interface IUserController {
    create(req: Request, res: Response): Promise<void>

    login(req: Request, res: Response): Promise<void>

    update(req: AuthenticatedRequest, res: Response): Promise<void>

    logout(req: Request, res: Response): Promise<void>

    getSelf(req: AuthenticatedRequest, res: Response): Promise<void>
}
