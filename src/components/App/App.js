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
import authApi from '../../utils/authApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [
    isRegistrationSuccessfulPopupOpen,
    setIsRegistrationSuccessfulPopupOpen,
  ] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newsQuery, setNewsQuery] = useState('');
  const [areCardsLoading, setAreCardsLoading] = useState(false);
  const [showSearchResultsError, setShowSearchResultsError] = useState(false);
  const [articles, setArticles] = useState([]);
  /* eslint-disable-next-line */
  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    if (localStorage.getItem('articlesQuery')) {
      // handleNewsSearch(localStorage.getItem('articlesQuery'));
    }

    if (localStorage.getItem('token')) {
      getUser();
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
    setIsRegistrationSuccessfulPopupOpen(false);
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

  function openRegistrationSuccessfulPopup() {
    closeAllPopups();
    setEscPopupCloseEventListener();
    setIsPopupOpen(true);
    setIsRegistrationSuccessfulPopupOpen(true);
  }

  function getUser() {
    const token = localStorage.getItem('token');
    authApi.checkUserValidity(token).then(({ user }) => {
      setIsUserLoggedIn(true);
      setCurrentUser(user);
    });
  }

  function signupUser({ username: name, email, password }) {
    return authApi.signupUser({ name, email, password }).then(() => {
      openRegistrationSuccessfulPopup();
    });
  }

  function signinUser({ email, password }) {
    return authApi
      .signinUser({ email, password })
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return getUser();
      })
      .then(() => {
        closeAllPopups();
      });
  }

  function logoutUser() {
    localStorage.removeItem('token');
    setIsUserLoggedIn(false);
    setCurrentUser({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header
              onLogoutUser={logoutUser}
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
              onLogoutUser={logoutUser}
              isUserLoggedIn={isUserLoggedIn}
              articles={articles}
            />
          </Route>
        </Switch>
        <Footer />
        <Popup
          visible={isRegistrationSuccessfulPopupOpen}
          headingText="Registration successfully completed!"
          onClose={closeAllPopups}
        >
          <p className="popup__link" onClick={openSigninPopup}>
            Sign in
          </p>
        </Popup>
        <SigninPopup
          onSignupLinkClick={openSignupPopup}
          onClose={closeAllPopups}
          visible={isSigninPopupOpen}
          onSigninUser={signinUser}
        />
        <SignupPopup
          onSigninLinkClick={openSigninPopup}
          onClose={closeAllPopups}
          visible={isSignupPopupOpen}
          onSignupUser={signupUser}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
