import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

export const Sidebar = () => {

  const {auth} = useAuth()

  return (
    <aside className='md:w-80 px-5 py-10'>
        <p
        className='text-xl font-bold text-white'
        >
            Hola:  {auth.name}
        </p>
        <Link
            to="create-project"
            className='bg-purple-800 w-full p-3 text-white uppercase font-bold rounded-md block mt-5 text-center hover:bg-purple-900 transition-colors mb-4'
        >
            Nuevo proyecto
        </Link>
    </aside>
  )
}
