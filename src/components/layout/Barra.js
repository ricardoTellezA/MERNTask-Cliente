import React,{useEffect,useContext} from 'react'
import AuthContext from '../../context/autentificacion/authContext';


export const Barra = () => {
    //extraer la información de autenticación 
    const authContext = useContext(AuthContext);
    const {usuario, userAutenticado, cerrarSesion} = authContext;

    useEffect(() => {
        userAutenticado();
     //eslint-disable-next-line
    }, []);

    return (
        <header className="app-header">

            {usuario ?  <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
           

            <nav className="nav-principal">
                <button
                className="btn btn-blank cerrar-sesion"
                onClick={() => cerrarSesion() }
                >Cerrar Sesión</button>
            </nav>
        </header>
    )
}
