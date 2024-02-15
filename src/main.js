import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more');
let searchTerm = '';
let page = 1;
let totalHits = 0;

let galleryItemHeight = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionSelector: 'img',
  captionDelay: 250,
});

function showLoader() {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  loadMoreBtn.parentNode.insertBefore(loader, loadMoreBtn.nextSibling);
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    iziToast.error({
      message: 'Your request is missing. Please fill out the form',
      position: 'topCenter',
    });
    return;
  }

  gallery.innerHTML = '';

  showLoader();

  try {
    await searchImages();
  } catch (error) {
    iziToast.error({
      message: `An error occurred: ${error.message}`,
      position: 'topCenter',
    });
  } finally {
    hideLoader();
  }
  searchInput.value = '';
});

async function searchImages() {
  const apiKey = '42356211-e192fc2ea90e5ac732e43fabf';
  const perPage = 15;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);

    if (!response.data.hits || response.data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
    } else {
      totalHits = response.data.totalHits;
      displayImages(response.data);
      if (gallery.querySelectorAll('.gallery-item').length < totalHits) {
        showLoadMoreButton();
        smoothScroll();
      } else {
        hideLoadMoreButton();
        smoothScroll();
        iziToast.info({
          message: `We're sorry, but you've reached the end of search results.`,
          position: 'topCenter',
        });
      }
    }
  } catch (error) {
    throw new Error('Failed to fetch images from the server');
  }
}

function displayImages(data) {
  const markup = data.hits
    .map(image => {
      return `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
        </a>
        <p><b>Likes: </b>${image.likes}</p>
        <p><b>Views: </b>${image.views}</p>
        <p><b>Comments: </b>${image.comments}</p>
        <p><b>Downloads: </b>${image.downloads}</p>
      </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (galleryItemHeight === 0) {
    const firstGalleryItem = gallery.querySelector('.gallery-item');
    if (firstGalleryItem) {
      const { height } = firstGalleryItem.getBoundingClientRect();
      galleryItemHeight = height;
    }
  }

  lightbox.refresh();
}

function smoothScroll() {
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}

loadMoreBtn.addEventListener('click', async () => {
  page++;
  showLoader();

  try {
    await searchImages();
  } catch (error) {
    iziToast.error({
      message: `An error occurred: ${error.message}`,
      position: 'topCenter',
    });
  } finally {
    hideLoader();
  }
});
