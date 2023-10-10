import React from "react";
import './SearchForm.css';
import FilterChechbox from './filter-checkbox/FilterChechbox';

function SearchForm() {
  return (
    <form  action="" method="get" className="search-form">
      <div className="search-form__row">
        <input name="search" className="search-form__input" placeholder="Фильмы" type="search"/>
        <button className="search-form__button" type="submit"/>
      </div>
      <FilterChechbox/>
    </form>
  );
}

export default SearchForm;