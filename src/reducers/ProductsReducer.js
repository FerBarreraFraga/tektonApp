import {
  LOGGED_OUT,

  PRODUCT_DETAIL_LOADING,
  SELECT_PRODUCT,
  PRODUCT_DETAIL_FAILED,
  PRODUCTS_LOADING,
  PRODUCTS_LOADED,
  PRODUCTS_FAILED,

  SWAG_PRODUCTS_LOADING,
  SWAG_PRODUCTS_LOADED,
  SWAG_PRODUCTS_FAILED,

  SAVE_CART,
  CART_FAILED,
  LOADING_CART,
  SAVE_TOTALS,
  LOADING_TOTALS,
  TOTALS_FAILED,

  LOADING_CART_QTY,
  SUCCESS_CART_QTY,
  FAILED_CART_QTY,
  FAILED_CART_QTY_NO_MODAL,

  ADD_TO_CART_FAILED,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_LOADING,
  RESET_CART_MODAL,
  RESET_PURCHASE_INFO,

  ADDRESS_LOADING,
  ADDRESS_SUCCESS,
  ADDRESS_FAILED,
  NEW_ADDRESS_SUCCESS,
  NEW_ADDRESS_FAILED,
  ADDRESS_DELETED_SUCCESS,

  SELECT_ADDRESS,
  SELECT_ADDRESS_FAILED,
  SELECT_BILLING_ADDRESS,
  ADDRESS_RESET_SELECTED,

  REGIONS_LOADING,
  REGIONS_SUCCESS,
  REGIONS_FAILED,

  ADDRESS_SUGGEST_SUCCESS,
  RESET_SUGGESTION_MODAL,
  RESET_ADDRESS_ERRORS,

  SELECT_PAYMENT_METHOD,
  LOADING_PAYMENT_METHOD,
  PAYMENT_METHOD_FAILED,

  CARD_LOADING,
  CARD_SUCCESS,
  CARD_FAILED,
  SELECT_CARD,
  SELECT_CARD_FAILED,
  NEW_CARD_SUCCESS,
  NEW_CARD_FAILED,

  LOADING_PURCHASE_INFO,
  PURCHASE_INFO_SUCCESS,
  PURCHASE_INFO_FAILED,
  PURCHASE_CONFIRMATION_LOADING,
  PURCHASE_CONFIRMATION_SUCCESS,
  PURCHASE_CONFIRMATION_FAILED,

  RESET_DEFAULT_MODAL,
  WALLET_SAVE,
  RESET_WALLET,
  PAYMENT_METHODS_SAVE,
  SAVE_STEP2,
  SAVE_STEP3,
  SAVE_STEP5,

  PRODUCTS_REGISTER_LOADED,
  RESET_REGISTER_DATA,
  RESET_STEP_4,

  SAVE_STEP4,
  LOADING_COUPON,
  COUPON_LOADED,
  COUPON_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  selectedProductLoading: false,
  selectedProduct: null,

  products: [],
  productsLoading: false,

  swagProducts: [],
  swagProductsLoading: false,

  cartLoading: false,
  cart: null,

  cartQtyLoading: false,
  cartQtySkuLoading: null,

  addCartLoading: false,
  addCartSuccess: false,

  totals: null,
  totalProducts: 0,
  products: [],
  totalsLoading: false,

  loadingPurchaseInfo: false,

  paymentMethods: [],
  loadingAddress: false,
  addressCreatedSuccess: false,
  addressSelectedAddress: false,
  billingSelectedAddress: false,
  addresses: [],

  selectedAddress: null,
  selectedAddressFail: false,
  selectedBillingAddress: null,
  billingCountry: null,

  loadingRegions: false,
  regions: [],

  suggestion: null,
  suggestionModal: false,
  showAddressSure: false,
  addressConfirmation: false,

  shippingMethod: null,
  paymentMethodType: null,
  loadingPaymentMethod: false,

  cardCreatedSuccess: false,
  loadingCard: false,
  cards: [],
  cardConfirmation: false,
  selectedCard: null,
  selectedCardFail: false,

  loadConfirmation: false,
  confirmationErrors: [],
  confirmationSuccess: false,
  confirmationFailed: false,

  modalDefault: false,
  walletInfo: null,

  // Errors
  newAddressError: null,
  cityError: null,
  firstNameError: null,
  lastNameError: null,
  postCodeError: null,
  regionError: null,
  showAddressCorrect: null,

  addressError: null,
  billingError: null,
  paymentCardError: null,
  walletTypeError: null,
  walletPasswordError: null,
  purchaseCardError: null,

  payex: [],
  purchaseError: null,

  loadingCoupon: false,
  couponError: null,

  sezzleURL: '',
  sezzleType: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        selectedProductLoading: true,
      }

    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product,
        selectedProductLoading: false,
      }

    case PRODUCT_DETAIL_FAILED:
      return {
        ...state,
        selectedProduct: null,
        selectedProductLoading: false,
      }

    case PRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: true
      }

    case PRODUCTS_LOADED:
      return {
        ...state,
        products: action.products,
        productsLoading: false
      }
    case PRODUCTS_FAILED:
      return {
        ...state,
        products: [],
        productsLoading: false
      }

    case SWAG_PRODUCTS_LOADING:
      return {
        ...state,
        swagProductsLoading: true
      }

    case SWAG_PRODUCTS_LOADED:
      return {
        ...state,
        swagProducts: action.products,
        swagProductsLoading: false
      }
    case PRODUCTS_FAILED:
      return {
        ...state,
        swagProducts: [],
        swagProductsLoading: false
      }

    case PRODUCTS_REGISTER_LOADED:
      return {
        ...state,
        productsLoading: false
      }

    case RESET_REGISTER_DATA:
      return {
        ...state,
        showAddressCorrect: null,
      }

    case RESET_STEP_4:
      return {
        ...state,
        showAddressCorrect: null,
        walletTypeError: null,
        walletPasswordError: null,
      }

    case LOADING_CART:
      return {
        ...state,
        cartLoading: true,
        modalDefault: false
      }

    case CART_FAILED:
      return {
        ...state,
        modalDefault: true
      }

    case LOADING_CART_QTY:
      return {
        ...state,
        cartQtyLoading: true,
        cartQtySkuLoading: action.sku,
        modalDefault: false
      }

    case SUCCESS_CART_QTY:
      return {
        ...state,
        cartQtyLoading: false,
        cartQtySkuLoading: null
      }

    case FAILED_CART_QTY:
      return {
        ...state,
        cartQtyLoading: false,
        cartQtySkuLoading: null,
        modalDefault: true
      }

    case FAILED_CART_QTY_NO_MODAL:
      return {
        ...state,
        cartQtyLoading: false,
        cartQtySkuLoading: null,
      }

    case ADD_TO_CART_LOADING:
      return {
        ...state,
        addCartLoading: true,
        addCartSuccess: false,
        modalDefault: false
      }

    case ADD_TO_CART_FAILED:
      return {
        ...state,
        addCartLoading: false,
        addCartSuccess: false,
        modalDefault: true
      }

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addCartLoading: false,
        addCartSuccess: true
      }
    case RESET_CART_MODAL:
      return {
        ...state,
        addCartLoading: false,
        addCartSuccess: false
      }

    case SAVE_CART:
      return {
        ...state,
        cart: action.cart.cart_id,
        cartLoading: false
      }

    case LOADING_TOTALS:
      return {
        ...state,
        totalsLoading: true,
        loadConfirmation: false,
        confirmationSuccess: false,
      }

    case TOTALS_FAILED:
      return {
        ...state,
        totalsLoading: false,
      }

    case SAVE_TOTALS:
      let sum = 0;

      if (action.totals && action.totals.attributes) {
        action.totals.attributes.products.map((item) => {
          sum = sum + item.qty
        });
      }

      if (action.totals) {
        return {
          ...state,
          totals: action.totals && action.totals,
          totalProducts: sum,
          totalsLoading: false,
          shippingMethod: (action.totals && action.totals.attributes && action.totals.attributes.shipping_method) && action.totals.attributes.shipping_method
        }
      } else {
        return {
          ...state,
          totalProducts: sum,
          totalsLoading: false
        }
      }

    case ADDRESS_LOADING:
      return {
        ...state,
        loadingAddress: true,
        addressCreatedSuccess: false,
        addressSelectedAddress: false,
        billingSelectedAddress: false,
        suggestionModal: false,
        showAddressSure: false,
        newAddressError: null,
        cityError: null,
        firstNameError: null,
        lastNameError: null,
        postCodeError: null,
        regionError: null,
        selectedAddressFail: false,
        walletPasswordError: null,
      }
    case ADDRESS_SUCCESS:
      return {
        ...state,
        loadingAddress: false,
        addresses: action.addresses,
        addressConfirmation: false,
        suggestionModal: false,
      }
    case ADDRESS_FAILED:
      return {
        ...state,
        loadingAddress: false,
        addressConfirmation: false,
        suggestionModal: false,
        addressSelectedAddress: false,
        billingSelectedAddress: false
      }

    case NEW_ADDRESS_SUCCESS:
      return {
        ...state,
        addressCreatedSuccess: true,
        loadingAddress: false
      }

    case SAVE_STEP2:
      return {
        ...state,
        suggestionModal: false
      }
    case SAVE_STEP3:
      return {
        ...state,
        loadingAddress: false,
        walletPasswordError: null
      }

    case SAVE_STEP5:
      return {
        ...state,
        sezzleURL: action.response && action.response.redirect_url ? action.response.redirect_url : '',
        sezzleType: 2
      }

    case NEW_ADDRESS_FAILED:
      return {
        ...state,
        loadingAddress: false,
        suggestionModal: action.data.showModal ? action.data.showModal : null,
        showAddressSure: true,
        newAddressError: action.data.addressError && action.data.addressError,

        cityError: action.data.cityError && action.data.cityError,
        firstNameError: action.data.firstNameError && action.data.firstNameError,
        lastNameError: action.data.lastNameError && action.data.lastNameError,
        postCodeError: action.data.postCodeError && action.data.postCodeError,
        regionError: action.data.regionError && action.data.regionError,
        walletPasswordError: action.data.walletPasswordError && action.data.walletPasswordError,

        showAddressCorrect: action.data.showAddressCorrect && action.data.showAddressCorrect,
      }

    case SELECT_ADDRESS:
      return {
        ...state,
        loadingAddress: false,
        selectedAddress: action.data.selectedAddress,
        shippingMethod: action.data.purchaseInfo.shipping_method,
        cart: action.data.purchaseInfo.cart_id,
        addressSelectedAddress: true
      }
    case SELECT_ADDRESS_FAILED:
      return {
        ...state,
        selectedAddressFail: true
      }

    case SELECT_BILLING_ADDRESS:
      return {
        ...state,
        cart: action.data.purchaseInfo && action.data.purchaseInfo.cart_id,
        selectedBillingAddress: action.data.selectedAddress,
        billingCountry: action.data.country,
        loadingAddress: false,
        billingSelectedAddress: true,
      }

    case ADDRESS_RESET_SELECTED:
      return {
        ...state,
        selectedAddress: null
      }

    case REGIONS_LOADING:
      return {
        ...state,
        loadingRegions: true
      }
    case REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.regions,
        loadingRegions: false
      }
    case REGIONS_FAILED:
      return {
        ...state,
        loadingRegions: false,
        suggestionModal: true,
      }

    case ADDRESS_SUGGEST_SUCCESS:
      return {
        ...state,
        suggestion: action.suggestion && action.suggestion,
        loadingAddress: false,
        suggestionModal: true,
        addressConfirmation: true,
      }

    case RESET_ADDRESS_ERRORS:
      return {
        ...state,
        newAddressError: null,
        cityError: null,
        firstNameError: null,
        lastNameError: null,
        postCodeError: null,
        regionError: null,
        showAddressCorrect: null
      }

    case RESET_SUGGESTION_MODAL:
      return {
        ...state,
        suggestionModal: false,
      }

    case ADDRESS_DELETED_SUCCESS:
      return {
        ...state,
        addresses: action.addresses,
        loadingAddress: false
      }

    case SELECT_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethodType: action.data.paymentMethodType,
        loadingPaymentMethod: false
      }
    case LOADING_PAYMENT_METHOD:
      return {
        ...state,
        loadingPaymentMethod: true
      }
    case PAYMENT_METHOD_FAILED:
      return {
        ...state,
        loadingPaymentMethod: false
      }

    case CARD_LOADING:
      return {
        ...state,
        cardCreatedSuccess: false,
        loadingCard: true,
        selectCardFail: false,
        selectedCardFail: false
      }
    case CARD_SUCCESS:
      return {
        ...state,
        loadingCard: false,
        cards: action.cards,
        cardConfirmation: false,
      }
    case CARD_FAILED:
      return {
        ...state,
        loadingCard: false,
        cardConfirmation: false,
      }
    case SELECT_CARD:
      return {
        ...state,
        cart: action.data.purchaseInfo.cart_id,
        selectedCard: action.data.selectedCard,
        loadingCard: false
      }
    case SELECT_CARD_FAILED:
      return {
        ...state,
        selectedCardFail: true
      }
    case NEW_CARD_SUCCESS:
      return {
        ...state,
        cardCreatedSuccess: true,
        loadingCard: false
      }
    case NEW_CARD_FAILED:
      return {
        ...state,
        loadingCard: false,
      }

    case LOADING_PURCHASE_INFO:
      return {
        ...state,
        loadingPurchaseInfo: true,
        modalDefault: false,
        confirmationFailed: false
      }
    case PURCHASE_INFO_SUCCESS:
      const { data } = action;
      isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
      }

      let addressData = {}
      let cardData = {}
      if (!isEmpty(data.shipping_address)) {
        addressData = {
          id: data.shipping_address.id,
          "attributes": {
            ...data.shipping_address,
          }
        }
      }
      if (!isEmpty(data.credit_card.card)) {
        cardData = {
          id: data.credit_card.card.id,
          "attributes": data.credit_card.card
        }
      }

      return {
        ...state,
        loadingPurchaseInfo: false,
        selectedCard: !isEmpty(data.credit_card.card) && cardData,
        selectedAddress: !isEmpty(data.shipping_address) && addressData,
        shippingMethod: !isEmpty(data.shipping_method) && data.shipping_method,
        cart: data.cart_id && data.cart_id,
        paymentMethodType: !isEmpty(data.credit_card.card) && 3
      }
    case PURCHASE_INFO_FAILED:
      return {
        ...state,
        loadingPurchaseInfo: false,
        modalDefault: true
      }

    case RESET_WALLET:
      return {
        ...state,
        walletTypeError: null,
        walletPasswordError: null,
      }

    case PURCHASE_CONFIRMATION_LOADING:
      return {
        ...state,
        loadConfirmation: true,
        confirmationErrors: [],
        confirmationSuccess: false,
        confirmationFailed: false,
        modalDefault: false,

        addressError: null,
        billingError: null,
        paymentCardError: null,
        walletTypeError: null,
        walletPasswordError: null,
        purchaseCardError: null,
        purchaseError: false
      }
    case PURCHASE_CONFIRMATION_SUCCESS:
      return {
        ...state,
        loadConfirmation: false,
        confirmationSuccess: true,
        confirmationFailed: false,
        purchaseError: false,
        selectedBillingAddress: null,
        selectedAddress: null,
        sezzleURL: action.response && action.response.redirect_url ? action.response.redirect_url : '',
        sezzleType: 1
      }
    case PURCHASE_CONFIRMATION_FAILED:
      return {
        ...state,
        loadConfirmation: false,
        confirmationErrors: [],
        confirmationFailed: true,
        confirmationSuccess: false,

        addressError: action.data.addressError ? action.data.addressError : null,
        billingError: action.data.billingError ? action.data.billingError : null,
        paymentCardError: action.data.paymentCardError ? action.data.paymentCardError : null,
        walletTypeError: action.data.walletTypeError ? action.data.walletTypeError : null,
        walletPasswordError: action.data.walletPasswordError ? action.data.walletPasswordError : null,
        purchaseCardError: action.data.purchaseCardError ? action.data.purchaseCardError : null,
        payex: action.data.payex ? action.data.payex : [],
        cart: action.data.cart && action.data.cart,

        modalDefault: action.data.showModal ? action.data.showModal : false,
        purchaseError: action.data.status
      }

    case RESET_PURCHASE_INFO: {
      return {
        ...state,

        loadConfirmation: false,
        confirmationErrors: [],
        confirmationFailed: false,
        confirmationSuccess: false,
        addressError: null,
        billingError: null,
        paymentCardError: null,
        walletTypeError: null,
        walletPasswordError: null,
        purchaseCardError: null,
        modalDefault: false,
        payex: [],
        purchaseError: null
      }
    }

    case RESET_DEFAULT_MODAL:
      return {
        ...state,
        modalDefault: false
      }
    case WALLET_SAVE:
      return {
        ...state,
        walletInfo: action.data
      }

    case PAYMENT_METHODS_SAVE:
      return {
        ...state,
        paymentMethods: action.data
      }
    case SAVE_STEP4:
      return {
        ...state,
        walletPasswordError: null,
      }

    case LOADING_COUPON:
      return {
        ...state,
        loadingCoupon: true,
        couponError: null
      }
    case COUPON_LOADED:
      return {
        ...state,
        loadingCoupon: false,
        couponError: null
      }
    case COUPON_FAILED:
      return {
        ...state,
        loadingCoupon: false,
        couponError: action.data.couponError ? action.data.couponError : null,
      }

    case LOGGED_OUT:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}
