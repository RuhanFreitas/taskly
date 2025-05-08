import { Priority, Task, Type } from '@prisma/client'
import { BadRequestError } from '../helpers/ApiErrors'
import { z } from 'zod'

const taskSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().min(3, 'Description is required'),
    tags: z.array(z.string()),
    isCompleted: z.boolean(),
    date: z.date(),
    type: z.nativeEnum(Type),
    priority: z.nativeEnum(Priority),
    userId: z.string(),
})

export class TaskValidator {
    static validate(taskData: Omit<Task, 'id'>) {
        const result = taskSchema.safeParse(taskData)

        if (!result.success) {
            throw new BadRequestError('Missing or invalid information.')
        }

        return true
    }
}
