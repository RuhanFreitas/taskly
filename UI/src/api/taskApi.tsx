import { Task } from '../types/Task'
import { api, httpResponseTask } from './api'

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get<httpResponseTask<Task[]>>('/task')

    return response.data.payload
}

export const addTask = async (
    taskData: Omit<Task, 'id' | 'userId'>
): Promise<Task[]> => {
    const response = await api.post<httpResponseTask<Task[]>>('/task', taskData)

    return response.data.payload
}

export const updateTask = async (
    taskData: Omit<Task, 'userId'>
): Promise<Task> => {
    const { id, ...data } = taskData

    const response = await api.put<httpResponseTask<Task>>(`/task/${id}`, data)

    return response.data.payload
}

export const toggleTaskStatus = async (id: string): Promise<Task> => {
    const response = await api.patch<httpResponseTask<Task>>(
        `/task/status/${id}`
    )

    return response.data.payload
}

export const deleteTask = async (id: string): Promise<Task> => {
    const response = await api.delete<httpResponseTask<Task>>(`/task/${id}`)

    return response.data.payload
}
