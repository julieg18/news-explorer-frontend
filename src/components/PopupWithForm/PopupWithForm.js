import React from 'react';
import Popup from '../Popup/Popup';
import './PopupWithForm.css';

function PopupWithForm({ visible, headingText, onSubmit, children, onClose }) {
  return (
    <Popup onClose={onClose} visible={visible} headingText={headingText}>
      <form className="popup-form" onSubmit={onSubmit}>
        {children}
      </form>
    </Popup>
  );
}

export default PopupWithForm;
