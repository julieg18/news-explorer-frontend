import React, { useEffect } from 'react';
import './Overlay.css';

function Overlay({ visible, children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'visible';
  }, [visible]);

  function checkIfOverlayWasClicked(e) {
    if (e.target.classList.contains('overlay')) {
      onClose();
    }
  }

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
