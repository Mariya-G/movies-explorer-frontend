import React from "react";
import './Portfolio.css';
import arrow from '../../../images/arrow-link.svg';
function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <article className="portfolio__links">
        <a 
          alt="Научиться учиться"
          className="portfolio__name"
          target="_blank"
          href="https://github.com/Mariya-G/how-to-learn" rel="noreferrer">
            Статичный сайт
        </a>
        <a
          alt="Научиться учиться"
          className="portfolio__link"
          target="_blank"
          href="https://github.com/Mariya-G/how-to-learn" rel="noreferrer">
            <img alt="ссылка" className="portfolio__link-image" src={arrow}/>
        </a>
      </article>
      <article className="portfolio__links">
        <a 
          alt="Путешествия по России"
          className="portfolio__name"
          target="_blank"
          href="https://github.com/Mariya-G/russian-travel" rel="noreferrer">
            Адаптивный сайт
        </a>
        <a 
          alt="Путешествия по России"
          target="_blank"
          className="portfolio__link"
          href="https://github.com/Mariya-G/russian-travel" rel="noreferrer">
            <img alt="ссылка" className="portfolio__link-image" src={arrow}/>
        </a>
      </article>
      <article className="portfolio__links">
        <a 
        alt="Место"
        target="_blank"
        href="https://github.com/Mariya-G/react-mesto-api-full-gha"
        className="portfolio__name" rel="noreferrer">
          Одностраничное приложение
        </a>
        <a
          alt="Место"
          className="portfolio__link"
          target="_blank"
          href="https://github.com/Mariya-G/react-mesto-api-full-gha" rel="noreferrer">
            <img alt="ссылка" className="portfolio__link-image" src={arrow}/>
        </a>
      </article>
    </section>
  );
}

export default Portfolio;