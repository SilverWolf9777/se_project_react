import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useValidation } from "../../hooks/useValidation";

// custom rules for the register form
const validators = {
  name: (v) => {
    if (!v) return "Name is required";
    if (v.length < 2) return "Name must be at least 2 characters";
    if (v.length > 30) return "Name must be 30 characters or fewer";
    return "";
  },
  email: (v) => {
    if (!v) return "Email is required";
    if (v.length < 3) return "Email must be at least 3 characters";
    if (v.length > 30) return "Email must be 30 characters or fewer";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(v)) return "Please enter a valid email address";
    return "";
  },
  password: (v) => {
    if (!v) return "Password is required";
    if (v.length < 3) return "Password must be at least 3 characters";
    if (v.length > 20) return "Password must be 20 characters or fewer";
    return "";
  },
  avatar: (v) => {
    if (!v) return "Avatar URL is required";
    try {
      new URL(v);
    } catch {
      return "Please enter a valid URL";
    }
    return "";
  },
};

const RegisterModal = ({ activeModal, onRegister, closeActiveModal }) => {
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
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          id="email"
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
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          id="password"
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
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          id="avatar"
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
