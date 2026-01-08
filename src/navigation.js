let maxPage;
let page = 1;
let infiniteScroll;

// ================= EVENTOS =================

searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
  history.back();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

// ================= NAVIGATOR =================

function navigator() {
  console.log({ location });

  if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }

  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener('scroll', infiniteScroll, { passive: false });
  }
}

// ================= PAGES =================

function homePage() {
  console.log('Home');

  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow');
  headerTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  likedMovieListContainer.classList.remove('inactive');

  getCategoriesPreview();
  getTrendingMoviesPreview();
  getLikedMovies();
}

// ---------- CATEGORIES ----------
function categoriesPage() {
  console.log('Categories');

  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  likedMovieListContainer.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  headerCategoryTitle.innerHTML = categoryName;

  getMovieByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

// ---------- SEARCH ----------
function searchPage() {
  console.log('Search');

  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  likedMovieListContainer.classList.add('inactive');

  const [_, query] = location.hash.split('=');

  getMoviesBySearch(query);

  infiniteScroll = getPaginatedMoviesBySearch(query);
}

// ---------- TRENDS ----------
function trendsPage() {
  console.log('TRENDS');

  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  likedMovieListContainer.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';

  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;
}

// ---------- MOVIE DETAILS ----------
function movieDetailsPage() {
  console.log('Movie');

  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow');
  headerTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  likedMovieListContainer.classList.add('inactive');

  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
}