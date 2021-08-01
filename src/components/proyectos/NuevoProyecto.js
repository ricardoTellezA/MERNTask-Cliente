import React, { useContext, useState } from 'react'
import { ProyectoContext } from '../../context/proyectos/ProyectoContext';
export const NuevoProyecto = () => {



    const proyectosContext = useContext(ProyectoContext);
    const {
        formulario
        , mostrarerror, mostrarFormulario,
        agregarProyectos, mostrarMensaje } = proyectosContext;
        
    const [proyecto, guardarProyecto] = useState({
        nombre: '',
    });

    //EXTRAYENDO VALORES DE PROYECTO

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar proyecto

        if (nombre === '') {
            mostrarMensaje();
            return;
        }

        //agregar al state
        agregarProyectos(proyecto);

        //Reiniciar el form

        guardarProyecto({
            nombre: ''
        });
    }

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo proyecto</button>



            {
                formulario ?
                    (<form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar proyecto"
                            onChange={onChangeProyecto}
                        />
                    </form>)
                    : null
            }

            {
              mostrarerror ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null  
            }



        </>
    )
}
