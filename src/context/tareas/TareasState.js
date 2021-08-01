import React, { useReducer } from 'react'
import TareaContext from './TareasContext';
import TareaReducer from './TareasReducer';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    MENSAJE_TAREAS,
    ELIMINAR_TAREAS,
    SELECCIONAR_TAREAS,
    EDITAR_TAREAS,
    LIMPIAR_TAREAS,
}
    from '../../types/index';
    import clienteAxios from '../../config/axios.js';
    


export const TareasState = props => {

    const initialState = {
    

        proyectotareas: [],
        mensajeError: false,
        seleccionartarea: null,
    }
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async proyecto => {
        console.log(proyecto);
      try {

        const resultado = await clienteAxios.get('/api/tareas',{params:{proyecto}});
        console.log(resultado);
        dispatch({
            type: TAREAS_PROYECTO,
            payload:resultado.data.tareas,
        })
          
      } catch (error) {
          console.log(error);
      }
    }

    const agregarTareas = async tarea => {
        console.log(tarea);
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREAS,
                payload: tarea,
            })
        } catch (error) {
            console.log(error);
        }
      
    }


    const mensajeTareas = () => {
        dispatch({
            type: MENSAJE_TAREAS,
        });

    }

    const eliminarTareas = async (id,proyecto) => {
       try {

        await clienteAxios.delete(`/api/tareas/${id}`, {params:{proyecto}});

        dispatch({
            type: ELIMINAR_TAREAS,
            payload: id,
        })
       } catch (error) {
           console.log(error);
           
       }
    }

    const editarTareas = async tarea => {
        try {

            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
            console.log(resultado);


            dispatch({
                type: EDITAR_TAREAS,
                payload: resultado.data.tarea,
            });
            
        } catch (error) {
            console.log(error);
        }
       
    }

    const selecctionarTareas = tarea =>{
        dispatch({
            type: SELECCIONAR_TAREAS,
            payload: tarea,
        })
    }


    


    const limpiarTareas = () => {
        dispatch({
            type: LIMPIAR_TAREAS
        })
    }
    return (

        <TareaContext.Provider
            value={{
                
                proyectotareas: state.proyectotareas,
                mensajeError: state.mensajeError,
                seleccionartarea:state.seleccionartarea,
                obtenerTareas,
                agregarTareas,
                mensajeTareas,
                eliminarTareas,
                selecctionarTareas,
                editarTareas,
                limpiarTareas

            }}
        >
            {props.children}
        </TareaContext.Provider>

    )
}

export default TareasState;



