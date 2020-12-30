import React, { useState } from 'react';
import Button from '../Button/Button';
import './SearchForm.css';

function SearchForm({ onNewsSearch }) {
  const [search, setSearch] = useState('');
  const [isSearchValid, setIsSearchValid] = useState(true);

  function handleSearchInputChange(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    setSearch(input.value);
    setIsSearchValid(isValid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search === '') {
      setIsSearchValid(false);
    } else {
      onNewsSearch(search);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="search-form">
      <div className="search-form__search">
        <input
          placeholder="Yellowstone"
          className="search-form__search-input"
          type="search"
          name="search-form"
          id="search-form"
          value={search}
          onChange={handleSearchInputChange}
          required
        />
        <Button
          disabled={!isSearchValid}
          additionalClasses="search-form__search-btn"
          type="submit"
        >
          Search
        </Button>
      </div>
      <span
        className={`search-form__error ${
          !isSearchValid && 'search-form__error_show'
        }`}
      >
        Please enter a keyword
      </span>
    </form>
  );
}

export default SearchForm;
