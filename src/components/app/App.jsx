import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Main from "../main/Main";
import Movies from "../movies/Movies";
import SavedMovies from "../saved-movies/SavedMovies";
import Profile from "../profile/Profile";
import PageNotFound from "../page-not-found/PageNotFound";
import Login from "../login/Login";
import Register from "../register/Register";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { register, authorize, signOut } from "../../utils/auth";
import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import InfoTooltip from "../infoTooltip/InfoTooltip";
import { Movie_URL } from "../../utils/constants";

function App() {
  const location = useLocation();
  const [movies, setMovies] = React.useState([]); // стейт фильмов
  const [saveMovies, setSaveMovies] = React.useState([]); //  стейт сохраненных фильмов
  const [isSearch, setSearch] = React.useState(""); // значение в поисковой строке
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false); //модальное окно
  const [tooltip, setTooltip] = React.useState({ message: "" }); //сообщение в модальном окне
  const [currentUser, setCurrentUser] = React.useState({ email: "", name: "" });
  const [disabled, setDisabled] = React.useState(false); // неактивная кнопка
  const auth = localStorage.getItem("auth");
  const [loggedIn, setLoggedIn] = React.useState(auth); // пользователь залогинен
  const [editInputProfileActive, setEditInputProfileActive] =
    React.useState(false); // активация инпутов в профиле
  const [isInputProfileChanges, setInputProfileChanges] = React.useState(false); //были ли изменения в профиле пользователя
  const [preloader, setPreloader] = React.useState(false); //прелоадер
  const [errorServer, setErrorServer] = React.useState(""); // сообщение об ошибке сервера
  const [errorFront, setErrorFront] = React.useState(""); // сообщение об ошибке на стороне пользователя
  const navigate = useNavigate();

  // Получение всех фильмов с сервера
  React.useEffect(() => {
    if (isSearch && movies.length === 0) {
      setPreloader(true);
      moviesApi
        .getMoviesAll()
        .then((movies) => {
          setMovies(movies);
        })
        .catch((error) => {
          if (error === 401) {
            setCurrentUser(null);
            setLoggedIn(false);
            localStorage.clear();
            return;
          }
          setInfoTooltipOpen(true);
          setErrorServer(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          setTooltip({ message: `${errorServer}` });
          console.log(`Ошибка: ${error}`);
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }, [isSearch, movies]);

  // Получение пользователя и сохраненные фильмы
  React.useEffect(() => {
    loggedIn &&
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, saveMovies]) => {
          setCurrentUser(user);
          setSaveMovies(saveMovies);
          setLoggedIn(true);
        })
        .catch((error) => {
          if (error === 401) {
            setLoggedIn(false);
            setCurrentUser(null);
            localStorage.clear();
            return;
          }
          console.log(`Ошибка: ${error}`);
        });
  }, [loggedIn]);

  //Регистрация
  const isRegisterUser = ({ name, email, password }) => {
    setDisabled(true);
    register({ name, email, password })
      .then(() => {
        return authorize({ email, password });
      })
      .then((data) => {
        setInfoTooltipOpen(true);
        setTooltip({ message: "Вы успешно зарегистрировались!" });
        localStorage.setItem("auth", true);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setCurrentUser(data);
      })
      .catch((error) => {
        if (error === 409) {
          setErrorServer("Пользователь с таким email уже существует");
        } else if (error === 400) {
          setErrorServer("При регистрации пользователя произошла ошибка");
        } else {
          setErrorServer("На сервере произошла ошибка");
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  //Авторизация
  const handleLogin = ({ email, password }) => {
    setDisabled(true);
    authorize({ email, password })
      .then((data) => {
        setInfoTooltipOpen(true);
        setTooltip({ message: `Добро пожаловать, ${currentUser.name}!` });
        localStorage.setItem("auth", true);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setCurrentUser(data);
      })
      .catch((error) => {
        if (error === 400) {
          setErrorServer("При авторизации произошла ошибка");
        } else if (error === 401) {
          setErrorServer("Вы ввели неправильный логин или пароль");
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  // Выход
  const handleSignOut = () => {
    signOut()
      .then((data) => {
        setLoggedIn(false);
        setMovies([]);
        setSearch("");
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  // Редактирование пользователя
  const handleEditProfile = (newData) => {
    setDisabled(true);
    mainApi
      .editUserInfo(newData)
      .then((data) => {
        setCurrentUser(data.data);
        setInputProfileChanges(false);
        setEditInputProfileActive(!editInputProfileActive);
        setInfoTooltipOpen(true);
        setTooltip({ message: "Изменения сохранены!" });
      })
      .catch((error) => {
        if (error === 409) {
          setErrorServer("Пользователь с таким email уже существует");
        } else if (error === 400) {
          setErrorServer("Переданы некорректные данные при обновлении профиля");
        } else {
          setErrorServer("На сервере произошла ошибка");
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  //Добавление фильма в избранное
  function handleSaveMovies(movie) {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${Movie_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${Movie_URL}${movie.image.url}`,
      movieId: movie.id,
    };
    setDisabled(true);
    mainApi
      .saveMovies(movieData)
      .then((saveMovies) => {
        setSaveMovies((prev) => [...prev, saveMovies]);
      })
      .catch((error) => {
        if (error === 401) {
          setCurrentUser(null);
          setLoggedIn(false);
          localStorage.clear();
          return;
        }
        setInfoTooltipOpen(true);
        setErrorServer("Ошибка при сохранении фильма");
        setTooltip({ message: `${errorServer}` });
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  // Удаление фильма из избранного
  function handleDeleteMovie(movie) {
    const movieId = saveMovies.find(
      (saveMovie) => saveMovie.movieId === movie.id
    );
    setDisabled(true);

    mainApi
      .deleteMovie(movie._id || movieId._id)
      .then((res) => {
        setSaveMovies((presSavedMovies) =>
          presSavedMovies.filter((saveMovie) => saveMovie._id !== res._id)
        );
      })
      .catch((error) => {
        if (error === 401) {
          setCurrentUser(null);
          setLoggedIn(false);
          localStorage.clear();
          return;
        }
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  // Сброс ошибок
  React.useEffect(() => {
    setErrorServer("");
    setErrorFront("");
    setEditInputProfileActive(false);
  }, [location]);

  // Закрытие попап сообщения
  const closeAllPopups = () => {
    setInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="pages">
        {["/", "/movies", "/saved-movies", "/profile"].includes(
          location.pathname
        ) && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Movies}
                movies={movies}
                preloader={preloader}
                errorServer={errorServer}
                setErrorServer={setErrorServer}
                isSearch={isSearch}
                setSearch={setSearch}
                disabled={disabled}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                handleSaveMovies={handleSaveMovies}
                handleDeleteMovie={handleDeleteMovie}
                errorFront={errorFront}
                setErrorFront={setErrorFront}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={SavedMovies}
                setSaveMovies={setSaveMovies}
                saveMovies={saveMovies}
                handleSaveMovies={handleSaveMovies}
                isSearch={isSearch}
                setSearch={setSearch}
                disabled={disabled}
                handleDeleteMovie={handleDeleteMovie}
                errorFront={errorFront}
                setErrorFront={setErrorFront}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Profile}
                handleEditProfile={handleEditProfile}
                onSignOut={handleSignOut}
                editInputProfileActive={editInputProfileActive}
                setEditInputProfileActive={setEditInputProfileActive}
                setInputProfileChanges={setInputProfileChanges}
                isInputProfileChanges={isInputProfileChanges}
                disabled={disabled}
                setErrorServer={setErrorServer}
                errorServer={errorServer}
                errorFront={errorFront}
                setErrorFront={setErrorFront}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                setErrorServer={setErrorServer}
                errorServer={errorServer}
                disabled={disabled}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                isRegisterUser={isRegisterUser}
                setErrorServer={setErrorServer}
                errorServer={errorServer}
                disabled={disabled}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          tooltip={tooltip}
          errorServer={errorServer}
        />
        {["/", "/movies", "/saved-movies"].includes(location.pathname) && (
          <Footer />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
