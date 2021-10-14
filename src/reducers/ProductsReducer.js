import {
  PRODUCTS_LOADING,
  PRODUCTS_LOADED,
  PRODUCTS_FAILED,

  SELECT_PRODUCT,
  PRODUCT_DETAIL_LOADING,
  PRODUCT_DETAIL_FAILED,

  SET_FAVORITE,
  REMOVE_FAVORITE,
} from '../actions/types';

const INITIAL_STATE = {
  productArray: [],
  productsLoading: false,

  product: null,
  productLoading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        productLoading: true,
      }

    case SELECT_PRODUCT:
      return {
        ...state,
        product: action.product,
        productLoading: false,
      }

    case PRODUCT_DETAIL_FAILED:
      return {
        ...state,
        product: null,
        productLoading: false,
      }

    case PRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: true
      }

    case PRODUCTS_LOADED:
      return {
        ...state,
        productArray: action.products,
        productsLoading: false
      }
    case PRODUCTS_FAILED:
      return {
        ...state,
        productArray: [],
        productsLoading: false
      }

    default:
      return state;
  }
}
