import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { validName, validEmail } from "../../utils/validation";

function Profile({
  onSignOut,
  disabled,
  setEditInputProfileActive,
  editInputProfileActive,
  isInputProfileChanges,
  setInputProfileChanges,
  handleEditProfile,
  errorServer,
  setErrorServer,
  errorFront,
  setErrorFront
}) {
  const currentUser = useContext(CurrentUserContext);
  const [formProfile, setFormProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [errors, setErrors] = useState({ name: "", email: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormProfile({
      ...formProfile,
      [name]: value,
    });

    const profileErrors = {
      ...errors,
      [name]: name === "name" ? validName(value) : validEmail(value),
    };

    setErrors(profileErrors);

    // Проверяем наличие ошибок
    let hasInputErrors = false;
    for (let key in profileErrors) {
      if (profileErrors[key] !== "") {
        hasInputErrors = true;
        break;
      }
    }

    if (hasInputErrors) {
      setErrorFront("");
    }

    setErrorServer("");

    setInputProfileChanges((prevInfo) => ({
      ...prevInfo,
      [name]:
        name === "name" || name === "email"
          ? value !== currentUser[name]
          : prevInfo[name],
    }));
  };

  // Проверяем были ли изменения
  const isProfileChange = Object.values(isInputProfileChanges).some(
    (value) => value
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // хранение ошибок валидации полей 
    const profileErrors = {
      email: validEmail(formProfile.email),
      name: validName(formProfile.name),
    };

    setErrors(profileErrors);
    
    // проверка на валидность
    const isFormValid =
      Object.values(profileErrors).every((error) => error === "") &&
      Object.values(formProfile).every((value) => value !== "");

    if (isFormValid) {
      handleEditProfile({ name: formProfile.name, email: formProfile.email });
      setErrorFront("");
      setErrorServer("");
    } else {
      setErrorFront("При обновлении профиля произошла ошибка");
    }
  };

  // Переключение кнопки редактировать
  const buttonToggleEdit = () => {
    setEditInputProfileActive(!editInputProfileActive);
    setErrorFront("");
    setErrorServer("");
  };

  // name И email сохраняются в полях
  useEffect(() => {
    setFormProfile({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  return (
    <section className="profile">
      <p className="profile__title">Привет, {currentUser.name}!</p>
      <form onSubmit={handleSubmit} className="profile__form" noValidate>
        <div className="profile__row">
          <label className="profile__subtitle">Имя</label>
          <input
            className="profile__input profile__input_line"
            type="text"
            id="name"
            placeholder="Введите Имя"
            value={formProfile.name}
            name="name"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            disabled={!editInputProfileActive || disabled}
          />
          <span className="profile__error-validate">{errors.name}</span>
        </div>
        <div className="profile__row">
          <label className="profile__subtitle">E-mail</label>
          <input
            className="profile__input"
            type="email"
            id="email"
            placeholder="Введите Email"
            value={formProfile.email}
            name="email"
            onChange={handleChange}
            disabled={!editInputProfileActive || disabled}
          />
          <span className="profile__error-validate">{errors.email}</span>
        </div>
        <span className="profile__error-server">
          {errorFront || errorServer}
        </span>
        {editInputProfileActive && (
          <button
            className={`profile__button ${
              (!isProfileChange || disabled) && "profile__button_disabled"
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={!isProfileChange || disabled}
          >
            Сохранить
          </button>
        )}
      </form>
      {!editInputProfileActive && (
        <button onClick={buttonToggleEdit} className="profile__button">
          Редактировать
        </button>
      )}
      <button
        onClick={onSignOut}
        className="profile__button-singout"
        type="submit"
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
