import React from 'react'
import useAuth from '../hooks/useAuth'
import useApp from '../hooks/useApp'

const Alerta = () => {
    const { mensaje } = useAuth()
    const { mensaje_archivo } = useApp()

  return (
    <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>{mensaje || mensaje_archivo}</div>
  )
}

export default Alerta