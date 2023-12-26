import React from "react";
import { Link } from 'react-router-dom';
import './Profile-Nav.css';

function ProfileNav(props) {
  return(
    <Link to="/profile" onClick={props.handleBurgerMenuClose} className="profile-nav">Аккаунт</Link>
  )
}

export default ProfileNav;