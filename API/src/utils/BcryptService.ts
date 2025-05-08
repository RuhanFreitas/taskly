import bcrypt from 'bcryptjs'

export class BcryptService {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
    }

    static async comparePassword(
        userPassword: string,
        dbPassword: string
    ): Promise<boolean> {
        const isTheSamePassword = bcrypt.compare(userPassword, dbPassword)

        return isTheSamePassword
    }
}
