import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>
        Страница не найдена
      </h2>
      <button onClick={() => navigate('/')}>Вернуться на главную</button>
    </>
  )
}