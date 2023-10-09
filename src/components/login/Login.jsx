import React from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function Login() {
  return (
    <section className="form-auth">
      <Link to="/">
        <img className="form-auth__logo" alt="логотип" src={logo}/>
      </Link>
      <p className="form-auth__title">Рады видеть!</p>
      <form className="form-auth__container">
      <span className="form-auth__subtitle">E-mail</span>
        <input className="form-auth__input" type="email" 
          id="email" name="email" minLength="2" maxLength="40"
          placeholder="Введите Email"
        />
        <span className="form-auth__error"></span>
        <span className="form-auth__subtitle">Пароль</span>
        <input className="form-auth__input" type="password"
          id="password" name="password" minLength="2" maxLength="200"
          placeholder="Введите пароль"
        />
        
        <span className="form-auth__error"></span>
        <button className="form-auth__button form-auth__button-login" type="submit">Войти</button>
        <p className="form-auth__question">Еще не зарегистрированы?
          <Link to="/signup" className="form-auth__link"> Регистрация</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;