import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({ activeModal, onAddItem, closeActiveModal }) => {
  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      isOpened={activeModal === "add-garment"}
      handleCloseClick={closeActiveModal}
      onSubmit={onAddItem}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          id="name"
          type="text"
          className="modal__input"
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          id="imageUrl"
          type="url"
          className="modal__input"
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="modal__radio-button"
            className=" modal__input modal__input_type_radio"
            type="radio"
            value="hot"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="modal__radio-button"
            className=" modal__input modal__input_type_radio"
            type="radio"
            value="warm"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="modal__radio-button"
            className=" modal__input modal__input_type_radio"
            type="radio"
            value="cold"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
