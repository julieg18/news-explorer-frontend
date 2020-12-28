import React from 'react';
import Button from '../Button/Button';
import './SearchForm.css';

function SearchForm({ onNewsSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.elements[0].value;
    onNewsSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        placeholder="Yellowstone"
        className="search-form__input"
        type="search"
        name="search-form"
        id="search-form"
      />
      <Button additionalClasses="search-form__btn" type="submit">
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
