import React,{useContext,useEffect} from 'react';
import { Route,Redirect } from 'react-router-dom';
import AuthContext from '../../context/autentificacion/authContext';

const RutaPrivada = ({component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const {auteticado, cargando,userAutenticado} = authContext;
    useEffect(() => {
        userAutenticado();

         /* eslint-disable */
    },[]);
    return (  

        <Route {...props} render={props => !auteticado && !cargando ? (

            <Redirect to="/"/>

        ): (

            <Component {...props}/>

        )}
        
        
        />
    );
}
 
export default RutaPrivada;
