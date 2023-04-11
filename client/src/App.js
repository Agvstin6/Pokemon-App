import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { Landing, Detail, Form, Home } from './Pages/index';
import NavBar from './components/NavBar/NavBar';

function App() {

  const location = useLocation();


  return (
    <div className="App">
      {
        location.pathname === '/' ? <Landing /> : <NavBar />
      }
      <Route path='/home' render={() => <Home />} />
      <Route path='/detail/:idPokemon' render={() => <Detail />} />
      <Route path='/create' render={() => <Form />} />
    </div>
  );
}

export default App;
