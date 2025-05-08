import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask, updateTask } from '../api/taskApi'
import { formatDateToDatabase, formatTags } from '../helpers/formatation'
import { TaskTypes } from '../types/Color'
import { TaskFormProps } from '../types/TaskFormProps'

const TaskForm = ({ setIsTaskFormOpen, task }: TaskFormProps) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tags, setTags] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [type, setType] = useState<string>('STUDY')
    const [priority, setPriority] = useState<string>('LOW')

    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (task) {
            if (task.title) setTitle(task.title)
            if (task.description) setDescription(task.description)
            if (task.tags) setTags(task.tags.join())
            if (task.date) {
                setDate(new Date(task.date!).toISOString().split('T')[0])

                setTime(
                    new Date(task.date!).toISOString().split('T')[1].slice(0, 5)
                )
            }
            if (task.type) setType(task.type)
            if (task.priority) setPriority(task.priority)

            setIsEditing(true)
        }
    }, [task])

    const queryClient = useQueryClient()

    const addTaskMutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            })
        },
    })

    const updateTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            })
        },
    })

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const formatedDate = formatDateToDatabase({ date, time })
        const tagsArray = formatTags(tags)

        if (!isEditing) {
            const newTask = {
                title,
                description,
                date: formatedDate,
                isCompleted: false,
                tags: tagsArray,
                type,
                priority,
            }

            addTaskMutation.mutate(newTask)
        }

        if (isEditing) {
            const newTask = {
                id: task!.id!,
                title,
                description,
                date: formatedDate,
                isCompleted: false,
                tags: tagsArray,
                type,
                priority,
            }

            updateTaskMutation.mutate(newTask)
        }

        setIsTaskFormOpen(false)
    }

    return (
        <form className='flex flex-col gap-4 px-6 py-4 w-[45%] bg-zinc-50 m-auto mt-8 rounded-md'>
            <h1 className='font-semibold text-lg pb-2'>Add Task</h1>
            <label>
                <p className='pb-1'>Title</p>
                <input
                    value={title}
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter task title'
                    className='outline-none border border-zinc-200 px-2 py-1 rounded-md w-full'
                />
            </label>
            <label>
                <p className='pb-1'>Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Enter task description'
                    className='outline-none border border-zinc-200 px-2 py-1 rounded-md w-full'
                />
            </label>
            <label>
                <p className='pb-1'>Tags</p>
                <input
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                    type='text'
                    placeholder='Enter task tags: design, project...'
                    className='outline-none border border-zinc-200 px-2 py-1 rounded-md w-full'
                />
            </label>
            <div className='flex justify-between gap-6'>
                <label className='w-full'>
                    <p className='pb-1'>Date</p>
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        type='date'
                        className='outline-none border border-zinc-200 px-2 py-1 rounded-md w-full'
                    />
                </label>
                <label className='w-full'>
                    <p className='pb-1'>Time</p>
                    <input
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        type='time'
                        className='outline-none border border-zinc-200 px-2 py-1 rounded-md w-full'
                    />
                </label>
            </div>
            <label>
                <p className='pb-1'>Type</p>
                <select
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    className='w-full px-2 py-1 outline-none border border-zinc-200 rounded-md'
                >
                    {Object.entries(TaskTypes).map(([key]) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </label>
            <div>
                <p className='pb-1'>Priority</p>
                <div className='flex gap-4'>
                    <label>
                        <input
                            onChange={(e) => setPriority(e.target.value)}
                            checked={priority === 'HIGH'}
                            type='radio'
                            value='HIGH'
                        />{' '}
                        High
                    </label>
                    <label>
                        <input
                            onChange={(e) => setPriority(e.target.value)}
                            type='radio'
                            checked={priority === 'MEDIUM'}
                            value='MEDIUM'
                        />{' '}
                        Medium
                    </label>
                    <label>
                        <input
                            onChange={(e) => setPriority(e.target.value)}
                            type='radio'
                            checked={priority === 'LOW'}
                            value='LOW'
                        />{' '}
                        Low
                    </label>
                </div>
            </div>
            <div className='flex gap-4 mt-4'>
                <button
                    onClick={handleSubmit}
                    className='bg-zinc-900 px-4 py-1.5 rounded-md text-white hover:cursor-pointer hover:bg-zinc-700 hover:scale-105'
                >
                    Add Task
                </button>
                <button
                    onClick={() => setIsTaskFormOpen((prev) => !prev)}
                    className='border border-zinc-200 px-4 py-1.5 rounded-md hover:cursor-pointer hover:bg-zinc-300 hover:scale-105'
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default TaskForm
