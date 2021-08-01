import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { NuevaCuenta } from './components/auth/NuevaCuenta';
import { Proyectos } from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/ProyectoState';
import TareasState from './context/tareas/TareasState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autentificacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';
//revisar si tenemos un token

const token = localStorage.getItem('token');
if(token){

  tokenAuth(token);

}


function App() {
  // console.log(process.env.REACT_APP_BACKEND_URL);
  return (

    <ProyectoState>
      <TareasState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareasState>
    </ProyectoState>

  );
}

export default App;
