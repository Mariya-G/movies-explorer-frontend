import React from "react";
import './FilterChechbox.css';

function FilterChechbox() {
  return (
    <div className="checkbox">
      <input type="checkbox" id="checkbox"/>
      <label className="checkbox__text" htmlFor="filter-checkbox">Короткометражки</label>
    </div>
    
  );
}

export default FilterChechbox;