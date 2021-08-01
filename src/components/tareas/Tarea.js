import React, { useContext } from 'react';
import TareaContext from '../../context/tareas/TareasContext';
import { ProyectoContext } from '../../context/proyectos/ProyectoContext';

export const Tarea = ({ tarea }) => {
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    const [proyectoActual] = proyecto;


    /**TAREAS */

    const tareaContext = useContext(TareaContext);
    const {eliminarTareas ,obtenerTareas,editarTareas,selecctionarTareas } = tareaContext;

 
    const deletHomeworks = id => {
        eliminarTareas(id,proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    const estadoTarea = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }

        editarTareas(tarea);
    }

    const selectTareas = tarea => {
        selecctionarTareas(tarea)
    }




    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {
                    tarea.estado
                        ? (
                            <button 
                            type="button" 
                            className="completo"
                            onClick={() => estadoTarea(tarea)}
                            >Completo</button>
                        )
                        :
                        (
                            <button 
                            type="button" 
                            className="incompleto"
                            onClick={() => estadoTarea(tarea)}
                            >Incompleto</button>
                        )
                }
            </div>

            <div className="acciones">
                <button
                 type="button" 
                 className="btn btn-primario"
                 onClick={() => selectTareas(tarea)}
                 >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => deletHomeworks(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    )
}
