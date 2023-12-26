import React from "react";
import "./Movies.css";
import MoviesCardList from "../movies-card-list/MoviesCardList";
import SearchForm from "../search-form/SearchForm";
import Preloader from "../preloader/Preloader";
import { filterShotMovies, filterAllMovies } from "../../utils/constants";

const Movies = ({
  movies,
  saveMovies,
  preloader,
  errorServer,
  isSearch,
  setSearch,
  disabled,
  handleDeleteMovie,
  handleSaveMovies,
  errorFront,
  setErrorFront,
}) => {
  const [movieDisplay, setMovieDisplay] = React.useState([]); //Отображамые фильмы на странице
  const [errorMovies, setErrorMovies] = React.useState(""); //результат поиска
  const [isMoviesCheckbox, setIsMoviesCheckbox] = React.useState(
    () => JSON.parse(localStorage.getItem("isShortMovies")) || false
  ); // чекбокс
  const [showShortMovies, setShowShortMovies] = React.useState([]); // стейт короткометражек
  const [moviesLine, setMoviesLine] = React.useState(0); //  фильмы в ряд
  const [showMovies, setShowMovies] = React.useState(0); // первоначальный показ карточек фильмов

  // данные в строке поиска полученные из localstorage
  const savedIsSearch = JSON.parse(localStorage.getItem("isSearch"));

  //найденные фильмы полученные из localstorage
  const savedMoviesSearch = JSON.parse(localStorage.getItem("moviesSearch"));

  // полученные фильмы по поиску
  const [moviesSearch, setMoviesSearch] = React.useState(
    savedMoviesSearch ? savedMoviesSearch : []
  );

  // Отображение всех фильмов
  const isAllMoviesDisplayed =
    moviesSearch.length === movieDisplay.length ||
    showShortMovies.length === movieDisplay.length;

  // поиск по фильмам
  React.useEffect(() => {
    if (movies.length > 0) {
      const newFilterMovies = filterAllMovies(isSearch, movies);
      if (newFilterMovies.length > 0) {
        setMoviesSearch(newFilterMovies);
      } else if (isSearch && newFilterMovies.length === 0) {
        setMoviesSearch([]);
        setErrorMovies("Ничего не найдено");
      }
    }
  }, [isSearch, movies]);

  // отслеживание изменений чекбокса и сохранение в localStorage
  React.useEffect(() => {
    localStorage.setItem("isShortMovies", JSON.stringify(isMoviesCheckbox));
  }, [isMoviesCheckbox]);

  // Отслеживание изменений в строке поиска и найденных фильмов, сохранение в localStorage
  React.useEffect(() => {
    localStorage.setItem("moviesSearch", JSON.stringify(moviesSearch));
    localStorage.setItem("isSearch", JSON.stringify(isSearch));
  }, [moviesSearch, isSearch]);

  // Проверка наличия данных в localStorage
  React.useEffect(() => {
    if (savedMoviesSearch) {
      setSearch(savedIsSearch);
      setMoviesSearch(savedMoviesSearch);
    } else {
      return;
    }
  }, []);

  // Показ карточек при разном размере экрана
  const handleScreenSize = () => {
    setShowMovies(
      window.innerWidth >= 980 ? 12 :
      window.innerWidth >= 768 ? 9 :
      window.innerWidth <= 767 ? 8 :
      window.innerWidth >= 320 && window.innerWidth <= 480 ? 5 :
      0
    );
  
    setMoviesLine(
      window.innerWidth >= 980 || window.innerWidth >= 768 ? 3 :
      window.innerWidth <= 767 || (window.innerWidth >= 320 && window.innerWidth <= 480) ? 2 :
      0
    );
  };

  //кнопка "показать еще"
  const loadMore = () => {
    const firstLineFilms = movieDisplay.length;
    const lastLineFilms = firstLineFilms + moviesLine;

    let moreMovies = [];

    if (isSearch && moviesSearch.length > 0) {
      moreMovies = moviesSearch.slice(firstLineFilms, lastLineFilms);
    } else {
      moreMovies = movies.slice(firstLineFilms, lastLineFilms);
    }
    setMovieDisplay([...movieDisplay, ...moreMovies]);
  };

  
  let resizeTimer;

  React.useEffect(() => {
    // Обработка изменений размера окна
    const handleScreenSizeWithTimeout = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {handleScreenSize()}, 800);
    };

    handleScreenSizeWithTimeout();
    if (isMoviesCheckbox) {
      // Фильтр короткометражек
      const filteredShortFilms = filterShotMovies(moviesSearch);
      setShowShortMovies(filteredShortFilms);
      setMovieDisplay(filteredShortFilms.slice(0, showMovies));
    } else {
      const displayedMoviesSlice =
        isSearch && moviesSearch.length > 0
          ? moviesSearch.slice(0, showMovies)
          : !isSearch
          ? movies.slice(0, showMovies)
          : [];
      setMovieDisplay(displayedMoviesSlice);
    }

    window.addEventListener("resize", handleScreenSizeWithTimeout);
    return () => {
      window.removeEventListener("resize", handleScreenSizeWithTimeout);
    };
  }, [showMovies, moviesSearch, movies, isSearch, isMoviesCheckbox]);

  return (
    <section className="movies">
      <SearchForm
        isSearch={isSearch}
        setSearch={setSearch}
        errorFront={errorFront}
        setErrorFront={setErrorFront}
        setIsMoviesCheckbox={setIsMoviesCheckbox}
        isMoviesCheckbox={isMoviesCheckbox}
      />
      {preloader ? (
        <Preloader />
      ) : movieDisplay.length === 0 && movies.length > 0 ? (
        <p className="movies__not-found">
          {errorServer ? errorServer : errorMovies}
        </p>
      ) : (
        movieDisplay.length > 0 && (
          <MoviesCardList
            movies={movieDisplay}
            isAllMoviesDisplayed={isAllMoviesDisplayed}
            loadMore={loadMore}
            disabled={disabled}
            handleSaveMovies={handleSaveMovies}
            handleDeleteMovie={handleDeleteMovie}
            saveMovies={saveMovies}
          />
        )
      )}
    </section>
  );
};

export default Movies;
