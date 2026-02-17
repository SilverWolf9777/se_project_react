import { useState, useEffect } from "react";

import logo from "../../assets/header__logo.svg";
import avatar from "../../assets/header__avatar.svg";
import header__modal_btn_img from "../../assets/header__modal_btn.svg";
import closeIcon from "../../assets/close.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
("../ToggleSwitch/ToggleSwitch");

function Header({
  handleAddClick,
  weatherData,
  isOpened,
  handleCloseClick,
  handleModalClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 627);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 627);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="header ui-text-1">
      <div className="header__row">
        <img className="header__logo" src={logo} alt="header logo WTWR" />
        <button
          className="header__modal_btn"
          type="button"
          onClick={handleModalClick}
        >
          <img
            src={header__modal_btn_img}
            alt="header__modal_btn_img"
            className="header__modal_btn_img"
          />
        </button>
      </div>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn ui-text-1"
      >
        + Add clothes
      </button>
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
        <div className="modal__row">
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avater" src={avatar} alt="Terrence Tegegne" />
        </div>
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
