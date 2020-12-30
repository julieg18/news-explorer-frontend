import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SigninPopup from '../SigninPopup/SigninPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
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
  const [savedArticles, setSavedArticles] = useState([]);
  /* eslint-disable-next-line */
  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
        .then(() => {
          return getSavedArticles();
        })
        .then((savedArticlesArr) => {
          handleNewsSearch(
            localStorage.getItem('articlesQuery'),
            savedArticlesArr,
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (
      localStorage.getItem('articlesQuery') &&
      !localStorage.getItem('token')
    ) {
      handleNewsSearch(localStorage.getItem('articlesQuery'));
    }
  });

  function getUser() {
    const token = localStorage.getItem('token');
    return mainApi
      .checkUserValidity(token)
      .then(({ user }) => {
        setIsUserLoggedIn(true);
        setCurrentUser(user);
        return getSavedArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signupUser({ username: name, email, password }) {
    return mainApi
      .signupUser({ name, email, password })
      .then(() => {
        openRegistrationSuccessfulPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signinUser({ email, password }) {
    return mainApi
      .signinUser({ email, password })
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return getUser();
      })
      .then((savedArticlesArr) => {
        setArticles(addUserInfoToArticles(articles, savedArticlesArr));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logoutUser() {
    localStorage.removeItem('token');
    setIsUserLoggedIn(false);
    setCurrentUser({});
    setArticles(addUserInfoToArticles(articles, []));
  }

  function saveArticle({ title, text, date, source, link, image }) {
    const newArticle = {
      keyword: newsQuery,
      title,
      text,
      date,
      source,
      link,
      image,
    };
    mainApi
      .createArticle(newArticle)
      .then(({ article }) => {
        setSavedArticles([...savedArticles, article]);
        setArticles(
          addUserInfoToArticles(articles, [...savedArticles, article]),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteSavedArticle(articleId) {
    mainApi
      .deleteArticle(articleId)
      .then(() => {
        const newSavedArticles = savedArticles.filter(
          (article) => articleId !== article._id,
        );
        setSavedArticles(newSavedArticles);
        setArticles(addUserInfoToArticles(articles, newSavedArticles));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSavedArticles() {
    return mainApi
      .getSavedArticles()
      .then(({ articles }) => {
        setSavedArticles(articles);
        return articles;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addUserInfoToArticles(articlesToBeUpdated, savedArticlesArr) {
    const updatedArticles = articlesToBeUpdated.map((article) => {
      const foundSavedArticle = savedArticlesArr.find(
        (savedArticle) => savedArticle.link === article.url,
      );
      return {
        ...article,
        saved: Boolean(foundSavedArticle),
        _id: foundSavedArticle ? foundSavedArticle._id : null,
      };
    });
    return updatedArticles;
  }

  function handleNewsSearch(query, savedArticlesArr) {
    setNewsQuery(query);
    localStorage.setItem('articlesQuery', query);
    setAreCardsLoading(true);
    return newsApi
      .getArticles(query)
      .then(({ articles }) => {
        setArticles(
          addUserInfoToArticles(articles, savedArticlesArr || savedArticles),
        );
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
              onOpenSignupPopup={openSignupPopup}
              onSaveArticle={saveArticle}
              onDeleteArticle={deleteSavedArticle}
            />
          </Route>
          <ProtectedRoute
            component={SavedNews}
            path="/saved-news"
            onLogoutUser={logoutUser}
            isUserLoggedIn={isUserLoggedIn}
            articles={savedArticles}
            onDeleteArticle={deleteSavedArticle}
          />
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
