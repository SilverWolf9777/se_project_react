import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";
export default function SideBar({ handleEditProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const hasAvatar = !!currentUser?.avatar;
  const placeholderText = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "U";

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        {hasAvatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{placeholderText}</div>
        )}
        <p className="sidebar__username ">{currentUser?.name || "User"}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-button sidebar__btn ui-text-1"
        onClick={handleEditProfileClick}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__logout sidebar__btn ui-text-1"
        onClick={handleLogout}
      >
        Log out
      </button>
    </aside>
  );
}
