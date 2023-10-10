import React from 'react';
import { Link } from 'react-router-dom';
import '../login/Login.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className="form-auth">
      <Link to="/">
        <img className="form-auth__logo" alt="логотип" src={logo}/>
      </Link>
      <p className="form-auth__title">Добро пожаловать!</p>
      <form className="form-auth__container">
        <span className="form-auth__subtitle">Имя</span>
          <input className="form-auth__input" type="name"
            id="name" name="name" minLength="2" maxLength="200"
            placeholder="Введите имя" required
          />
        <span className="form-auth__subtitle">E-mail</span>
          <input className="form-auth__input" type="text" 
            id="email" name="email" minLength="2" maxLength="40"
            placeholder="Введите Email" required
          />
          <span className="form-auth__subtitle">Пароль</span>
          <input className="form-auth__input" type="password"
            id="password" name="password" minLength="2" maxLength="200"
            placeholder="Введите пароль" required
          />
          <span className="form-auth__error"></span>
          <button className="form-auth__button form-auth__button-reg" type="submit">Зарегистрироваться</button>
          <p className="form-auth__question">Уже зарегестрированы? 
            <Link to="/signin" className="form-auth__link"> Войти</Link>
          </p>
      </form>
    </section>
  );
}

export default Register;