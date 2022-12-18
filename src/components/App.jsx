import React, { Component } from 'react';
import axios from 'axios';

import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const apiKey = '32099217-de7cf2504ca4eed95138fd014';

class App extends Component {
  state = {
    searchValue: '',
    images: [],
    modalImage: '',
    showModal: false,
    showLoader: false,
    currentPage: 1,
  };

  componentDidUpdate(_prevProps, prevState) {
    const prevPage = prevState.currentPage;
    const prevSearchValue = prevState.searchValue;
    const { searchValue, currentPage } = this.state;
    if (prevSearchValue !== searchValue || prevPage !== currentPage) {
      try {
        this.getImages(searchValue, currentPage);
      } catch (error) {
        alert(error.message);
      } finally {
        this.loaderToggle(false);
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  addNewImages = newImages => {
    const newSearchArray = [...this.state.images, ...newImages];

    this.setState({ images: newSearchArray });
  };

  openLargeImage = linkImg => {
    this.setState({ modalImage: linkImg });
    this.toggleModal();
  };

  loaderToggle = boolean => {
    return this.setState({ showLoader: boolean });
  };

  getImages(words, page) {
    this.loaderToggle(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${words}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const receivedImages = response.data.hits;
        this.addNewImages(receivedImages);
      });
  }

  searchFormHandler = searchValue => {
    if (searchValue.trim() === '') {
      return;
    }

    if (searchValue === this.state.searchValue) {
      return;
    }

    this.setState({
      searchValue: searchValue,
      images: [],
      currentPage: 1,
    });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    return (
      <div className="App">
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={this.state.modalImage} alt="modal" />
          </Modal>
        )}
        <Searchbar onSubmit={this.searchFormHandler} />

        {this.state.searchValue !== '' && (
          <ImageGallery
            imagesArray={this.state.images}
            modalHandler={this.openLargeImage}
          />
        )}
        {this.state.showLoader && <Loader />}
        {this.state.searchValue !== '' && this.state.images.length > 0 && (
          <Button loadMore={this.loadMoreHandler} />
        )}
      </div>
    );
  }
}

export default App;
