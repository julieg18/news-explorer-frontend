import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Button from '../Button/Button';

function SignupPopup({ visible, onClose, onSigninLinkClick, onSignupUser }) {
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
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    const message = input.validationMessage.includes(
      'match the requested format',
    )
      ? 'Password must contain no spaces.'
      : input.validationMessage;
    setPassword(e.target.value);
    setIsPasswordValid(isValid);
    setPasswordValidationMessage(message);
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

  function handleFormSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    onSignupUser({ email, password, username })
      .then(() => {
        setIsLoading(false);
        setFormError('');
      })
      .catch((err) => {
        setFormError(err.message);
        setIsLoading(false);
      });
  }

  return (
    <PopupWithForm
      isFormValid={isFormValid}
      visible={visible}
      headingText="Sign up"
      submitBtnText="Sign up"
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <div className="popup-form__field">
        <label htmlFor="signup-email-field" className="popup-form__field-label">
          Email
        </label>
        <input
          disabled={isLoading}
          onChange={handleEmailInputChange}
          value={email}
          placeholder="Enter email"
          type="email"
          className={`popup-form__field-input ${
            !isEmailValid && 'popup-form__field-input_invalid'
          }`}
          id="signup-email-field"
          required
        />
        <span
          className={`popup-form__field-error ${
            !isEmailValid && 'popup-form__field-error_active'
          }`}
          id="signup-email-field-error"
        >
          {emailValidationMessage}
        </span>
      </div>
      <div className="popup-form__field">
        <label
          htmlFor="signup-password-field"
          className="popup-form__field-label"
        >
          Password
        </label>
        <input
          disabled={isLoading}
          onChange={handlePasswordInputChange}
          value={password}
          placeholder="Enter password"
          type="password"
          autoComplete="on"
          className={`popup-form__field-input ${
            !isPasswordValid && 'popup-form__field-input_invalid'
          }`}
          id="signup-password-field"
          required
          pattern="^\S+$"
          minLength="6"
        />
        <span
          className={`popup-form__field-error ${
            !isPasswordValid && 'popup-form__field-error_active'
          }`}
          id="signup-password-field-error"
        >
          {passwordValidationMessage}
        </span>
      </div>
      <div className="popup-form__field">
        <label
          htmlFor="signup-username-field"
          className="popup-form__field-label"
        >
          Username
        </label>
        <input
          disabled={isLoading}
          onChange={handleUsernameInputChange}
          value={username}
          placeholder="Enter username"
          type="text"
          className={`popup-form__field-input ${
            !isUsernameValid && 'popup-form__field-input_invalid'
          }`}
          id="signup-username-field"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`popup-form__field-error ${
            !isUsernameValid && 'popup-form__field-error_active'
          }`}
          id="signup-username-field-error"
        >
          {usernameValidationMessage}
        </span>
      </div>
      <span title={formError} className="popup-form__form-error">
        {formError}
      </span>
      <Button
        disabled={!isFormValid}
        additionalClasses="popup-form__submit-btn"
        type="submit"
      >
        {isLoading ? 'Loading...' : 'Sign up'}
      </Button>
      <p className="popup__text">
        Or{' '}
        <span onClick={onSigninLinkClick} className="popup__link">
          Sign in
        </span>
      </p>
    </PopupWithForm>
  );
}

export default SignupPopup;
