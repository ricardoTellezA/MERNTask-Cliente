import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';



export const NuevaCuenta = (props) => {
    //extraer valorex context

    const contextAlert = useContext(alertaContext);
    
    const { alerta, mostrarAlerta } = contextAlert;

    const authContext = useContext(AuthContext);

    const {mensaje,auteticado,registrarUsuario,} = authContext;


    //en caso de que el usuario se haya autenticado 

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
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const { nombre, email, password, confirmar } = usuario;

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
        //VALIDAR CAMPOS


        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //PASSWORD MIN 6 CARACT

        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }


        //VALIDAR QUE SEA IGUAL LA PASS

        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;

        }

        //Pasarlo al action

        registrarUsuario({
            nombre,
            email,
            password
        });

    }
    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}



            <div className="contenedor-form sombra-dark">

                <h1>Obtener una cuenta</h1>
                <form onSubmit={onSubmit}>

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>


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
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesión
                </Link>

            </div>

        </div>
    )
}

