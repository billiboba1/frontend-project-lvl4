import './App.scss';
import LoginPage from './pages/loginPage';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chatPage';
import RegistrationPage from './pages/registrationPage';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Outlet} from 'react-router-dom';

export const App = () => {
  const path = useSelector((state) => state.main.path);
  const user = useSelector((state) => state.main.user);
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatPage/>} />
        <Route path='login' element={<LoginPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
