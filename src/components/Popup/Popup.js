import React from 'react';
import Overlay from '../Overlay/Overlay';
import './Popup.css';

function Popup({ headingText, children, visible, onClose }) {
  return (
    <Overlay visible={visible}>
      <div className="popup">
        <button onClick={onClose} className="popup__exit-btn"></button>
        <h2 className="popup__heading">{headingText}</h2>
        {children}
      </div>
    </Overlay>
  );
}

export default Popup;
