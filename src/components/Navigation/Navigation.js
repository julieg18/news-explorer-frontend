import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';
import './Navigation.css';

function Navigation({
  isUserLoggedIn,
  lightTheme,
  isPopupOpen,
  onSigninLinkClick,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropDown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleSigninLinkClick() {
    setIsDropdownOpen(false);
    onSigninLinkClick();
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
              <Link to="/" className="navigation__link">
                Home
              </Link>
            </li>
            {isUserLoggedIn ? (
              <>
                <li className="navigation__item">
                  <Link to="/saved-news" className="navigation__link">
                    Saved Articles
                  </Link>
                </li>
                <li className="navigation__item">
                  <button className="navigation__btn">
                    Name <span className="navigation__btn-icon"></span>
                  </button>
                </li>
              </>
            ) : (
              <li className="navigation__item">
                <button
                  onClick={handleSigninLinkClick}
                  className="navigation__btn"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </Overlay>
      <ul className="navigation__items">
        <li className="navigation__item">
          <NavLink
            exact
            to="/"
            className="navigation__link"
            activeClassName="navigation__link_selected"
          >
            Home
          </NavLink>
        </li>
        {isUserLoggedIn ? (
          <>
            <li className="navigation__item">
              <NavLink
                activeClassName="navigation__link_selected"
                to="/saved-news"
                className="navigation__link"
              >
                Saved Articles
              </NavLink>
            </li>
            <li className="navigation__item">
              <button className="navigation__btn">
                Name <span className="navigation__btn-icon"></span>
              </button>
            </li>
          </>
        ) : (
          <li className="navigation__item">
            <button onClick={onSigninLinkClick} className="navigation__btn">
              Sign In
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
