import React from "react";
import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="techs">
      <article className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__line"></div>
        <article className="techs__article">
          <p className="techs__heading">7 технологий</p>
          <p className="techs__paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
          <ul className="techs__items">
            <li className="techs__item">HTML</li>
            <li className="techs__item">CSS</li>
            <li className="techs__item">JS</li>
            <li className="techs__item">React</li>
            <li className="techs__item">Git</li>
            <li className="techs__item">Express.Js</li>
            <li className="techs__item">mongoDB</li>
          </ul>
        </article>
      </article>
    </section>
  );
}

export default Techs;