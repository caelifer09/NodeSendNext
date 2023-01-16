import React , {useEffect}from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import useApp from '../hooks/useApp'
import { useRouter } from 'next/router'

const Header = () => {
    const { usuario, cerrarSesion, buscarUsuario } = useAuth()
    const { limpiarState } = useApp()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
          buscarUsuario()
        }
      },[])

      const redireccionar = () => {
        limpiarState()
        router.push('/')
      }
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>

            <Image 
                src={'/logo.svg'}
                priority
                width={250}
                height={250}
                alt={'nodesend next'}
                onClick={() => redireccionar() }
            />
        <div className='flex gap-1'>
            {usuario ? (
                <>
                    <div className="flex items-center">
                            <p className="mr-2">Hola {usuario.nombre}</p>
                            <button 
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={() => cerrarSesion()}
                            >Cerrar Sesión</button>
                        </div>
                </>
            ) : (
                <>
                     <Link href="/login">
                      <p className='bg-red-500 px-5 py-3 rounded-lg uppercase text-white font-bold'>iniciar sesion</p>
                    </Link>
                    <Link href="/crearcuenta">
                        <p className='bg-black px-5 py-3 rounded-lg uppercase text-white font-bold'>Crear cuenta</p>
                    </Link>
               </>
            )}
        </div>
    </header>
  )
}

export default Header