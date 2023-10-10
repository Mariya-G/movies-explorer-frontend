import React from "react";
import './AboutMe.css';
import photo from '../../../images/photo.png';

function AboutMe() {
  return (
    <section id="student" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <article className="about-me__two-colums">
        <div className="about-me__content">
          <p className="about-me__name">Виталий</p>
          <p className="about-me__prof">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
          С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, 
          начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about-me__link" alt="GitHub" href="https://github.com/Mariya-G">GitHub</a>
        </div>
        <img src={photo} alt="Фото студента" className="about-me__photo"/>
      </article>
    </section>
  );
}

export default AboutMe;