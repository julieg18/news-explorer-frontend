import React from 'react';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import './PopupWithForm.css';

function PopupWithForm({
  visible,
  headingText,
  onSubmit,
  children,
  isLoading,
  isFormValid,
  onClose,
  handleSigninLinkClick,
}) {
  return (
    <Popup onClose={onClose} visible={visible} headingText={headingText}>
      <form className="popup-form" onSubmit={onSubmit}>
        {children}
        <Button
          disabled={!isFormValid}
          additionalClasses="popup-form__submit-btn"
        >
          {isLoading ? 'Loading...' : 'Signup'}
        </Button>
      </form>
      <p className="popup__text">
        Or{' '}
        <span onClick={handleSigninLinkClick} className="popup__link">
          Sign in
        </span>
      </p>
    </Popup>
  );
}

export default PopupWithForm;
