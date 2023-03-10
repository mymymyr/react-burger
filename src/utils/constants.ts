const MODAL_ROOT = document.getElementById('react-modals');

const BURGER_COMPOSITION = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main'
};

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const BEARER = 'Bearer ';

const BASE_PATH = '/';
const ORDER_FEED_PATH = '/feed';
const ORDER_HISTORY_PATH = '/profile/orders';
const PROFILE_PATH = '/profile';

const MAX_COUNT = 5;
const STATUS_DONE = 'done';
const STATUS_PENDING = 'pending';
const STATUS_CREATED = 'created';

export { MODAL_ROOT, BURGER_COMPOSITION, ACCESS_TOKEN, REFRESH_TOKEN, BEARER, BASE_PATH, ORDER_FEED_PATH, ORDER_HISTORY_PATH, PROFILE_PATH, MAX_COUNT, STATUS_DONE, STATUS_PENDING, STATUS_CREATED };
