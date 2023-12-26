import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoreMovies from "../movies/more-movies/MoreMovies";
import MoviesCard from "../movies-card/MoviesCard";

function MoviesCardList({
  movies,
  isAllMoviesDisplayed,
  loadMore,
  saveMovies,
  disabled,
  handleSaveMovies,  
  handleDeleteMovie,
}) {
  const location = useLocation();
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {location.pathname === "/movies"
          ? movies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                saveMovies={saveMovies}
                handleSaveMovies={handleSaveMovies}
                disabled={disabled}
                handleDeleteMovie={handleDeleteMovie}
              />
            ))
          : saveMovies.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                saveMovies={saveMovies}
                handleSaveMovies={handleSaveMovies}
                disabled={disabled}
                handleDeleteMovie={handleDeleteMovie}
              />
            ))}
      </div>
      {location.pathname === "/movies"
        ? !isAllMoviesDisplayed && <MoreMovies loadMore={loadMore} />
        : ""}
    </section>
  );
}

export default MoviesCardList;
