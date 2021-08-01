import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    PROYECTO_ERROR,
    MOSTRAR_MENSAJE,
    MOSTRAR_PROYECTOS,
    ELIMIAR_PROYECTOS,
    
}
    from '../../types';

    /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        

        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
            

        case AGREGAR_PROYECTOS:
            return {
                ...state,
                proyectos: [action.payload,...state.proyectos],
                formulario: false
            }
            

          

        case MOSTRAR_MENSAJE:
            return {
                ...state,
                mostrarerror: true,
            }

            case MOSTRAR_PROYECTOS:
                return{
                    ...state,
                    proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
                }
                

            case ELIMIAR_PROYECTOS:
                return{
                    ...state,
                    proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                    proyecto: null
                }  
                
           case PROYECTO_ERROR:
               return {
                   ...state,
                   mensaje:action.payload,
               }
        default:
            return state;
    }
};