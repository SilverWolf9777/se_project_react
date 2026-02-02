import "./Header.css";
import logo from "../../assets/header__logo.svg";
import avatar from "../../assets/header__avatar.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="header__logo" />
      <p className="header__date-and-location">Date, Location</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avater" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}
export default Header;
