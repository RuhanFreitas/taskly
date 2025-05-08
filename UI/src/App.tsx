import { Route, Routes } from 'react-router-dom'
import Aside from './components/Aside'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { useValidateCredentials } from './hooks/useValidateCredentials'
import { Task } from './types/Task'
import TaskForm from './components/TaskForm'

const App = () => {
    const [isAddTaskOpen, setIsTaskFormOpen] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)

    const isUserLoggedIn = useValidateCredentials()

    useEffect(() => {
        if (isUserLoggedIn === false) {
            setIsAuthOpen(true)
        }
    }, [isUserLoggedIn])

    useEffect(() => {
        if (editingTask) {
            setIsTaskFormOpen(true)
        }
    }, [editingTask])

    return (
        <div className='h-screen overflow-x-hidden relative'>
            <Navbar setIsAuthOpen={setIsAuthOpen} />

            {isAddTaskOpen && (
                <div className='absolute h-full top-0 w-full z-30 bg-zinc-900/20'>
                    <TaskForm
                        task={editingTask}
                        setIsTaskFormOpen={setIsTaskFormOpen}
                    />
                </div>
            )}
            {isAuthOpen && (
                <div className='absolute h-full top-0 w-full z-30 bg-zinc-900/20'>
                    <Auth setIsAuthOpen={setIsAuthOpen} />
                </div>
            )}
            <div className='grid grid-cols-6 px-6'>
                <div className='col-span-1 border-r border-zinc-200'>
                    <Aside />
                </div>
                <div className='col-span-5'>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Dashboard
                                    setEditingTask={setEditingTask}
                                    setIsTaskFormOpen={setIsTaskFormOpen}
                                />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
