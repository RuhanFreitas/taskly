import { Dispatch, SetStateAction } from 'react'
import { Task } from './Task'

export type DashboardProps = {
    setIsTaskFormOpen: Dispatch<SetStateAction<boolean>>
    setEditingTask: Dispatch<SetStateAction<Task | undefined>>
}
