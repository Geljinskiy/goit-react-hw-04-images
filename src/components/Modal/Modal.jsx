import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/styles.css';

export class Modal extends React.Component {
  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    window.addEventListener('keydown', this.onKey);
  }

  componentWillUnmount() {
    document.body.style.overflowY = 'unset';
    window.removeEventListener('keydown', this.onKey);
  }

  onKey = ev => {
    if (ev.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = ev => {
    const { currentTarget, target } = ev;
    if (currentTarget === target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div onClick={this.onBackdropClick} className="Overlay">
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
