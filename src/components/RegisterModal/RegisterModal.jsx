import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useValidation } from "../../hooks/useValidation";

// custom rules for the register form
const validators = {
  name: (value) => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    if (value.length > 30) return "Name must be 30 characters or fewer";
    return "";
  },
  email: (value) => {
    if (!value) return "Email is required";
    if (value.length < 3) return "Email must be at least 3 characters";
    if (value.length > 30) return "Email must be 30 characters or fewer";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Please enter a valid email address";
    return "";
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 3) return "Password must be at least 3 characters";
    if (value.length > 20) return "Password must be 20 characters or fewer";
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

const RegisterModal = ({ activeModal, onRegister, closeActiveModal, onSwitchModal }) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
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

    onRegister(values).then(() => {
      resetForm(defaultValues);
      closeActiveModal();
    });
  }
  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText="next"
      isOpened={activeModal === "register"}
      handleCloseClick={closeActiveModal}
      onSubmit={onFormSubmit}
      secondaryAction={
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onSwitchModal}
        >
          or Login
        </button>
      }
    >
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          id="register-email"
          name="email"
          type="email"
          className={`modal__input ${isSubmitted && errors.email ? "modal__input_invalid" : ""}`}
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {isSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          id="register-password"
          name="password"
          type="password"
          className={`modal__input ${isSubmitted && errors.password ? "modal__input_invalid" : ""}`}
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {isSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          id="register-name"
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
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          id="register-avatar"
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
export default RegisterModal;
