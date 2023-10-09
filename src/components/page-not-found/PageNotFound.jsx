import React from "react";
import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';
function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
}

  return (
    <section  className="page-not-found">
      <p className="page-not-found__title_xl">404</p>
      <p className="page-not-found__title">Страница не найдена</p>
      <button className="page-not-found__back" onClick={goBack}>Назад</button>
    </section>
  );
}

export default PageNotFound;