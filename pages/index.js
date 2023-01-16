import React , {useEffect, useState}from 'react'
import useAuth from '../hooks/useAuth'
import Link from 'next/link'
import Dropzone from '../components/Dropzone'
import useApp from '../hooks/useApp'
import Alerta from '../components/Alerta'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function Home() {
  const { buscarUsuario, usuario } = useAuth()
  const { mensaje_archivo, url, agregarAutor } = useApp()
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      buscarUsuario()
    }
    
  },[])
  useEffect(() => {
    if(usuario) {
      agregarAutor(usuario._id)
    }
  },[usuario])

  return (
    <>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32 mt-10'>
      {url ? (
        <>
          <p className='text-center text-4xl'>Tu URL es : {`${process.env.NEXT_PUBLIC_FRONTEND}/enlaces/${url}`}</p>             
          <CopyToClipboard text={`${process.env.NEXT_PUBLIC_FRONTEND}/enlaces/${url}`}
            onCopy={() => setCopiado(true)}>
                <button 
                    type="submit"
                    className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10'
                  >copiar enlace</button>
          </CopyToClipboard>
          {copiado && <p className='text-center text-2xl text-green-400 font-bold '>Copiado !!!</p>}
        </>
      ) : (
        <>
           {mensaje_archivo && <Alerta>{mensaje_archivo}</Alerta>}
          <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
            <Dropzone />
              <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                  <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>Compartir Archivos</h2>
                  <p className='text-lg leading-loose'>
                    <span className='text-red-500 font-bold'>Next Node Send </span> te permite compartir archivos con cifrado de extremo a extremo
                  </p>
                  <Link href="/crearcuenta"> <p className='text-red-500 font-bold text-lg hover:text-red-700'>Crea una cuenta para mayores beneficios</p></Link>
              </div>
          </div>
        </>
      )}
      </div>
    </>
  )
}
