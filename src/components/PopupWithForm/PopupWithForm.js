import React from 'react';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import './PopupWithForm.css';

function PopupWithForm({
  visible,
  headingText,
  submitBtnText,
  onSubmit,
  children,
  isLoading,
  isFormValid,
  onClose,
}) {
  return (
    <Popup onClose={onClose} visible={visible} headingText={headingText}>
      <form className="popup-form" onSubmit={onSubmit}>
        {children}
        <Button
          disabled={!isFormValid}
          additionalClasses="popup-form__submit-btn"
        >
          {isLoading ? 'Loading...' : submitBtnText}
        </Button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
