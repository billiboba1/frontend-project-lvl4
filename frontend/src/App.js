import './App.css';
import loginPage from './pages/loginPage';
import errorPage from './pages/errorPage';

export default App = () => {
  const count = useSelector((state) => state.counter.value);
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  switch(state) {
    case '/login':
      return (loginPage);
    case '/':
      return (chatPage);
      break;
    case '404':
      return (errorPage);
      break;
    default: 
      break;
  }
}