import {
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    LIMPIAR_STATE,
    AGREGA_AUTOR
} from '../../types'
import { createContext, useReducer } from 'react'
import appReducer from './appReducer'
import axios from 'axios'

const AppContext = createContext()

const AppProvider = ({children}) => {
    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: false,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    const [ state, dispatch] = useReducer(appReducer, initialState)

    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

    const subirArchivo = async (data, nombreOriginal) => {
        dispatch({
            type: SUBIR_ARCHIVO
        })
        try {
            const resultado = await axios.post('/api/archivos', data )
            dispatch({
                type:SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre:resultado.data.archivo,
                    nombre_original: nombreOriginal
                }
            })
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    const nuevoEnlace = async () => {
        const data = {
            nombre_original: state.nombre_original,
            nombre: state.nombre,
            password: state.password,
            descargas: state.descargas,
            autor: state.autor
        }
        let resultado
        try {            
            resultado = await axios.post('/api/enlace', data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload:resultado.data.msg
            })
        } catch (error) {
            mostrarAlerta(error.response.data.msg)
        }
    }
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }
    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }
    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }
    const agregarAutor = UsuarioId => {
        dispatch({
            type: AGREGA_AUTOR,
            payload: UsuarioId
        })
    }
    return(
        <AppContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                nuevoEnlace,
                limpiarState,
                agregarDescargas,
                agregarPassword,
                agregarAutor
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {
    AppProvider
}

export default AppContext