export type Task = {
    id: string
    title: string
    description: string
    isCompleted: boolean
    date: Date
    tags: string[]
    type: string
    priority: string
    userId: string
}
