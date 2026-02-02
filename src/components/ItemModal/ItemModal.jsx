import closeIcon from "../../assets/close.svg";
function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <>
      <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
        <div className="modal__content">
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
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ItemModal;
