import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import useValidacion from "../hooks/useValidacion"
import validarIniciarSesion from '../validacion/validarIniciarSesion'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'


const STATE_INICIAL = {
    email: '',
    password: ''
  }

  const login = () => {
    const { mensaje, iniciarSesion, autenticado } = useAuth()
    const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, handleIniciarSesion)
    const router = useRouter()

    useEffect(() => {
      if (autenticado) {
        router.push('/')
      }
    },[autenticado])

    async function handleIniciarSesion() {
      iniciarSesion(valores)
    }

    return (
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>iniciar Sesion</h2>
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-lg'>
              <form onSubmit={handleSubmit} className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>

              {mensaje && <Alerta />}
      
                <div className='mb-4'>
                  <label className='block text-black text-sm font-bold mb-2 uppercase' htmlFor='email'>email</label>
                  <input 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type="email"
                    id="email"
                    name="email"
                    placeholder='email de usuario...'
                    value={valores.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errores.email && <p className='bg-red-500 p-2 text-white rounded font-bold text-center'>{errores.email}</p>}
                <div className='mb-4'>
                  <label className='block text-black text-sm font-bold mb-2 uppercase' htmlFor='password'>password</label>
                  <input 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type="password"
                    id="password"
                    name="password"
                    value={valores.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errores.password && <p className='bg-red-500 p-2 text-white rounded font-bold text-center'>{errores.password}</p>}
                <input 
                  type="submit"
                  className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-3'
                  value="Iniciar Sesion"
                />
              </form>
          </div>
        </div>
      </div>
    )
  }
  
  export default login