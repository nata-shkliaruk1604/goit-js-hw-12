import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23963114-6d0d5d874ae460d9125bacd21';

export function getImagesByQuery(query, page = 1, per_page = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };
  return axios.get(BASE_URL, { params }).then(response => response.data);
}
