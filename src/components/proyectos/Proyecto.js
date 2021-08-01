import React,{useContext} from 'react'
import { ProyectoContext } from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareasContext';


export const Proyecto = ({proyecto}) => {
  const proyectosContext = useContext(ProyectoContext);
  const {mostrarProyectos} = proyectosContext;


  //TAREAS

  const tareaContext = useContext(TareaContext);
  const {obtenerTareas} = tareaContext;

  const seleccionarProyecto = id => {
    mostrarProyectos(id);
    obtenerTareas(id);
  }



    return (
       <li>
           <button

           onClick={() => seleccionarProyecto(proyecto._id)} type="button" className="btn btn-blank">
             {proyecto.nombre}
           </button>
       </li>
    )
}
