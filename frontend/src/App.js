import './App.scss';
import { LoginPage } from './pages/loginPage';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chatPage';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const path = useSelector((state) => state.main.path);
  console.log(path);
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  console.log(path);

  switch(path) {
    case '/login':
      console.log(<LoginPage/>);
      return (<LoginPage/>);
    case '/':
      return (<ChatPage/>);
    case '404':
      return (<ErrorPage/>);
    default: 
      break;
  }
}