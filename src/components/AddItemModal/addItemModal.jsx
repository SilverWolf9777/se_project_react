import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useValidation } from "../../hooks/useValidation";

// custom rules for the add‑item form
const validators = {
  name: (v) => {
    if (!v) return "Name is required";
    if (v.length < 1) return "Name must be at least 1 character";
    if (v.length > 30) return "Name must be 30 characters or fewer";
    return "";
  },
  imageUrl: (v) => {
    if (!v) return "Image URL is required";
    // simple URL check
    try {
      new URL(v);
    } catch {
      return "Please enter a valid URL";
    }
    return "";
  },
  weather: (v) => {
    if (!v) return "Please select a weather type";
    return "";
  },
};

const AddItemModal = ({ activeModal, onAddItem, closeActiveModal }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const {
    values,
    handleChange,
    errors,
    isValid,
    isSubmitted,
    handleSubmit,
    resetForm,
  } = useValidation(defaultValues, validators);

  function onFormSubmit(event) {
    const valid = handleSubmit(event);
    if (!valid) return; // errors will display once submission attempted

    onAddItem(values).then(() => {
      resetForm(defaultValues);
      closeActiveModal();
    });
  }
  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      isOpened={activeModal === "add-garment"}
      handleCloseClick={closeActiveModal}
      onSubmit={onFormSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          id="name"
          name="name"
          type="text"
          className={`modal__input ${isSubmitted && errors.name ? "modal__input_invalid" : ""}`}
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {isSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          className={`modal__input ${isSubmitted && errors.imageUrl ? "modal__input_invalid" : ""}`}
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        {isSubmitted && errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset
        className={`modal__radio-buttons ${isSubmitted && errors.weather ? "modal__radio-buttons_invalid" : ""}`}
      >
        <legend className="modal__legend">Select the weather type:</legend>
        {isSubmitted && errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            className=" modal__input modal__input_type_radio"
            type="radio"
            value="hot"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            className=" modal__input modal__input_type_radio"
            type="radio"
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            className=" modal__input modal__input_type_radio"
            type="radio"
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
