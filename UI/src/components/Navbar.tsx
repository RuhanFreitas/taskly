import { Bell } from 'lucide-react'
import { useValidateCredentials } from '../hooks/useValidateCredentials'
import { NavbarProps } from '../types/NavbarProps'

const Navbar = ({ setIsAuthOpen }: NavbarProps) => {
    const isLoggedIn = useValidateCredentials()

    return (
        <div className='flex justify-between items-center py-4 border-b border-zinc-200 px-6'>
            <h1 className='font-semibold text-xl'>Taskly</h1>
            <div className='flex gap-4 items-center'>
                <Bell width={20} />
                <button
                    disabled={!!isLoggedIn}
                    onClick={() => setIsAuthOpen((prev) => !prev)}
                >
                    <img
                        src='./avatartion.png'
                        className='w-10 h-10 rounded-full'
                    />
                </button>
            </div>
        </div>
    )
}

export default Navbar
