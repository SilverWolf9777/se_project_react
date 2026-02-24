import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpened,
  handleCloseClick,
  onSubmit,
  isDisabled = false,
}) {
  return (
    <div
      className={`modal ${isOpened ? "modal__opened " : ""} modal__responsive`}
    >
      <div className="modal__content modal__content_responsive">
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

        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            className="modal__submit ui-text-2"
            type="submit"
            disabled={isDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
