import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <input
        placeholder="Yellowstone"
        className="search-form__input"
        type="search"
        name="search-form"
        id="#search-form"
      />
      <button className="btn search-form__btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
