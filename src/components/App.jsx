import { Component } from 'react';

import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImages } from '../api/pixabayAPI';

class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    showLoader: false,
    modalImage: '',
    showModal: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    const { page: prevPage, searchValue: prevSearchValue } = prevState;

    const { searchValue, page } = this.state;
    if (prevSearchValue !== searchValue || prevPage !== page) {
      this.loaderToggle(true);

      fetchImages(searchValue, page)
        .then(receivedImages => {
          this.addNewImages(receivedImages);
        })
        .catch(error => {
          alert(error.message);
        })
        .finally(() => {
          this.loaderToggle(false);
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  loaderToggle = boolean => {
    return this.setState({ showLoader: boolean });
  };

  addNewImages = newImages => {
    this.setState(({ images }) => ({
      images: [...images, ...newImages],
    }));
  };

  openLargeImage = linkImg => {
    this.setState({ modalImage: linkImg });
    this.toggleModal();
  };

  searchFormHandler = searchValue => {
    if (searchValue === this.state.searchValue) {
      return;
    }

    this.setState({
      searchValue: searchValue,
      images: [],
      page: 1,
    });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, showLoader, modalImage, showModal } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.searchFormHandler} />

        <ImageGallery images={images} modalHandler={this.openLargeImage} />

        {showLoader && <Loader />}
        {images.length > 0 && <Button loadMore={this.loadMoreHandler} />}
        {images.length === 0 && (
          <h3 style={{ margin: '0 auto' }}>Nothing found :(</h3>
        )}
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={modalImage} alt="modal" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
