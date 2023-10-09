import React from 'react';
import './Main.css';
import Promo from './promo/Promo';
import AboutProject from './about-project/AboutProject';
import Techs from './techs/Techs';
import AboutMe from './about-me/AboutMe';
import Portfolio from './portfolio/Portfolio';

function Main(){
  return(
    <main className="main__container">
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </main>
  );
}

export default Main;
