import { ThreeDots } from 'react-loader-spinner';
import React from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import * as api from '../API';
import { Button } from './Button/Button';

import '../styles/styles.css';
import { Modal } from './Modal/Modal';

export class App extends React.Component {
  state = {
    currentPage: 1,
    query: '',
    images: [],
    totalPages: 12,
    canLoadMore: false,
    status: 'start',
    modalURL: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { currentPage, query, totalPages } = this.state;

    //scroll down after adding gallery items
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });

    if (prevState.query === query && prevState.currentPage === currentPage) {
      return;
    }

    try {
      //show loading
      this.setState({ status: 'load' });
      //getting images from api
      const { findedImages, totalImages } = await api.getImages(
        query,
        totalPages * currentPage,
        1
      );
      //state finded images
      this.setState({
        images: findedImages,
        canLoadMore: totalImages > findedImages.length,
        status: findedImages.length > 0 ? 'success' : 'not found',
      });
    } catch (error) {
      console.log('error :', error);
    } finally {
    }
  }

  onFormSubmit = value => {
    //assign new query and set current page as default
    this.setState({ query: value, currentPage: 1, images: [] });
  };

  onLoadingMore = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  openModal = imageURL => {
    this.setState({ modalURL: imageURL });
  };

  closeModal = () => {
    this.setState({ modalURL: null });
  };

  render() {
    const {
      query,
      images,
      totalPages,
      currentPage,
      canLoadMore,
      status,
      modalURL,
    } = this.state;

    return (
      <div className="App">
        {modalURL && (
          <Modal largeImageURL={modalURL} closeModal={this.closeModal} />
        )}

        <SearchBar onFormSubmit={this.onFormSubmit} prevQuery={query} />

        <ImageGallery alt={query} images={images} openModal={this.openModal} />

        {status === 'success' && canLoadMore && (
          <Button
            onLoadingMore={this.onLoadingMore}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
        {status === 'not found' && <h2>Nothing was found...</h2>}

        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ margin: '0 auto' }}
          visible={status === 'load'}
        />
      </div>
    );
  }
}
