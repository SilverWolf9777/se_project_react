import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useValidation } from "../../hooks/useValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const validators = {
  name: (value) => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    if (value.length > 30) return "Name must be 30 characters or fewer";
    return "";
  },
  avatar: (value) => {
    if (!value) return "Avatar URL is required";
    try {
      new URL(value);
    } catch {
      return "Please enter a valid URL";
    }
    return "";
  },
};

const EditProfileModal = ({
  activeModal,
  onUpdateProfile,
  closeActiveModal,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };

  const {
    values,
    setValues,
    errors,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
  } = useValidation(defaultValues, validators);

  useEffect(() => {
    if (activeModal === "edit-profile") {
      setValues(defaultValues);
      resetForm(defaultValues);
    }
  }, [activeModal, currentUser?.name, currentUser?.avatar]);

  const onFormSubmit = (event) => {
    const valid = handleSubmit(event);
    if (!valid) return;

    onUpdateProfile(values).then(() => {
      resetForm(defaultValues);
      closeActiveModal();
    });
  };

  return (
    <ModalWithForm
      titleText="Edit profile"
      buttonText="Save"
      isOpened={activeModal === "edit-profile"}
      handleCloseClick={closeActiveModal}
      onSubmit={onFormSubmit}
    >
      <label htmlFor="editProfile-name" className="modal__label">
        Name{" "}
        <input
          id="editProfile-name"
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
      <label htmlFor="editProfile-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          id="editProfile-avatar"
          name="avatar"
          type="text"
          className={`modal__input ${isSubmitted && errors.avatar ? "modal__input_invalid" : ""}`}
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
        {isSubmitted && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
