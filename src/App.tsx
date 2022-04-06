import './styling/App.css';
import { useAppSelector } from './app/hooks';

// components
import Navbar from './features/navbar/Navbar';
import MainRouter from './router/MainRouter';

const App = () => {

  //const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const loggedIn = useAppSelector(state => state.auth[0].token);
  
  return (
    <div id="app">
        <Navbar loggedIn={loggedIn}/>
        <div id="main-router-container">
          <MainRouter loggedIn={loggedIn}/>
        </div>
    </div>
  );
}

export default App;
