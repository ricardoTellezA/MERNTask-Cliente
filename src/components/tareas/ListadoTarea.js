import React, { useContext } from 'react'
import { Tarea } from './Tarea';
import { ProyectoContext } from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareasContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export const ListadoTarea = () => {

    const proyectosContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyectos } = proyectosContext;


    /**TAREAS */

    const tareaContext = useContext(TareaContext);
    const { proyectotareas } = tareaContext;

    if (!proyecto) return <h2>Seleccione un proyecto</h2>
    const [proyectoActual] = proyecto;





    const eliminarProyecto = () => {
        eliminarProyectos(proyectoActual._id);
    }
    return (

        <>
            <h2>Proyecto:{proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {
                    proyectotareas.length === 0 ? <li className="tarea"> <p>No hay tareas</p></li>
                        :
                        <TransitionGroup>

                            {proyectotareas.map(tarea => (
                                <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                                >
                                    <Tarea
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))
                            }
                        </TransitionGroup>


                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={eliminarProyecto}
            >Eliminar proyecto &times;</button>


        </>
    )
}
