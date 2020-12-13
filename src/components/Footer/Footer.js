import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <ul className="footer__links">
        <li>
          <a className="footer__link" href="/">
            Home
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://practicum.yandex.com/"
            target="_blank"
            rel="noreferrer"
          >
            Practicum By Yandex
          </a>
        </li>
      </ul>
      <ul className="footer__icon-links">
        <li>
          <a
            className="footer__icon-link footer__icon-link_icon_github"
            href="https://github.com/julieg18/news-explorer-frontend"
            target="_blank"
            rel="noreferrer"
          >
            <span className="footer__screen-reader-only-el">Github</span>
          </a>
        </li>
        <li>
          <a
            className="footer__icon-link footer__icon-link_icon_facebook"
            href="https://www.facebook.com/julie.galvan.75470"
            target="_blank"
            rel="noreferrer"
          >
            <span className="footer__screen-reader-only-el">Facebook</span>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
