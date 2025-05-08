import { Delete, Edit2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, toggleTaskStatus } from '../api/taskApi'
import { TaskTypes } from '../types/Color'
import { TaskBoxTypes } from '../types/TaskBoxTypes'
import { formatDateToDisplay } from '../helpers/formatation'

const TaskBox = ({ task, setEditingTask }: TaskBoxTypes) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(false)

    const taskRef = useRef({ ...task })

    const queryClient = useQueryClient()

    const updateTaskStatus = useMutation({
        mutationFn: toggleTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            })
        },
    })

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            })
        },
    })

    useEffect(() => {
        taskRef.current = { ...task, isCompleted }
    }, [task, isCompleted])

    const handleStatusToggle = () => {
        setIsCompleted((prev) => !prev)
        updateTaskStatus.mutate(task.id)
    }

    return (
        <div
            className={`flex flex-col w-full h-full px-6 py-3 rounded-md text-zinc-50 gap-4 ${
                task.isCompleted
                    ? 'bg-zinc-900'
                    : 'bg-white border-1 border-zinc-200 text-zinc-900'
            }`}
        >
            <div className='flex justify-between'>
                <div className='flex flex-col justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 items-center'>
                            <input
                                checked={task.isCompleted}
                                onChange={handleStatusToggle}
                                type='checkbox'
                                className={`h-4 w-4 outline-none`}
                            />
                            <p
                                className={`${
                                    task.isCompleted && 'line-through'
                                } font-semibold`}
                            >
                                {task.title}
                            </p>
                        </div>
                        <p
                            className={`${
                                task.isCompleted
                                    ? 'text-zinc-50'
                                    : 'text-zinc-900'
                            } text-sm`}
                        >
                            {task.description}
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <div
                            style={{
                                backgroundColor:
                                    TaskTypes[
                                        task.type! as keyof typeof TaskTypes
                                    ],
                            }}
                            className={`px-2 py-1 rounded-md`}
                        >
                            <p className='text-sm font-semibold text-zinc-50'>
                                {task.type}
                            </p>
                        </div>
                        <div
                            className={`px-2 py-1 rounded-md ${
                                (task.priority === 'HIGH' && 'bg-red-500') ||
                                (task.priority === 'MEDIUM' &&
                                    'bg-amber-400') ||
                                (task.priority === 'LOW' && 'bg-green-500')
                            }`}
                        >
                            <p className='text-sm font-semibold text-zinc-50'>
                                {task.priority}
                            </p>
                        </div>
                        {task.tags!.map((tag) => (
                            <div
                                key={tag}
                                className={`bg-zinc-200 px-2 py-1 rounded-md`}
                            >
                                <p className='text-sm font-semibold text-zinc-900'>
                                    {tag}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <Edit2
                        onClick={() => setEditingTask(task)}
                        className='hover:scale-110'
                        width={20}
                    />
                    <Delete
                        onClick={() => deleteTaskMutation.mutate(task.id)}
                        className='hover:scale-110'
                        width={20}
                    />
                </div>
            </div>
            <div className='flex justify-between'>
                <p className='text-xl font-semibold'>
                    {formatDateToDisplay(task.date!).formatedHour}
                </p>{' '}
                {/* time - hour 12:30am */}
                <div className='flex gap-2'>
                    <p className='text-xl font-semibold'>
                        {formatDateToDisplay(task.date!).formatedDate}
                    </p>{' '}
                    {/* date - 10/05/2025 */}
                    <img
                        src='./avatartion.png'
                        className='w-6 h-6 rounded-full'
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskBox
