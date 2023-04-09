import search from './api';

const form = document.querySelector('.search-form');
const list = document.querySelector('.photoList');
const loadMoreBt = document.querySelector('.loadMoreBt');

let page = 1;
let userInp;
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
  <img src="${element.largeImageURL}" alt="" loading="lazy" />
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
  if (total > page * 20) {
    loadMoreBt.style.display = 'block';
  }
}
const loadMoreFn = async function () {
  page++;
  let data = await search(userInp, page);
  render(data.hits, data.total);
};
loadMoreBt.addEventListener('click', loadMoreFn);
