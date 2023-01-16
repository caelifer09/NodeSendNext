import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    USUARIO_AUTENTICADO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OCULTAR_ALERTA

} from '../../types'

export default(state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                mensaje: action.payload.message,
                token: action.payload.token,
                autenticado: true
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload
            }
            case CERRAR_SESION: 
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null, 
                token: null,
                autenticado: null
            }
        default:
            return state
    }
}