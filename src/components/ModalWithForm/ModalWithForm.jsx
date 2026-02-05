import closeIcon from "../../assets/close.svg";
import "./ModalWIthForm.css";
function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
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
        <h2 className="modal__title">{titleText}</h2>
        <form className="modal__form"> {children}</form>

        <button className="modal__submit" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
export default ModalWithForm;
