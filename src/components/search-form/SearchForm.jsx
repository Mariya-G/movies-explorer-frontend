import React from "react";
import "./SearchForm.css";
import FilterChechbox from "./filter-checkbox/FilterChechbox";

function SearchForm({
  isSearch,
  setSearch,
  isMoviesCheckbox,
  setIsMoviesCheckbox,
  errorFront,
  setErrorFront,
}) {
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    setErrorFront("");
  };

  function handleCheckbox() {
    setIsMoviesCheckbox(!isMoviesCheckbox);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSearch) {
      setErrorFront("Нужно ввести ключевое слово");
      localStorage.removeItem("isSearch");
      localStorage.removeItem("moviesSearch");
    } else {
      setErrorFront("");
    }
  };

  return (
    <form
      className="search-form"
      id="search-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="search-form__row">
        <input
          name="search"
          className="search-form__input"
          placeholder="Фильмы"
          type="search"
          value={isSearch}
          required
          maxLength="50"
          onChange={handleChange}
        />
        <button
          className="search-form__button"
          type="submit"
          onClick={handleSubmit}
        />
        {errorFront && <span className="search-form__error">{errorFront}</span>}
      </div>

      <FilterChechbox
        handleCheckbox={handleCheckbox}
        isMoviesCheckbox={isMoviesCheckbox}
      />
    </form>
  );
}

export default SearchForm;
