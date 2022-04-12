import './styling/App.css';
import { useAppSelector } from './app/hooks';

// components
import Notifications from './features/notification/Notifications';
import Navbar from './features/navbar/Navbar';
import MainRouter from './router/MainRouter';

const App = () => {

  // getNotification("sum1d").then(resp => console.log(resp)).catch(err => console.log(err));

  //const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const loggedIn = useAppSelector(state => state.auth[0].token);
  
  return (
    <div id="app">
        <Notifications loggedIn={loggedIn}/>
        <Navbar loggedIn={loggedIn}/>
        <div id="main-router-container">
          <MainRouter loggedIn={loggedIn}/>
        </div>
    </div>
  );
}

export default App;
