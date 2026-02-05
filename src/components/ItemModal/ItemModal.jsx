import "./ItemModal.css";
import closeIcon from "../../assets/close__white.svg";
function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <>
      <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
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
          <img src={card.link} alt="" className="modal__image" />
          <div className="modal__footer ">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__caption_weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ItemModal;
