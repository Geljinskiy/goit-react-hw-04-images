import axios from 'axios';

const KEY = '32347613-8deabf9eaa5acb6512bc9438c';
const URL = 'https://pixabay.com/api/';

export const getImages = async (query, pages, currentPage) => {
  const response = await axios.get(
    `${URL}?q=${query}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${pages}&key=${KEY}`
  );
  return { findedImages: response.data.hits, totalImages: response.data.total };
};
