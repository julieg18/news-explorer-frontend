import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SignupPopup({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(
    '',
  );
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [usernameValidationMessage, setUsernameValidationMessage] = useState(
    '',
  );
  const [isFormValid, setIsFormValid] = useState(false);

  function handleEmailInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setEmail(input.value);
    setIsEmailValid(isValid);
    setEmailValidationMessage(input.validationMessage);
    setIsFormValid(
      isValid &&
        isPasswordValid &&
        isUsernameValid &&
        password !== '' &&
        username !== '',
    );
  }

  function handlePasswordInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setPassword(e.target.value);
    setIsPasswordValid(isValid);
    setPasswordValidationMessage(input.validationMessage);
    setIsFormValid(
      isValid &&
        isEmailValid &&
        isUsernameValid &&
        email !== '' &&
        username !== '',
    );
  }

  function handleUsernameInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setUsername(e.target.value);
    setIsUsernameValid(isValid);
    setUsernameValidationMessage(input.validationMessage);
    setIsFormValid(
      isValid &&
        isEmailValid &&
        isPasswordValid &&
        email !== '' &&
        password !== '',
    );
  }

  return (
    <PopupWithForm
      isFormValid={isFormValid}
      visible={visible}
      headingText="Sign up"
      onClose={onClose}
    >
      <div className="popup-form__field">
        <label htmlFor="email-field" className="popup-form__field-label">
          Email
        </label>
        <input
          onChange={handleEmailInputChange}
          value={email}
          placeholder="Enter email"
          type="email"
          className={`popup-form__field-input ${
            !isEmailValid && 'popup-form__field-input_invalid'
          }`}
          id="email-field"
          required
        />
        <span
          className={`popup-form__field-error ${
            !isEmailValid && 'popup-form__field-error_active'
          }`}
          id="email-field-error"
        >
          {emailValidationMessage}
        </span>
      </div>
      <div className="popup-form__field">
        <label htmlFor="password-field" className="popup-form__field-label">
          Password
        </label>
        <input
          onChange={handlePasswordInputChange}
          value={password}
          placeholder="Enter password"
          type="password"
          autoComplete="on"
          className={`popup-form__field-input ${
            !isPasswordValid && 'popup-form__field-input_invalid'
          }`}
          id="password-field"
          required
        />
        <span
          className={`popup-form__field-error ${
            !isPasswordValid && 'popup-form__field-error_active'
          }`}
          id="password-field-error"
        >
          {passwordValidationMessage}
        </span>
      </div>
      <div className="popup-form__field">
        <label htmlFor="username-field" className="popup-form__field-label">
          Username
        </label>
        <input
          onChange={handleUsernameInputChange}
          value={username}
          placeholder="Enter username"
          type="text"
          className={`popup-form__field-input ${
            !isUsernameValid && 'popup-form__field-input_invalid'
          }`}
          id="username-field"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`popup-form__field-error ${
            !isUsernameValid && 'popup-form__field-error_active'
          }`}
          id="username-field-error"
        >
          {usernameValidationMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default SignupPopup;