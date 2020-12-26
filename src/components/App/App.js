import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SigninPopup from '../SigninPopup/SigninPopup';
import './App.css';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [
    isRegistrationSuccessfulMessagePopupOpen,
    setIsRegistrationSuccessfulMessagePopupOpen,
  ] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Elise' });
  const [cards, setCards] = useState([
    {
      id: '765',
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      text:
        'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. ',
      date: 'November 20, 2020',
      source: 'Treehugger',
      link: 'https://www.treehugger.com/special-sit-spot-nature-5085811',
      image:
        'https://www.treehugger.com/thmb/X8foR4t6_Z2dv_1LR6jGGEnC91Q=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/sittingonatreestump-ac694d0a1e6146d89f913cc631dfa04c.jpg',
      keyword: 'nature',
      saved: true,
    },
    {
      id: '769',
      title: 'Nature makes you better',
      text:
        'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves. These things ease our stress and worry; they help us to relax and think more clearly.',
      date: 'February 19, 2019',
      source: 'National Geographic',
      link:
        'https://www.nationalgeographic.com/travel/features/partner-content-nature-makes-you-better/#:~:text=Nature%20makes%20you%20better&text=We%20are%20beginning%20to%20learn,can%20calm%20and%20connect%20us.',
      image:
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      keyword: 'nature',
      saved: true,
    },
    {
      id: '760',
      title: 'Grand Teton Renews Historic Crest Trail',
      text:
        '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be enabled to visit that most fascinating region…In traversing this loop, one completely encircles the Three Tetons and adjacent high peaks, viewing them from all sides. In this way one learns to know these peaks with an intimacy impossible to the visitor who contents himself with distant views. No more thrilling mountain trip can be found in all America than that over the newly-completed loop of the Teton Skyline Trail.” –Fritioff Fryxell, 1934. Grand Teton National Park’s first ranger and trail visionary.',
      date: 'November 4, 2020',
      source: 'National Parks Traveler',
      link:
        "https://www.nationalparkstraveler.org/2020/10/grand-teton-renews-historic-crest-trail#:~:text=Grand%20Teton%20National%20Park's%20first,the%20grit%20to%20get%20there.",
      image:
        'https://images.unsplash.com/photo-1582002834723-2256d33da100?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9vc2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      keyword: 'parks',
      saved: true,
    },
    {
      id: '761',
      title: "Scientists Don't Know Why Polaris Is So Weird ",
      text:
        'Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them. ',
      date: 'March 16, 2020',
      source: 'treehugger',
      link:
        'https://www.treehugger.com/polaris-north-star-facts-how-big-far-4859425#:~:text=According%20to%20the%20new%20study,a%20new%20lease%20on%20life.',
      image:
        'https://www.treehugger.com/thmb/29MSwyudwok2_gh6AZDAwWH17CE=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2020__03__polaris-north-star-facts-b2a823cf25a44ef89260cd09f5c5c845.jpg',
      keyword: 'photography',
      saved: true,
    },
    {
      id: '763',
      title: 'Nostalgic Photos of Tourists in U.S. National Parks',
      text:
        'In 1976, photographer Roger Minick was teaching a workshop in Yosemite National Park when he became fascinated with an unexpected subject: the American tourist. “I began to see the visitors as having a specific humanity, their own classification, a genus—Sightseer americanus, if you will,” Minick writes. Captivated by hordes of visitors, camera-toting families, and packed motor coaches, Minick embarked on two road trips around the western United States in 1980 and 1981—a multiyear project that he would eventually revisit in the late 1990s, and culminated into the Sightseer Series.',
      date: 'October 19, 2020',
      source: 'national geographic',
      link:
        'https://www.nationalgeographic.com/travel/destinations/north-america/united-states/national-parks/sightseer-american-tourists-in-national-parks/',
      image:
        'https://images.unsplash.com/photo-1600590527803-33a2305106a8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
      keyword: 'yellowstone',
      saved: true,
    },
  ]);

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
            onSigninLinkClick={openSigninPopup}
            isPopupOpen={isPopupOpen}
            isUserLoggedIn={isUserLoggedIn}
          />
          <Main isUserLoggedIn={isUserLoggedIn} cards={cards} />
        </Route>
        <Route path="/saved-news">
          <SavedNews
            isUserLoggedIn={isUserLoggedIn}
            currentUser={currentUser}
            cards={cards}
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
