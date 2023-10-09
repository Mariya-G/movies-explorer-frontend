import React from "react";
import './MoviesCard.css';
import film from '../../images/film-words-designer.png'; 

function MoviesCard() {
  return (
    <article className="movie-card">
      <img name="name" className="movie-card__image" src={film} alt="33 слова о дизайне"/>
      <button className="movie-card__button-save"/>
        <div className="movie-card__wrap">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__times">1ч 17м</p>
        </div>
    </article>
  );
}

export default MoviesCard;