import React from 'react';
import './Overlay.css';

function Overlay({ visible, children }) {
  return (
    <div className={`overlay ${visible && 'overlay_visible'}`}>{children}</div>
  );
}

export default Overlay;
