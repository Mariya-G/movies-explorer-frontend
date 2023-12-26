class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // Удаление фильма из списка сохраненных фильмов
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // Сохранение фильмов
  saveMovies(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        ...movie,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // Получение списка сохраненных фильмов
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // Редактирование информации о пользователе
  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ name: data.name, email: data.email }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.movie.mg.nomoredomainsrocks.ru",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "include",
});
