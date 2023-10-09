import React from "react";
import './AboutProject.css';

function AboutProject() {
  return(
    <section id="about-project" className="about-project">
      <h2 className="main__title about-project__title">О проекте</h2>
      <div className="main__line about-project__line"></div>
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
      <article className="line-steps">
        <p className="line-steps_green">1 неделя</p>
        <p className="line-steps_grey">4 недели</p>
        <p className="line-steps_article">Back-end</p>
        <p className="line-steps_article">Front-end</p>
      </article>
    </section>
  );
}

export default AboutProject;