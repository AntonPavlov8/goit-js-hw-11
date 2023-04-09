import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import search from './api';

const form = document.querySelector('.search-form');
const list = document.querySelector('.photoList');
const searchBt = document.querySelector('.searchBt');
const loadMoreBt = document.querySelector('.loadMoreBtContainer');

let page = 1;
const inputEl = form.elements[0];
let userInp;
inputEl.addEventListener('input', e => {
  if (e.target.value.trim()) {
    searchBt.disabled = false;
    searchBt.classList.add('active');
  }
  if (!e.target.value.trim()) {
    searchBt.disabled = true;
    searchBt.classList.remove('active');
  }
});
form.addEventListener('submit', async e => {
  e.preventDefault();
  userInp = e.target[0].value.trim();
  let data = await search(userInp, (page = 1));

  data.total === 0
    ? alert(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    : ((list.innerHTML = ''), render(data.hits, data.total));
});

function render(data, total) {
  const fragment = document.createDocumentFragment();
  data.forEach(element => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="photo-card">
    <a href=${element.largeImageURL}>
      <img src="${element.largeImageURL}" alt="" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <b>${element.likes}</b>
        </p>
        <p class="info-item">
          <b>Views</b>
          <b>${element.views}</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <b>${element.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <b>${element.downloads}</b>
        </p>
      </div>
    </div>`;
    fragment.append(li);
  });
  list.append(fragment);

  const lightbox = new SimpleLightbox('.photoList a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  if (total > page * 20) {
    loadMoreBt.style.display = 'flex';
  } else {
    loadMoreBt.style.display = 'none';
  }
}
const loadMoreFn = async function () {
  page++;
  let data = await search(userInp, page);
  render(data.hits, data.total);
};
loadMoreBt.addEventListener('click', loadMoreFn);
