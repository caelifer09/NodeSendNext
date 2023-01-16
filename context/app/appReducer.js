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

export default(state, action) => {
    switch (action.type) {
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: false
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: false
            }
        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                mensaje_archivo: null,
                nombre: '',
                nombre_original: '',
                cargando: false,
                descargas: 1,
                password: '',
                autor: null,
                url: ''
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            }
        case AGREGA_AUTOR:
            return {
                ...state,
                autor: action.payload
            }
        default:
            return state
    }
}