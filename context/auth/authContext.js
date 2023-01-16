import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    USUARIO_AUTENTICADO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OCULTAR_ALERTA

} from '../../types'
import axios from 'axios'
import { createContext, useReducer } from 'react'
import authReducer from './authReducer'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [ state, dispatch ] = useReducer(authReducer , initialState)

    const buscarUsuario = async () => {
        if(state.token === '') return {}
        try {
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${state.token}`
                }
            }
            const respuesta = await axios('/api/auth', config)
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data
            })
        } catch (error) {
        }
    }

    const registrarUsuario = async datos => {
        try {
            const respuesta = await axios.post('/api/usuarios', datos)
            dispatch({
                type:REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            dispatch({
                type:REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }
        setTimeout(() => {
            dispatch({
                type:OCULTAR_ALERTA
            })
        }, 3000);
    }
    const iniciarSesion = async datos => {
        try {
            const respuesta = await axios.post('/api/auth', datos)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            buscarUsuario()
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
       setTimeout(() => {
        dispatch({
            type:OCULTAR_ALERTA
        })
    }, 3000);
    
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                buscarUsuario,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext