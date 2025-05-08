import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../../middlewares/auth'

export interface ITaskController {
    create(req: AuthenticatedRequest, res: Response): Promise<void>

    getUserTasks(req: AuthenticatedRequest, res: Response): Promise<void>

    update(req: Request, res: Response): Promise<void>

    changeStatus(req: Request, res: Response): Promise<void>

    delete(req: Request, res: Response): Promise<void>
}
