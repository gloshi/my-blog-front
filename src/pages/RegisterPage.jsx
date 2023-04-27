import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, registerUser } from '../store/slices/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
const RegisterPage = () => {
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    console.log(status)

    useEffect(() => {
        if(status){
            toast(status)
        }
        if(isAuth) navigate('/')
    },[status,isAuth,navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form onSubmit={(e) => e.preventDefault()}  className='w-1/4 h-60 mx-auto mt-40'>
            <h1 className='text-lg text-white text-center'>Регистрация</h1>
            <label className='text-xs text-white'>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}

                    placeholder='Username'
                    className='mt-1 text-black w-full rounded-lg bg-purple-200 border py-2.5 px-2 text-xl outline-none placeholder:text-gray-700'
                />
            </label>
            <label className='text-xs text-white'>
                Password:
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Password'
                    className='mt-1 text-black w-full rounded-lg bg-purple-200 border py-2.5 px-2 text-xl outline-none placeholder:text-gray-700'
                />
            </label>
            <div className='flex gap-8 justify-center mt-4'>
                <button
                    onClick={handleSubmit}
                    type='submit'
                    className='mt-5 flex justify-center items-center text-sm bg-gray-600 text-white rounded-sm py-2 px-4'
                >
                    Зарегистрироваться
                </button>
                <Link
                    to='/login'
                    className='mt-5 flex justify-center items-center text-sm text-white'
                >
                    Уже есть аккаунт?
                </Link>
            </div>
    </form>
  )
}

export default RegisterPage