import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/ApiErrors'

export const errorMiddleware = async (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal server error.'

    res.status(statusCode).json({ message: message })
}
