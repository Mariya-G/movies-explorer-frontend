import React from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(props){
  const setActiveMain = ({isActive}) => `navigation__link navigation__link_hidden ${isActive ? "navigation__link_active" : ""}`;
  const setActiveMovie = ({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`;
  return(
    <nav className="navigation">
      <NavLink
       onClick={props.handleBurgerMenuClose}
        to="/" 
        className={setActiveMain}>
        Главная
      </NavLink>
      <NavLink
       onClick={props.handleBurgerMenuClose}
        to="/movies" 
        className={setActiveMovie}>
        Фильмы
      </NavLink>
      <NavLink 
        onClick={props.handleBurgerMenuClose}
        to="/saved-movies"
        className={setActiveMovie}>
        Сохраненные фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;