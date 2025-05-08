import { Task } from './Task'

export type TaskFormProps = {
    setIsTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    task: Partial<Task> | undefined
}
