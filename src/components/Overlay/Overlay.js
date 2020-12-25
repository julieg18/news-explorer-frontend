import React from 'react';
import './Overlay.css';

function Overlay({ visible, children, onClose }) {
  function toggleScrolling() {
    document.body.style.overflow = visible ? 'hidden' : 'visible';
  }

  function checkIfOverlayWasClicked(e) {
    if (e.target.classList.contains('overlay')) {
      onClose();
    }
  }

  toggleScrolling();
  return (
    <div
      onClick={checkIfOverlayWasClicked}
      className={`overlay ${visible && 'overlay_visible'}`}
    >
      {children}
    </div>
  );
}

export default Overlay;
