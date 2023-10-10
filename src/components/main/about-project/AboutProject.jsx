import React from "react";
import './AboutProject.css';

function AboutProject() {
  return(
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__line"></div>
      <article className="about-project__item">
        <div className="about-project__column">
          <p className="about-project__heading">Дипломный проект включал 5 этапов</p>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <p className="about-project__heading">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
          </div>
      </article>
      <article className="about-project__steps">
        <p className="about-project__steps-green">1 неделя</p>
        <p className="about-project__steps-gray">4 недели</p>
        <p className="about-project__article">Back-end</p>
        <p className="about-project__article">Front-end</p>
      </article>
    </section>
  );
}

export default AboutProject;