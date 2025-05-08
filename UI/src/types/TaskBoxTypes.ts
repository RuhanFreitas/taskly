import { Dispatch, SetStateAction } from 'react'
import { Task } from './Task'

export type TaskBoxTypes = {
    task: Task
    setEditingTask: Dispatch<SetStateAction<Task | undefined>>
}
