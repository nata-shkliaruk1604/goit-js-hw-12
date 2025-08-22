const loaderWrapper = document.querySelector('.loader-wrapper');

export function showLoader() {
  loaderWrapper.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderWrapper.classList.add('is-hidden');
}
