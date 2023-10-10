import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__project">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <article className="footer__column">
        <p className="footer__copyright">&copy; 2020</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru"
            target="_blank" className="footer__link"
            rel="noreferrer">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/Mariya-G"
          target="_blank" className="footer__link"
          rel="noreferrer">
            Github
          </a>
          </div>
      </article>
    </footer>
  );
}

export default Footer;