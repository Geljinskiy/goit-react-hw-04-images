import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import '../../styles/styles.css';

export const ImageGallery = ({ images, openModal, alt }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => {
        return (
          <li className="ImageGalleryItem" key={image.id}>
            <ImageGalleryItem image={image} openModal={openModal} alt={alt} />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};
