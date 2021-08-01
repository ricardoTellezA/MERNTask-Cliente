import React, { useContext, useState, useEffect } from 'react'
import { ProyectoContext } from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareasContext';


export const FormTarea = () => {
    //PROYECTS
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;
    /**HOMEWORS */

    const tareaContext = useContext(TareaContext);
    const { seleccionartarea, agregarTareas, mensajeTareas, mensajeError,
        obtenerTareas, editarTareas, limpiarTareas } = tareaContext;

    //STATE OF HOMEWORS

    const [tarea, guardarTarea] = useState({
        nombre: '',

    });

    useEffect(() => {
        if (seleccionartarea !== null) {
            guardarTarea(seleccionartarea);
        } else {
            guardarTarea({
                nombre: '',
            })
        }
    }, [seleccionartarea])


    const { nombre } = tarea;

    if (!proyecto) return null;
    const [proyectoActual] = proyecto;

    //READ HOMEWORKS
    const hadleChange = e => {

        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit = e => {
        e.preventDefault();


        //VALIDAR

        if (nombre.trim() === '') {
            mensajeTareas();
            return;
        }

        //PASAR VALIDACION

        if (seleccionartarea === null) {
            //PASAR TAREAS nueva
            tarea.proyecto = proyectoActual._id;
            
            agregarTareas(tarea);

        } else {
            editarTareas(tarea);
            limpiarTareas();
        }

      
        obtenerTareas(proyectoActual.id);
        //REINICIAR FORM
        guardarTarea({
            nombre: '',

        });


    }

    return (
        <div className="formulario">
            <form action="" onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={hadleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={seleccionartarea ? "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>

            {
                mensajeError ? <p className="mensaje error">Ingresa una tarea.</p> : null
            }


        </div>
    )
}
