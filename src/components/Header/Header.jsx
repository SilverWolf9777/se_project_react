import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import logo from "../../assets/header__logo.svg";
import closeIcon from "../../assets/close.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isOpened,
  handleCloseClick,
  handleModalClick,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 627);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 627);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="header ui-text-1">
      <div className="header__row">
        <NavLink to="/">
          {" "}
          <img className="header__logo" src={logo} alt="header logo WTWR" />
        </NavLink>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city || "Loading city"}
        </p>
        <ToggleSwitch />
        <div className="header__auth-actions">
          {!isLoggedIn ? (
            <>
              <button
                type="button"
                className="header__add-clothes-btn ui-text-1"
                onClick={onRegisterClick}
              >
                Sign up
              </button>
              <button
                type="button"
                className="header__add-clothes-btn ui-text-1"
                onClick={onLoginClick}
              >
                Login
              </button>
            </>
          ) : (
            <div className="header__user-info">
              <>
                {" "}
                <button
                  type="button"
                  onClick={handleAddClick}
                  className="header__add-clothes-btn ui-text-1"
                >
                  + Add clothes
                </button>
                <NavLink className="header__nav-link" to="/profile">
                  {" "}
                  <div className="modal__row modal__no_margin">
                    <p className="header__username">
                      {currentUser?.name || (isLoggedIn ? "Profile" : "Guest")}
                    </p>
                    {currentUser?.avatar ? (
                      <img
                        className="header__avatar"
                        src={currentUser.avatar}
                        alt={currentUser?.name || "User"}
                      />
                    ) : (
                      <div className="header__avatar-placeholder">
                        {currentUser?.name?.charAt(0).toUpperCase() || "G"}
                      </div>
                    )}
                  </div>
                </NavLink>
              </>
            </div>
          )}
        </div>
      </div>

      <div
        className={`header__user-container ${isSmallScreen ? "modal" : ""} ${isOpened && isSmallScreen ? "header__user-container-open" : ""}`}
      >
        <button
          className="modal__close header__hide "
          type="button"
          onClick={handleCloseClick}
        >
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>

        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn ui-text-1 display"
        >
          + Add clothes
        </button>
      </div>
    </header>
  );
}
export default Header;
