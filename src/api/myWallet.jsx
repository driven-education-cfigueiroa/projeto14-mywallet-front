import axios from 'axios';

const BASE_URL = 'https://mywallet-api-0tng.onrender.com';
const AUTHORIZATION_HEADER = 'Authorization';

const ENDPOINTS = {
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  ENTRIES: '/entries'
};

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
});

const HEADERS = (token) => ({
  headers: {
    [AUTHORIZATION_HEADER]: `Bearer ${token}`,
  },
});

const myWallet = {
  fazerCadastro: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SIGN_UP, obj);
  },
  fazerLogin: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SIGN_IN, obj);
  },
  inserirEntrada: (obj, token) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.ENTRIES, obj, {
      ...HEADERS(token),
    });
  },
  listarEntradas: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.ENTRIES, {
      ...HEADERS(token),
    });
  }
};

export default myWallet;
