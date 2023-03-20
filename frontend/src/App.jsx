import './App.scss';
import LoginPage from './pages/loginPage';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chatPage';
import onChange from 'on-change';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Outlet} from 'react-router-dom';

export const App = () => {
  const path = useSelector((state) => state.main.path);
  const user = useSelector((state) => state.main.user);
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatPage/>} />
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
