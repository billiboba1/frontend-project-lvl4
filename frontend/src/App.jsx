import './App.scss';
import LoginPage from './pages/loginPage';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chatPage';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

export const App = () => {
  const path = useSelector((state) => state.main.path);
  // Возвращает метод store.dispatch() текущего хранилища
  const navigate = (newPath) => useNavigate(newPath);
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatPage/>} />
        <Route path='login' element={<LoginPage />} />
        <Route path='404' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
