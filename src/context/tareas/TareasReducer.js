import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    MENSAJE_TAREAS,
    ELIMINAR_TAREAS,
    SELECCIONAR_TAREAS,
    EDITAR_TAREAS,
    LIMPIAR_TAREAS
}
    from '../../types/index';


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch (action.type) {

        case TAREAS_PROYECTO:
            return {
                ...state,
                proyectotareas: action.payload,
            }

        case AGREGAR_TAREAS:
            return {
                ...state,
                proyectotareas: [action.payload,...state.proyectotareas],
            }

        case MENSAJE_TAREAS:
            return {
                ...state,
                mensajeError: true,
            }

        case ELIMINAR_TAREAS:
            return {

                ...state,
                proyectotareas: state.proyectotareas.filter(tarea => tarea._id !== action.payload),

            }
        case EDITAR_TAREAS:
        
            return {
                ...state,
                proyectotareas: state.proyectotareas.map(tarea => tarea._id === action.payload._id ?
                     action.payload : tarea),

            }

            case SELECCIONAR_TAREAS: 
            return{
                ...state,
                seleccionartarea: action.payload,
            }

            case LIMPIAR_TAREAS:
                return {
                    ...state,
                    seleccionartarea:null,
                }





        default:
            return state
    }
}