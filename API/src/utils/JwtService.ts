import jwt, { JwtPayload } from 'jsonwebtoken'
import { StringValue } from 'ms'
import { BadRequestError } from '../helpers/ApiErrors'

export class JwtService {
    private static secret = process.env.JWT_SECRET || 'something_something'

    static generateToken(id: string, expiresIn: StringValue = '1d'): string {
        return jwt.sign({ id }, this.secret, { expiresIn })
    }

    static verifyToken(token: string): string | JwtPayload | null {
        return jwt.verify(token, this.secret)
    }

    static getUserId(authToken: string): string {
        const decoded = JwtService.verifyToken(authToken)

        if (!decoded || typeof decoded === 'string' || !('id' in decoded)) {
            throw new BadRequestError('Invalid token payload.')
        }

        const userId = decoded.id

        return userId
    }
}
