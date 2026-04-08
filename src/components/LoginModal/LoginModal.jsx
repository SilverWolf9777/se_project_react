import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useValidation } from "../../hooks/useValidation";

// custom rules for the add‑item form
const validators = {
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 1) return "Name must be at least 1 character";
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
};

const LoginModal = ({ activeModal, onLogin, closeActiveModal, loginError, onSwitchModal }) => {
  const defaultValues = {
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

    onLogin(values).then(() => {
      resetForm(defaultValues);
      closeActiveModal();
    });
  }
  return (
    <ModalWithForm
      titleText="Login"
      buttonText="Login"
      isOpened={activeModal === "login"}
      handleCloseClick={closeActiveModal}
      onSubmit={onFormSubmit}
      secondaryAction={
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onSwitchModal}
        >
          or Sign Up
        </button>
      }
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          id="login-email"
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
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          id="login-password"
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
      {loginError && <span className="modal__error">{loginError}</span>}
    </ModalWithForm>
  );
};
export default LoginModal;
