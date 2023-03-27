import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, modalHandler }) => (
  <li className="ImageGalleryItem">
    <img
      onClick={() => {
        modalHandler(largeImageURL);
      }}
      src={webformatURL}
      alt={webformatURL}
      className="ImageGalleryItem-image"
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
