import React from "react";
import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <p className="profile__title">Привет, Виталий!</p>
      <form className="profile__form">
        <div className="profile__row">
          <label className="profile__subtitle">Имя</label>
          <input className="profile__input profile__input_line" type="text" 
            id="name" placeholder="Введите Имя" value="Виталий" name="name"
            minLength="2" maxLength="40" required
          />
        </div>
        <div className="profile__row">
          <label className="profile__subtitle">E-mail</label>
          <input className="profile__input" type="text" 
            id="email"  placeholder="Введите Email" value="admin@yandex.ru"
            name="email" minLength="2" maxLength="40" required
          />
        </div>
        <button
          className="profile__button"
          type="submit">
            Редактировать
        </button>
        <button 
          className="profile__button-singout"
          type="submit">Выйти из аккаунта
        </button>
      </form>
  </section>
  );
}

export default Profile;