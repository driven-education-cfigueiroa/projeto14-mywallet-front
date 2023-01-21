import axios from 'axios';

const BASE_URL = 'https://mock-api.driven.com.br/api/v4/driven-plus';
const AUTHORIZATION_HEADER = 'Authorization';

const ENDPOINTS = {
  SIGN_UP: '/auth/sign-up',
  LOGIN: '/auth/login',
  MEMBERSHIPS: '/subscriptions/memberships',
  SUBSCRIPTIONS: '/subscriptions',
  USERS: '/users',
};

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
});

const HEADERS = (token) => ({
  headers: {
    [AUTHORIZATION_HEADER]: `Bearer ${token}`,
  },
});

const drivenPlus = {
  fazerCadastro: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SIGN_UP, obj);
  },
  fazerLogin: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.LOGIN, obj);
  },
  listarPlanos: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.MEMBERSHIPS, {
      ...HEADERS(token),
    });
  },
  listarPlano: (id, token) => {
    return AXIOS_INSTANCE.get(`${ENDPOINTS.MEMBERSHIPS}/${id}`, {
      ...HEADERS(token),
    });
  },
  assinarPlano: (obj, token) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SUBSCRIPTIONS, obj, {
      ...HEADERS(token),
    });
  },
  alterarPlano: (obj, token) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SUBSCRIPTIONS, obj, {
      ...HEADERS(token),
    });
  },
  cancelarPlano: (token) => {
    return AXIOS_INSTANCE.delete(ENDPOINTS.SUBSCRIPTIONS, {
      ...HEADERS(token),
    });
  },
  alterarUsuario: (obj, token) => {
    return AXIOS_INSTANCE.put(ENDPOINTS.USERS, obj, {
      ...HEADERS(token),
    });
  },
};

export default drivenPlus;
