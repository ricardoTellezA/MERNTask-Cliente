import React, { useContext, useEffect } from 'react'
import { Proyecto } from './Proyecto'
import { ProyectoContext } from '../../context/proyectos/ProyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';

export const ListadoProyectos = () => {
    //extraer proyectos
    const proyectosContext = useContext(ProyectoContext);
    // REVISAR SI PROYECTOS TIENE CONTENIDO
    const {mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext; 

    //obteber proyectos cuando carga
    useEffect(() => {

        //error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
       
        obtenerProyectos();
         /* eslint-disable */

    }, [mensaje]);
    if (proyectos.length === 0) return <p>No hay proyectos, empieza creando uno.</p>;

    return (
        <ul className="listado-proyectos">

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
            <TransitionGroup>
                {

                    proyectos.map(proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            timeout={200}
                            classNames="proyecto"

                        >
                            <Proyecto proyecto={proyecto} />
                        </CSSTransition>
                    ))

                }
            </TransitionGroup>
        </ul>
    )
}
