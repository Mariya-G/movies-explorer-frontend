import React from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(props){
  return(
    <nav className="navigation">
      <NavLink
       onClick={props.handleBurgerMenuClose}
        to="/" 
        className={({isActive}) => `navigation__link navigation__link_hidden ${isActive ? "navigation__link_active" : ""}`}>
        Главная
      </NavLink>
      <NavLink
       onClick={props.handleBurgerMenuClose}
        to="/movies" 
        className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>
        Фильмы
      </NavLink>
      <NavLink 
        onClick={props.handleBurgerMenuClose}
        to="/saved-movies"
        className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>
        Сохраненные фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;