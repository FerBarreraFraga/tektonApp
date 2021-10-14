// declarar todas las llamadas de la api
import { Http, HttpGet } from './https';
import getEnvVars from '../../environment';
const {
    API_URL,
} = getEnvVars();

export const login = (username, password, code) => (
    Http(
        url = `${API_URL}/login`,
        method = 'post',
        data = { username, password, code },
    )
);

export const getProducts = () => (
    HttpGet(
        url = `${API_URL}/products`,
        method = 'get',
    )
);

export const getProductDetail = (id) => (
    HttpGet(
        url = `${API_URL}/products/${id}`,
        method = 'get',
    )
);

export const setFavorite = (id, value) => (
    Http(
        url = `${API_URL}/products/${id}`,
        method = 'put',
        data = { favorite: value },
    )
);