import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../api/userApi'
import { AuthProps } from '../types/AuthProps'

const Auth = ({ setIsAuthOpen }: AuthProps) => {
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate(0)
            setIsAuthOpen(false)
        },
    })

    const registerUser = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate(0)
            setIsAuthOpen(false)
        },
    })

    const handleAuthentication = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!name) {
            const data = {
                email,
                password,
            }

            loginUser.mutate(data)
            return
        }

        const data = {
            name,
            email,
            password,
        }

        registerUser.mutate(data)
        return
    }

    return (
        <div className='flex flex-col gap-4 px-6 py-4 w-[25%] bg-zinc-50 m-auto mt-8 rounded-md'>
            <form className='flex flex-col gap-6'>
                <div className='flex border-b border-zinc-200'>
                    <h1
                        onClick={() => setIsLogin(true)}
                        className={`font-semibold cursor-pointer pb-2 ${
                            isLogin && 'border-b border-zinc-900'
                        } px-6`}
                    >
                        Login
                    </h1>
                    <h1
                        onClick={() => setIsLogin(false)}
                        className={`font-semibold cursor-pointer pb-2 ${
                            !isLogin && 'border-b border-zinc-900'
                        } px-6`}
                    >
                        Register
                    </h1>
                </div>
                {!isLogin && (
                    <label>
                        <p className='pb-1'>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            placeholder='Enter your name'
                            className='w-full outline-none py-1 px-2 border border-zinc-200 rounded-md'
                        />
                    </label>
                )}
                <label>
                    <p className='pb-1'>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
                        placeholder='Enter your email'
                        className='w-full outline-none py-1 px-2 border border-zinc-200 rounded-md'
                    />
                </label>
                <label>
                    <p className='pb-1'>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Enter your password'
                        className='w-full outline-none py-1 px-2 border border-zinc-200 rounded-md'
                    />
                </label>
                <div className='flex justify-between'>
                    <div className='flex justify-center items-center gap-2'>
                        <input type='checkbox' className='w-4 h-4' /> Remember
                        me
                    </div>
                    <span>Forgot password?</span>
                </div>
                <div>
                    <button
                        onClick={handleAuthentication}
                        className='bg-zinc-900 w-full py-2 rounded-md text-zinc-50 hover:scale-105 hover:bg-zinc-700'
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Auth
