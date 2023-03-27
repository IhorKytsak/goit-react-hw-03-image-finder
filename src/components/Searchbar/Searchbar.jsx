import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const onSubmitHandler = event => {
    event.preventDefault();

    const searchValue = event.target[1].value;

    if (searchValue.trim() === '') {
      return;
    }
    onSubmit(searchValue);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmitHandler}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
