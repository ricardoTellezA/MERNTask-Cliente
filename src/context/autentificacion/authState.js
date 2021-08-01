import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";




const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        auteticado: null,
        usuario: null,
        mensaje: null,
        cargando: true,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);


    //FUNCIONES

    const registrarUsuario = async datos => {
        try {

            const respuesta = await clienteAxios.post('/api/usuarios', datos);


            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //obtener el usuario

            userAutenticado();

        } catch (error) {
            // console.log(error.data.msg); 

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error',
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //retorna el usuario autenticado
    const userAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta);

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {

            console.log(error);
            dispatch({
                type: LOGIN_ERROR

            })

        }
    }


    //CUANDO EL USUARIO INICIA SESIÓN
    const iniciarSesion = async datos => {
        try {

            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
           //obtener usuario
           userAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error',
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }


    //CIERRA SESIÓN

    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }



    return (

        <AuthContext.Provider
            value={{
                token: state.token,
                auteticado: state.auteticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando:state.cargando,
                registrarUsuario,
                userAutenticado,
                iniciarSesion,
                userAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>



    )

}
export default AuthState;


