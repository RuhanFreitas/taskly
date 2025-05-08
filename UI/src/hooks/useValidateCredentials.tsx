import { useEffect, useState } from 'react'

export const useValidateCredentials = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    useEffect(() => {
        const userId = localStorage.getItem('id')
        setIsLoggedIn(!!userId)
    }, [])

    return isLoggedIn
}
