import { Request, Response } from 'express'

export class CookiesService {
    constructor() {}

    static setCookie(res: Response, token: string) {
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        })
    }

    static getCookie(req: Request): string | undefined {
        return req.cookies['authToken']
    }

    static deleteCookie(res: Response) {
        res.clearCookie('authToken')
    }
}
