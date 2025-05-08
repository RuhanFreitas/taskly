import { Calendar, Home, ListCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const Aside = () => {
    return (
        <aside className='pt-4 pr-2'>
            <ul className='flex flex-col gap-4'>
                <Link
                    to={'/'}
                    className='flex gap-2 hover:bg-zinc-200 px-2 py-1 rounded-md'
                >
                    <Home width={20} /> Dashboard
                </Link>
                <button
                    disabled
                    className='flex gap-2 hover:bg-zinc-200 px-2 py-1 rounded-md'
                >
                    <ListCheck width={20} /> My Tasks
                </button>
                <button
                    disabled
                    className='flex gap-2 hover:bg-zinc-200 px-2 py-1 rounded-md'
                >
                    <Calendar width={20} /> Calendar
                </button>
                <button
                    disabled
                    className='flex gap-2 hover:bg-zinc-200 px-2 py-1 rounded-md'
                >
                    <Users width={20} /> Team
                </button>
            </ul>
        </aside>
    )
}

export default Aside
