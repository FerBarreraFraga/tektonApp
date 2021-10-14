import * as api from '../api/api';
import Toast from 'react-native-toast-message';

import {
  PRODUCTS_LOADING,
  PRODUCTS_LOADED,
  PRODUCTS_FAILED,

  SELECT_PRODUCT,
  PRODUCT_DETAIL_LOADING,
  PRODUCT_DETAIL_FAILED,

  SET_FAVORITE,
  REMOVE_FAVORITE,
} from './types';


export function selectProduct(product) {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAIL_LOADING });

    let response = await api.getProductDetail(product.id);
    if (response.status == 200) {
      dispatch({ type: SELECT_PRODUCT, product: response.data });
    } else {
      dispatch({ type: PRODUCT_DETAIL_FAILED });
    }
  };
}

export function setFavorite(product, value) {
  return async (dispatch) => {
    await api.setFavorite(product.id, value);

    let response = await api.getProducts();
    if (response.status == 200) {
      dispatch({ type: PRODUCTS_LOADED, products: response.data });
    } else {
      dispatch({ type: PRODUCTS_FAILED });
    }
  };
}

export function getProducts() {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });
    let response = await api.getProducts();
    if (response.status == 200) {
      dispatch({ type: PRODUCTS_LOADED, products: response.data });
    } else {
      dispatch({ type: PRODUCTS_FAILED });
    }
  };
}
