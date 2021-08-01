import React, { useState, useContext,useEffect } from 'react'
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';



export const Login = (props) => {
    //extraer valorex context

    const contextAlert = useContext(alertaContext);
    const { alerta, mostrarAlerta } = contextAlert;
    const authContext = useContext(AuthContext);
    const { mensaje, auteticado, iniciarSesion } = authContext;

    //en caso de que el usuario o password no exista
    useEffect(() => {

        if(auteticado){
            props.history.push('/proyectos');
        }

        if(mensaje){

            mostrarAlerta(mensaje.msg, mensaje.categoria); 

        }

         /* eslint-disable */

    },[mensaje,auteticado,props.history]);


    const [usuario, gusardarUsuario] = useState({
        email: '',
        password: ''
    })

    const { email, password } = usuario;

    const onChange = e => {
        gusardarUsuario(
            {
                ...usuario,
                [e.target.name]: e.target.value

            }
        )
    }


    const onSubmit = e => {
        e.preventDefault();

        //validar que no haya espacios vacios
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //pasaralo al action
        iniciarSesion({email,password});
    }
    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>


                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>

            </div>

        </div>
    )
}
