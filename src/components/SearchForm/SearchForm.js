import React from 'react';
import Button from '../Button/Button';
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
      <Button additionalClasses="search-form__btn" type="submit">
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
