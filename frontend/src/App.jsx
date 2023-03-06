import './App.scss';
import LoginPage from './pages/loginPage';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chatPage';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Redirect} from 'react-router-dom';

export const App = () => {
  const path = useSelector((state) => state.main.path);
  const user = useSelector((state) => state.main.user);
  const navigate = useNavigate();
  const location = useLocation();
  // Возвращает метод store.dispatch() текущего хранилища
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
