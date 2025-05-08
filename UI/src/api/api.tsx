import axios from 'axios'

export type httpResponse = {
    payload: {
        email: string
        id: string
        name: string
        password: string
    }
    message: string
}

export type httpResponseTask<T> = {
    payload: T
    message: string
}

export const api = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
})
