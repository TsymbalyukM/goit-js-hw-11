import { fetchPhotos } from './pixabay';
import Notiflix from 'notiflix';

const button = document.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.search-form input');
const loadBtn = document.querySelector('.load-more');

let currentPage = 1;

function fetchGallery(photos) {
  gallery.innerHTML = '';
  let markup;
  markup = photos.hits
    .map(photo => {
      return `<div class="photo-card">
    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>: ${photo.likes}
      </p>
      <p class="info-item">
        <b>Views</b>: ${photo.views}
      </p>
      <p class="info-item">
        <b>Comments</b>: ${photo.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>: ${photo.downloads}
      </p>
    </div>
  </div>`;
    })
    .join('');
  gallery.innerHTML = markup;

  if (photos.totalHits > 0) {
    Notiflix.Notify.success(`Horray! We found ${photos.totalHits} images.`);
  } else {
    loadBtn.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try Again.'
    );
  }
  if (photos.totalHits > 40) {
    loadBtn.classList.remove('is-hidden');
  }
}

async function createAnotherPage() {
  currentPage += 1;

  const photos = await fetchPhotos(input.value.trim(), currentPage);

  gallery.insertAdjacentHTML(
    'beforeend',
    photos.hits
      .map(photo => {
        return `<div class="photo-card">
    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>: ${photo.likes}
      </p>
      <p class="info-item">
        <b>Views</b>: ${photo.views}
      </p>
      <p class="info-item">
        <b>Comments</b>: ${photo.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>: ${photo.downloads}
      </p>
    </div>
  </div>`;
      })
      .join('')
  );

  if (photos.totalHits > currentPage * 40) {
    loadBtn.classList.remove('is-hidden');
  } else {
    loadBtn.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
function searchPhoto() {
  currentPage = 1;
  const termSearch = input.value.trim();
  if (termSearch === '') {
    gallery.innerHTML = '';
    return;
  }
  fetchPhotos(termSearch)
    .then(photos => fetchGallery(photos))
    .catch(error => console.log(error));
}

button.addEventListener('click', event => {
  event.preventDefault();
  searchPhoto();
});

loadBtn.addEventListener('click', event => {
  event.preventDefault();
  createAnotherPage();
});
