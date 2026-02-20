import avatar from "../../assets/header__avatar.svg";
import "./SideBar.css";
export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}
