import './App.css';
import { LoginPage } from './pages/loginPage';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chatPage';
import { useSelector, useDispatch } from 'react-redux';

export const App = () => {
  console.log();
  const path = useSelector((state) => state.main.path);
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  console.log(path);

  switch(path) {
    case '/login':
      return (<LoginPage/>);
    case '/':
      return (<ChatPage/>);
    case '404':
      return (<ErrorPage/>);
    default: 
      break;
  }
}