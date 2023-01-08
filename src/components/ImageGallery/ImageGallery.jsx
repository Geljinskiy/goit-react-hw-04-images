import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import '../../styles/styles.css';

export const ImageGallery = ({ images, openModal, alt }) => {
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  });
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
