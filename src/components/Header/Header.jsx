import logo from "../../assets/header__logo.svg";
import avatar from "../../assets/header__avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header ui-text-1">
      <img className="header__logo" src={logo} alt="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn ui-text-1"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avater" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}
export default Header;
