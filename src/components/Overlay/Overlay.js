import React from 'react';
import './Overlay.css';

function Overlay({ visible, children }) {
  function toggleScrolling() {
    document.body.style.overflow = visible ? 'hidden' : 'visible';
  }

  toggleScrolling();
  return (
    <div className={`overlay ${visible && 'overlay_visible'}`}>{children}</div>
  );
}

export default Overlay;
