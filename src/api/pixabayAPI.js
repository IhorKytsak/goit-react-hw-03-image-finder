import axios from 'axios';

const apiKey = '32099217-de7cf2504ca4eed95138fd014';

export const fetchImages = (words, page) =>
  axios
    .get(
      `https://pixabay.com/api/?q=${words}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data.hits);
