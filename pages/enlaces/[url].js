import React, {useState} from 'react'
import axios from 'axios'
import Alerta from '../../components/Alerta'
import useApp from '../../hooks/useApp'
import { saveAs } from 'file-saver'
import { useRouter } from 'next/router'

const MuestraUrl = ({enlace}) => {
    const {  mensaje_archivo , mostrarAlerta } = useApp()
    const router = useRouter()
    const [ tienePassword, setTienePassword ] = useState(enlace.password)
    const [ password, setPassword ] = useState('');
    let noValido = false

    if(typeof enlace === "string") {
        noValido = true
    }
    const saveFile = () => {
        saveAs(
            `${process.env.NEXT_PUBLIC_FRONTEND}/${enlace.archivo}`,
            enlace.nombre_original
        )
        setTimeout(() => {            
            eliminarArchivo()
        }, 3000);
        setTimeout(() => {
            router.push('/')
        }, 3000);
    }
    const eliminarArchivo = async () => {
        try {
            await axios(`/api/file/${enlace.archivo}`)
        } catch (error) {
        }
    }
    const verificarPassword = async e => {
        e.preventDefault();
        const data = {
            password
        }
        try {
            const resultado = await axios.post(`/api/enlace/${enlace.url}`, data);
            setTienePassword(resultado.data.password);
            if(tienePassword) {
                mostrarAlerta('password incorrecta')
                setPassword('')
            }
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    }
  return (
        <>
           {noValido ? (
                <>
                    <h1 className='font-bold text-4xl text-center'> <span className='text-red-500'>archivo</span> no encontrado o enlace invalida </h1>
                </>
           ) : (
            <>
            { tienePassword ? (
                <>
                    <p className="text-center">Este enlace esta protegido por un password, colocalo a continuación</p>

                    { mensaje_archivo && <Alerta /> }
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={ e => verificarPassword(e) }
                            >
                                <div className="mb-4">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >Password</label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="Password del enlace"
                                        value={password}
                                        onChange={ e => setPassword(e.target.value) }
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                    value="Validar Password..."
                                />
                            </form>
                        </div>
                    </div>
                </>
        ) : (
            <>
                <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                <div className="flex items-center justify-center mt-10">
                    <button
                        type="button"
                        className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                        onClick={() => saveFile()}
                    >Descargar</button>
                </div>
            </>
        )}
           </>
           )}
        </>
     )
}
export async function getServerSideProps({query: {url}}) {
    try {
        const  resultado = await axios(`${process.env.NEXT_PUBLIC_FRONTEND}/api/enlace/${url}`)
    return {
        props: {
            enlace: resultado.data
        }
    }
    } catch (error) {
        const resultado = {
            msg: error.response.data.msg
        }
    return {
        props: {
            enlace: resultado.msg
        }
    }
    }
    
}

export default MuestraUrl