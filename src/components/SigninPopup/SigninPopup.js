import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Button from '../Button/Button';

function SigninPopup({ visible, onClose, onSignupLinkClick }) {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(
    '',
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading] = useState(false);

  function handleEmailInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setEmail(input.value);
    setIsEmailValid(isValid);
    setEmailValidationMessage(input.validationMessage);
    setIsFormValid(isValid && isPasswordValid && password !== '');
  }

  function handlePasswordInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setPassword(e.target.value);
    setIsPasswordValid(isValid);
    setPasswordValidationMessage(input.validationMessage);
    setIsFormValid(isValid && isEmailValid && email !== '');
  }

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm
      isFormValid={isFormValid}
      visible={visible}
      headingText="Sign in"
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <div className="popup-form__field">
        <label htmlFor="signin-email-field" className="popup-form__field-label">
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
          id="signin-email-field"
          required
        />
        <span
          className={`popup-form__field-error ${
            !isEmailValid && 'popup-form__field-error_active'
          }`}
          id="signin-email-field-error"
        >
          {emailValidationMessage}
        </span>
      </div>
      <div className="popup-form__field">
        <label htmlFor="signin-password" className="popup-form__field-label">
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
          id="signin-password-field"
          required
        />
        <span
          className={`popup-form__field-error ${
            !isPasswordValid && 'popup-form__field-error_active'
          }`}
          id="signin-password-field-error"
        >
          {passwordValidationMessage}
        </span>
      </div>
      <Button
        disabled={!isFormValid}
        additionalClasses="popup-form__submit-btn"
      >
        {isLoading ? 'Loading...' : 'Sign in'}
      </Button>
      <p className="popup__text">
        Or{' '}
        <span onClick={onSignupLinkClick} className="popup__link">
          Sign up
        </span>
      </p>
    </PopupWithForm>
  );
}

export default SigninPopup;
