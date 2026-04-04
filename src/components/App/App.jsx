import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signUp, signIn, checkToken, editProfile } from "../../utils/auth";

import {
  coordinates as defaultCoordinates,
  apiKey,
} from "../../utils/constants"; // default coords used as fallback if geolocation fails
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/addItemModal";
import Profile from "../Profile/Profile";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold", // keep cold so initial clothing list renders
    temp: { F: "Loading...", C: "Loading..." },
    city: "Loading city",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loginError, setLoginError] = useState("");

  const onAddItem = (inputValues) => {
    if (!token) return Promise.reject("Missing authorization token");
    return addItem(inputValues, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("add-garment");
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const tokenFromStorage = localStorage.getItem("jwt");
    if (!tokenFromStorage) return;

    const request = !isLiked
      ? addCardLike(id, tokenFromStorage)
      : removeCardLike(id, tokenFromStorage);

    request
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.log(err));
  };

  const handleOpenHeaderModal = () => {
    setActiveModal("header");
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setLoginError("");
  };

  const handleAuthSuccess = (authData) => {
    if (!authData || !authData.token) {
      return Promise.reject("Authorization failed");
    }

    localStorage.setItem("jwt", authData.token);
    setToken(authData.token);
    setIsLoggedIn(true);

    return checkToken(authData.token).then((userData) => {
      setCurrentUser(userData);
      return userData;
    });
  };

  const onRegister = ({ name, avatar, email, password }) => {
    return signUp({ name, avatar, email, password })
      .then(() => signIn({ email, password }))
      .then(handleAuthSuccess)
      .catch((err) => {
        console.error("Registration failed", err);
        throw err;
      });
  };

  const onLogin = ({ email, password }) => {
    return signIn({ email, password })
      .then((authData) => {
        setLoginError("");
        return handleAuthSuccess(authData);
      })
      .catch((err) => {
        console.error("Login failed", err);
        setLoginError("Invalid email or password");
        throw err;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const onUpdateProfile = ({ name, avatar }) => {
    if (!token) return Promise.reject("Missing authorization token");
    return editProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      })
      .catch((err) => {
        console.error("Profile update failed", err);
        throw err;
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    checkToken(jwt)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setToken(jwt);
      })
      .catch((err) => {
        console.error("Token validation failed", err);
        localStorage.removeItem("jwt");
        setToken(null);
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  const handleDeleteItem = (card) => {
    if (!token) {
      console.error("Missing authorization token");
      return;
    }

    removeItem(card._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };
  useEffect(() => {
    // helper to fetch weather and update state
    const fetchWeather = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch((err) => {
          console.error("Error fetching weather", err);
          // on failure, display an explicit error instead of staying in "Loading..."
          setWeatherData({
            type: "cold",
            temp: { F: "--", C: "--" },
            city: "Unavailable",
          });
        });
    };

    // try to get browser location; fall back to default coords
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const positionCoords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          fetchWeather(positionCoords);
        },
        (err) => {
          console.error("Geolocation error:", err);
          fetchWeather(defaultCoordinates);
        },
      );
    } else {
      // geolocation not available
      fetchWeather(defaultCoordinates);
    }

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isOpened={activeModal === "header"}
              handleCloseClick={closeActiveModal}
              handleModalClick={handleOpenHeaderModal}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              onLogoutClick={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            onAddItem={onAddItem}
          ></AddItemModal>
          <ItemModal
            isOpen={activeModal === "preview"}
            handleCloseClick={closeActiveModal}
            card={selectedCard}
            deleteItem={handleDeleteItem}
          />
          <LoginModal
            activeModal={activeModal}
            onLogin={onLogin}
            closeActiveModal={closeActiveModal}
            loginError={loginError}
          />
          <RegisterModal
            activeModal={activeModal}
            onRegister={onRegister}
            closeActiveModal={closeActiveModal}
          />
          <EditProfileModal
            activeModal={activeModal}
            onUpdateProfile={onUpdateProfile}
            closeActiveModal={closeActiveModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
