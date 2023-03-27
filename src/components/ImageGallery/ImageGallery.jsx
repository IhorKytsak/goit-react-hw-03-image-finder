import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, modalHandler }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          modalHandler={modalHandler}
        />
      );
    })}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  modalHandler: PropTypes.func.isRequired,
};

export default ImageGallery;
