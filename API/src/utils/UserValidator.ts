interface Credentials {
    name: string
    email: string
    password: string
}

export class UserValidator {
    static checkName(name: string): boolean {
        const isValid = name.length >= 3 && typeof name === 'string'

        if (isValid) {
            return true
        } else {
            return false
        }
    }

    static checkEmail(email: string): boolean {
        const isValid = email.includes('@') && email.length >= 9

        if (isValid) {
            return true
        } else {
            return false
        }
    }

    static checkPassword(password: string): boolean {
        const isValid = password.length >= 6

        if (isValid) {
            return true
        } else {
            return false
        }
    }

    static validateCredentials({ name, email, password }: Credentials) {
        if (
            this.checkName(name) &&
            this.checkEmail(email) &&
            this.checkPassword(password)
        ) {
            return true
        } else {
            return false
        }
    }
}
