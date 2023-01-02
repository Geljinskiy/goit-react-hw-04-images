import '../../styles/styles.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, openModal, alt }) => {
  const { webformatURL, largeImageURL } = image;
  return (
    <img
      onClick={() => openModal(largeImageURL)}
      className="ImageGalleryItem-image"
      src={webformatURL}
      alt={alt}
    />
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};
