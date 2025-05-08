import { Auth } from '../types/Login'
import { api, httpResponse } from './api'

export const login = async (userData: Auth) => {
    const response = await api.post<httpResponse>('/user/login', userData)

    const { id } = response.data.payload
    localStorage.setItem('id', id)

    return response.data
}

export const register = async (userData: Auth) => {
    const response = await api.post<httpResponse>('/user/register', userData)

    const { id } = response.data.payload
    localStorage.setItem('id', id)

    return response.data
}
