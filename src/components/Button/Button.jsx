import PropTypes from 'prop-types';

import '../../styles/styles.css';

export const Button = ({ onLoadingMore }) => {
  return (
    <button className="Button" onClick={onLoadingMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadingMore: PropTypes.func.isRequired,
};
