import { ThreeDots } from 'react-loader-spinner';
import React from 'react';
import { useState, useEffect } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import * as api from '../API';
import { Button } from './Button/Button';

import '../styles/styles.css';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [status, setStatus] = useState('start');
  const [modalURL, setModalURL] = useState(null);
  const totalPages = 12;

  useEffect(() => {
    try {
      if (!query) {
        return;
      }
      setStatus('load');

      (async () => {
        const { findedImages } = await api.getImages(
          query,
          totalPages,
          currentPage
        );
        setImages(state => [...state, ...findedImages]);
        setCanLoadMore(totalPages === findedImages.length);
        setStatus(findedImages.length > 0 ? 'success' : 'not found');
      })();
    } catch (error) {
      console.log('error :', error);
    }
  }, [query, currentPage, totalPages]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  });

  const onFormSubmit = value => {
    //assign new query and set current page as default
    setQuery(value);
    setCurrentPage(1);
    setImages([]);
  };

  const onLoadingMore = () => {
    setCurrentPage(state => state + 1);
  };

  const openModal = imageURL => {
    setModalURL(imageURL);
  };

  const closeModal = () => {
    setModalURL(null);
  };

  return (
    <div className="App">
      {modalURL && <Modal largeImageURL={modalURL} closeModal={closeModal} />}

      <SearchBar onFormSubmit={onFormSubmit} prevQuery={query} />

      <ImageGallery alt={query} images={images} openModal={openModal} />
      {status === 'success' && canLoadMore && (
        <Button
          onLoadingMore={onLoadingMore}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
      {status === 'not found' && <h2>Nothing was found...</h2>}

      <ThreeDots
        height="40"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: '0 auto' }}
        visible={status === 'load'}
      />
    </div>
  );
};
