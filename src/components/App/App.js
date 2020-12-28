import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SigninPopup from '../SigninPopup/SigninPopup';
import newsApi from '../../utils/newsApi';
import './App.css';

function App() {
  const [isUserLoggedIn] = useState(false);
  const [
    isRegistrationSuccessfulMessagePopupOpen,
    setIsRegistrationSuccessfulMessagePopupOpen,
  ] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser] = useState({ name: 'Elise' });
  const [newsQuery, setNewsQuery] = useState('');
  const [areCardsLoading, setAreCardsLoading] = useState(false);
  const [showSearchResultsError, setShowSearchResultsError] = useState(false);
  const [articles, setArticles] = useState([]);
  /* eslint-disable-next-line */
  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    if (localStorage.getItem('articlesQuery')) {
      handleNewsSearch(localStorage.getItem('articlesQuery'));
    }
  });

  function handleNewsSearch(query) {
    setNewsQuery(query);
    localStorage.setItem('articlesQuery', query);
    setAreCardsLoading(true);
    newsApi
      .getArticles(query)
      .then(({ articles }) => {
        setArticles(articles);
        setAreCardsLoading(false);
        setShowSearchResultsError(false);
      })
      .catch((err) => {
        setAreCardsLoading(false);
        setShowSearchResultsError(true);
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsRegistrationSuccessfulMessagePopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSigninPopupOpen(false);
    setIsPopupOpen(false);
    window.removeEventListener('keyup', handleEscPopupClose);
  }

  function handleEscPopupClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function setEscPopupCloseEventListener() {
    window.addEventListener('keyup', handleEscPopupClose);
  }

  function openSignupPopup() {
    closeAllPopups();
    setEscPopupCloseEventListener();
    setIsPopupOpen(true);
    setIsSignupPopupOpen(true);
  }

  function openSigninPopup() {
    closeAllPopups();
    setEscPopupCloseEventListener();
    setIsPopupOpen(true);
    setIsSigninPopupOpen(true);
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Header
            onSigninLinkClick={openSignupPopup}
            isPopupOpen={isPopupOpen}
            isUserLoggedIn={isUserLoggedIn}
            onNewsSearch={handleNewsSearch}
          />
          <Main
            showSearchResults={newsQuery !== ''}
            isUserLoggedIn={isUserLoggedIn}
            areCardsLoading={areCardsLoading}
            articles={articles}
            showSearchResultsError={showSearchResultsError}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews
            isUserLoggedIn={isUserLoggedIn}
            currentUser={currentUser}
            articles={articles}
          />
        </Route>
      </Switch>
      <Footer />
      <Popup
        visible={isRegistrationSuccessfulMessagePopupOpen}
        headingText="Registration successfully completed!"
        onClose={closeAllPopups}
      >
        <p className="popup__link" onClick={openSignupPopup}>
          Sign up
        </p>
      </Popup>
      <SigninPopup
        onSignupLinkClick={openSignupPopup}
        onClose={closeAllPopups}
        visible={isSigninPopupOpen}
      />
      <SignupPopup
        onSigninLinkClick={openSigninPopup}
        onClose={closeAllPopups}
        visible={isSignupPopupOpen}
      />
    </div>
  );
}

export default App;
