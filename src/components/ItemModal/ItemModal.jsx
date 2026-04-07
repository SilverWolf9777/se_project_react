import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./ItemModal.css";
import closeIcon from "../../assets/close__white.svg";
function ItemModal({ isOpen, handleCloseClick, card, deleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content_type_card">
        <button
          className="modal__close"
          type="button"
          onClick={handleCloseClick}
        >
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>
        <img
          src={card.imageUrl}
          alt={`Image of ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer ">
          <div className="modal__row">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                className="modal__delete-button"
                type="button"
                onClick={() => deleteItem(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__caption_weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
