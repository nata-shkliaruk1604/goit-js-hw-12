import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { clearGallery, renderImages } from './js/render-functions';
import { showLoader, hideLoader } from './js/loader';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const PER_PAGE = 15;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery(gallery);
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, PER_PAGE);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.warning({
        message: 'Sorry, no images found. Try another query!',
        position: 'topRight',
      });
      return;
    }

    renderImages(data.hits, gallery);

    if (data.totalHits > PER_PAGE) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
}

async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, PER_PAGE);
    hideLoader();

    renderImages(data.hits, gallery);

    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    // плавний скрол
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Error while loading more images.',
      position: 'topRight',
    });
  }
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
