import React,{useContext, useEffect} from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Barra } from '../layout/Barra';
import { FormTarea } from '../tareas/FormTarea';
import { ListadoTarea } from '../tareas/ListadoTarea';
import AuthContext from '../../context/autentificacion/authContext';



export const Proyectos = () => {

    //extraer la información de autenticación 
    const authContext = useContext(AuthContext);
    const{userAutenticado} = authContext;

    useEffect(() => {
        userAutenticado();
          /* eslint-disable */
    },[]);
    
   
    return (
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
                <Barra />

                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTarea />
                    </div>
                </main>
            </div>
        </div>
    )
}
