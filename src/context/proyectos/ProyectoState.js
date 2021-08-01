import React, { useReducer } from 'react';
import { ProyectoContext } from './ProyectoContext';

import ProyectoReducer from './ProyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    PROYECTO_ERROR,
    MOSTRAR_MENSAJE,
    MOSTRAR_PROYECTOS,
    ELIMIAR_PROYECTOS
}
    from '../../types';
import clienteAxios from '../../config/axios.js';



const ProyectoState = props => {


    const initialState = {
        proyectos: [],
        formulario: false,
        mostrarerror: false,
        proyecto: null,
        mensaje: null,
    }

    //ACCIONES

    const [state, dispatch] = useReducer(ProyectoReducer, initialState);


    //finciones

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
        })
    }

    //OBTENER PROYECTOS

    const obtenerProyectos = async () => {


        try {
            const resultado = await clienteAxios.get('/api/proyecto')
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria:'alerta-error',
            }
            dispatch({
              type:PROYECTO_ERROR,
              payload: alerta,
            });
        }


    }




    //AGREGA EL PROYECTO
    const agregarProyectos = async proyectos => {


        try {
            const resultado = await clienteAxios.post('/api/proyecto', proyectos);
            console.log(resultado);

            //INSERTAR EL PROYECTO EN EL STATE
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data,
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria:'alerta-error',
            }
            dispatch({
              type:PROYECTO_ERROR,
              payload: alerta,
            });
        }



    }
    //MENSAJE ERROR

    const mostrarMensaje = () => {
        dispatch({
            type: MOSTRAR_MENSAJE,
        })
    }

    const mostrarProyectos = proyecto => {
        dispatch({
            type: MOSTRAR_PROYECTOS,
            payload: proyecto

        });
    }


    const eliminarProyectos = async proyectoId => {


        try {

            await clienteAxios.delete(`/api/proyecto/${proyectoId}`);
            dispatch({
                type: ELIMIAR_PROYECTOS,
                payload: proyectoId,
            });
            
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria:'alerta-error',
            }
            dispatch({
              type:PROYECTO_ERROR,
              payload: alerta,
            });
        }
       
    }
    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                mostrarerror: state.mostrarerror,
                proyecto: state.proyecto,
                mensaje:state.mensaje, 
                mostrarFormulario,
                obtenerProyectos,
                agregarProyectos,
                mostrarMensaje,
                mostrarProyectos,
                eliminarProyectos

            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )

}

export default ProyectoState;


