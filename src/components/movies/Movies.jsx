import React from 'react';
import './Movies.css';
import MoviesCardList from '../movies-card-list/MoviesCardList'
import SearchForm from '../search-form/SearchForm';
import MoreMovies from './more-movies/MoreMovies';

function Movies(){
  return(
    <section className="movies">
      <SearchForm/>
      <MoviesCardList/>
      <MoreMovies/>
    </section>
      
  );
}

export default Movies;
