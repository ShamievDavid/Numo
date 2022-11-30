import {BASE_URL, ENDPOINTS} from '../config/api';

export const getJokeUrl = () => `${BASE_URL}/${ENDPOINTS.LOAD_ANY_JOKE}`;
