import React, { useState } from 'react';
import Overlay from '../Overlay/Overlay';
import './Navigation.css';

function Navigation({ lightTheme, isPopupOpen, onSigninLinkClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropDown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <nav className={`navigation ${lightTheme && 'navigation_theme_light'}`}>
      <p className="navigation__title">News Explorer</p>
      {!isPopupOpen ? (
        <button
          onClick={toggleDropDown}
          className="navigation__mobile-btn navigation__mobile-btn_icon_menu"
        ></button>
      ) : (
        ''
      )}
      <Overlay onClose={toggleDropDown} visible={isDropdownOpen}>
        <div
          className={`navigation__dropdown ${
            isDropdownOpen && 'navigation__dropdown_show'
          }`}
        >
          <div className="navigation__dropdown-nav-bar">
            <button
              onClick={toggleDropDown}
              className="navigation__mobile-btn navigation__mobile-btn_icon_exit"
            ></button>
          </div>
          <ul className="navigation__dropdown-items">
            <li className="navigation__item">
              <a href="#home" className="navigation__link">
                Home
              </a>
            </li>
            <li className="navigation__item navigation__item_hidden">
              <a href="#articles" className="navigation__link">
                Saved Articles
              </a>
            </li>
            <li className="navigation__item">
              <button onClick={onSigninLinkClick} className="navigation__btn">
                Sign In
              </button>
            </li>
            <li className="navigation__item navigation__item_hidden">
              <button className="navigation__btn">
                Name <span className="navigation__btn-icon"></span>
              </button>
            </li>
          </ul>
        </div>
      </Overlay>
      <ul className="navigation__items">
        <li className="navigation__item">
          <a
            href="#home"
            className="navigation__link navigation__link_selected"
          >
            Home
          </a>
        </li>
        <li className="navigation__item navigation__item_hidden">
          <a href="#articles" className="navigation__link">
            Saved Articles
          </a>
        </li>
        <li className="navigation__item">
          <button onClick={onSigninLinkClick} className="navigation__btn">
            Sign In
          </button>
        </li>
        <li className="navigation__item navigation__item_hidden">
          <button className="navigation__btn">
            Name <span className="navigation__btn-icon"></span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
