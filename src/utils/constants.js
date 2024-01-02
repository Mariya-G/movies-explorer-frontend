export const Movie_URL = "https://api.nomoreparties.co/";

export const filterShotMovies = (movies) => {
  return movies.filter((movie) => movie.duration <= 40);
};

export const filterAllMovies = (isSearch, movies) => {
  return movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(isSearch.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(isSearch.toLowerCase())
  );
};
