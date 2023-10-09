import React from "react";
import './SearchForm.css';
import FilterChechbox from './filter-checkbox/FilterChechbox';

function SearchForm() {
  return (
    <form  action="" method="get" className="search__form">
      <div className="search__form_row">
        <input name="search" className="search__input" placeholder="Фильмы" type="search"/>
        <button className="search__button" type="submit"/>
      </div>
      <FilterChechbox/>
    </form>
  );
}

export default SearchForm;