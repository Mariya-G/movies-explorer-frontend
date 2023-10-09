import React from "react";
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import Movies from '../movies/Movies';
import SavedMovies from '../saved-movies/SavedMovies';
import Profile from '../profile/Profile';
import PageNotFound from '../page-not-found/PageNotFound';
import Login from '../login/Login';
import Register from '../register/Register';
import './App.css';

function App() {
  return (
    <div className="pages">
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/saved-movies" element={<SavedMovies/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
