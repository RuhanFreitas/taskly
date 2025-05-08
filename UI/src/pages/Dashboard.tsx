import { Plus } from 'lucide-react'
import TaskBox from '../components/TaskBox'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useValidateCredentials } from '../hooks/useValidateCredentials'
import { getTasks } from '../api/taskApi'
import { DashboardProps } from '../types/DashboardProps'

const Dashboard = ({ setIsTaskFormOpen, setEditingTask }: DashboardProps) => {
    const isUserLoggedIn = useValidateCredentials()

    const {
        data: tasks,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
        enabled: isUserLoggedIn === true,
    })

    useEffect(() => {
        if (isUserLoggedIn) {
            refetch()
        }
    }, [isUserLoggedIn, refetch])

    return (
        <div className='pl-6 py-4 space-y-8'>
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-2xl'>Dashboard</h1>
                <button
                    disabled={!isUserLoggedIn}
                    type='button'
                    onClick={() => setIsTaskFormOpen((prev) => !prev)}
                    className='flex gap-2 bg-zinc-900 px-2 py-1 rounded-md text-zinc-50 hover:cursor-pointer hover:bg-zinc-700 hover:scale-105'
                >
                    <Plus /> New Task
                </button>
            </div>

            <div className='grid flex-wrap gap-4'>
                {isLoading && <p>Loading tasks...</p>}
                {isError && <p>Error trying to get tasks...</p>}
                {tasks &&
                    tasks.map((task) => (
                        <TaskBox
                            key={task.id}
                            setEditingTask={setEditingTask}
                            task={{
                                id: task.id,
                                title: task.title,
                                description: task.description,
                                date: task.date,
                                tags: task.tags,
                                priority: task.priority,
                                type: task.type,
                                isCompleted: task.isCompleted,
                                userId: task.userId,
                            }}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Dashboard
