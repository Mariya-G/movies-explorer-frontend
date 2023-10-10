import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../movies-card-list/MoviesCardList'
import SearchForm from '../search-form/SearchForm';

function SavedMovies(){
  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList/>
  </section>
  );
}

export default SavedMovies;
