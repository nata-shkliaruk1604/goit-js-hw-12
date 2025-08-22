import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images, gallery) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}" class="gallery-link">
            <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
          </a>
          <div class="image-info">
            <div class="image-info-item"><b>Likes</b><span>${likes}</span></div>
            <div class="image-info-item"><b>Views</b><span>${views}</span></div>
            <div class="image-info-item"><b>Comments</b><span>${comments}</span></div>
            <div class="image-info-item"><b>Downloads</b><span>${downloads}</span></div>
          </div>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}
