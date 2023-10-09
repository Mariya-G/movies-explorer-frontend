import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import Navigation from '../navigation/Navigation';
import ProfileNav from '../profile-nav/ProfileNav';
import BurgerMenu from '../burger-menu/BurgerMenu';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleBurgerMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleBurgerMenuClose() {
    setIsMenuOpen(false);
  }

  return(
    <header className="header">
        <Link to="/" className="header__link">
          <img src={logo} className="header__logo" alt="logo" />
        </Link>
        <div className="header__navigation">
          <Navigation/>
          </div>
        <div className="header__profile"><ProfileNav/></div>
      {/* <section className="header__sign">
        <Link className="header__signup" to="/signup">Регистрация</Link>
        <Link className="header__signin" to="/signin">
          <button type="submit" className="header__signin-button">Войти</button>
        </Link>
      </section> */}
      <button className="header__burger-button" onClick={handleBurgerMenuOpen}/>
      <BurgerMenu isMenuOpen={isMenuOpen} handleBurgerMenuClose={handleBurgerMenuClose}/>
    </header>
  );
}

export default Header;