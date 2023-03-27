import PropTypes from 'prop-types';

const Button = ({ loadMore }) => (
  <button className="Button" type="button" onClick={loadMore}>
    Load more
  </button>
);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
