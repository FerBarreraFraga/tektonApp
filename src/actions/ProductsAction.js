import * as api from '../api/api';
import Toast from 'react-native-toast-message';

import {
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
  SELECT_ADDRESS_FAILED,

  SELECT_ADDRESS,
  SELECT_BILLING_ADDRESS,
  ADDRESS_RESET_SELECTED,

  REGIONS_LOADING,
  REGIONS_SUCCESS,
  REGIONS_FAILED,
  SAVE_COUNTRIES,

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

  PRODUCTS_REGISTER_LOADED,
  UPD_REGISTER_QTY,
  UPD_REGISTER_AUTO_QTY,

  LOADING_PACKAGES,
  SAVE_PACKAGES,
  PACKAGES_FAILED,

  LOADING_STEP_1,
  SAVE_STEP1,
  FAILED_STEP1,

  LOADING_STEP_2,
  SAVE_STEP2,
  FAILED_STEP2,

  LOADING_STEP_3,
  SAVE_STEP3,
  FAILED_STEP3,

  LOADING_STEP_4,
  SAVE_STEP4,
  FAILED_STEP4,

  LOADING_STEP_5,
  SAVE_STEP5,
  FAILED_STEP5,

  LOADING_MOBILE_MESSAGE,
  FAILED_MOBILE_MESSAGE,
  SAVE_MOBILE_TOKEN,
  RESET_MOBILE_MESSAGE,

  LOADING_MOBILE_VALIDATION,
  FAILED_MOBILE_VALIDATION,
  MOBILE_VALIDATION_SUCCESS,

  RESET_STEP_4,
  RESET_REGISTER_DATA,

  RESET_REGISTER_POSITION,
  SAVE_REGISTER_POSITION,
  RESET_MOBILE_VALIDATION,

  LOADING_ESTIMATED,
  ESTIMATED_LOADED,
  ESTIMATED_FAILED,

  LOADING_COUPON,
  COUPON_LOADED,
  COUPON_FAILED
} from './types';


export function selectProduct(name) {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAIL_LOADING });

    let response = await api.getProductDetail(name);
    if (response.status == 200) {
      dispatch({ type: SELECT_PRODUCT, product: response.data.data });
    } else {
      dispatch({ type: PRODUCT_DETAIL_FAILED });
    }
  };
}

export function getProducts(country, isRegister) {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });
    let register = {}
    if (!isRegister) {
      response = await api.getProducts(country);
      if (response.status == 200) {
        dispatch({ type: PRODUCTS_LOADED, products: response.data.data });
      } else {
        dispatch({ type: PRODUCTS_FAILED });
      }
    } else {
      response = await api.getProductsRegister(country);
      if (response.status == 200) {
        let data = {
          productsRegister: [...response.data.data]
        }

        let responseVFILL = await api.getProductsVFILL(country);
        if (responseVFILL.status == 200) {
          data.autoFillProducts = responseVFILL.data.data
        }

        dispatch({ type: PRODUCTS_REGISTER_LOADED, data });
      } else {
        dispatch({ type: PRODUCTS_FAILED });
      }
    }
  };
}

export function getSwagProducts(country) {
  return async (dispatch) => {
    dispatch({ type: SWAG_PRODUCTS_LOADING });
    response = await api.getProductsByCategory('swag',country);

    if (response.status == 200) {
      dispatch({ type: SWAG_PRODUCTS_LOADED, products: response.data.data });
    } else {
      dispatch({ type: SWAG_PRODUCTS_FAILED });
    }
  };
}

export function getAddresses(id) {
  return async (dispatch) => {
    dispatch({ type: ADDRESS_LOADING });
    let response = await api.getAddresses(id);

    if (response.status == 200) {
      dispatch({ type: ADDRESS_SUCCESS, addresses: response.data.data });
    } else {
      dispatch({ type: ADDRESS_FAILED });
    }
  };
}

export function createAddress(address, id, i18n) {
  return async (dispatch) => {
    dispatch({ type: ADDRESS_LOADING });
    let response = await api.createAddress(address, id);
    let status = response.status;

    if (status == 200) {
      Toast.show({
        text2: i18n.toasts.addressAddedSuccessfull,
        type: 'success',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: NEW_ADDRESS_SUCCESS });
    } else if (status == 422) {
      const { fields } = response.data.errors
      let data = {}
      data.showModal = false

      if (fields["address"]) data.addressError = fields["address"];
      if (fields["city"]) data.cityError = fields["city"];
      if (fields["first_name"]) data.firstNameError = fields["first_name"];
      if (fields["last_name"]) data.lastNameError = fields["last_name"];
      if (fields["postcode"]) data.postCodeError = fields["postcode"];
      if (fields["region_id"]) data.regionError = fields["region_id"];

      if (fields["address"] && address.address) {
        data.showAddressCorrect = true
      }
      if (fields.suggestion && fields.suggestion.length > 0) {
        let responseSuggestion = await api.getAddressSuggestion(address);

        if (responseSuggestion.status == 200) {
          dispatch({ type: ADDRESS_SUGGEST_SUCCESS, suggestion: responseSuggestion.data.response });
        } else {
          data.showModal = true
          dispatch({ type: NEW_ADDRESS_FAILED, data });
        }
      } else {
        dispatch({ type: NEW_ADDRESS_FAILED, data });
      }

    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: NEW_ADDRESS_FAILED });
    }
  };
}

export function editAddress(address, id, addressId, i18n) {
  return async (dispatch) => {
    dispatch({ type: ADDRESS_LOADING });
    let response = await api.editAddress(address, id, addressId);
    let status = response.status;

    if (response.status == 200) {
      Toast.show({
        text2: i18n.toasts.addressEditedSuccessfull,
        type: 'success',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: NEW_ADDRESS_SUCCESS });
    } else if (status == 422) {
      const { fields } = response.data.errors
      let data = {}

      if (fields["address"]) data.addressError = fields["address"];
      if (fields["city"]) data.cityError = fields["city"];
      if (fields["first_name"]) data.firstNameError = fields["first_name"];
      if (fields["last_name"]) data.lastNameError = fields["last_name"];
      if (fields["postcode"]) data.postCodeError = fields["postcode"];
      if (fields["region_id"]) data.regionError = fields["region_id"];

      if (fields["address"] && address.address) {
        data.showAddressCorrect = true
      }
      if (fields.suggestion && fields.suggestion.length > 0) {
        let responseSuggestion = await api.getAddressSuggestion(address);

        if (responseSuggestion.status == 200) {
          dispatch({ type: ADDRESS_SUGGEST_SUCCESS, suggestion: responseSuggestion.data.response });
        } else {
          dispatch({ type: NEW_ADDRESS_FAILED, data });
        }
      } else {
        dispatch({ type: NEW_ADDRESS_FAILED, data });
      }
    } else {
      dispatch({ type: NEW_ADDRESS_FAILED });
    }
  };
}

export function deleteAddress(userId, addressId, addresses, index, resetSelected, i18n) {
  return async (dispatch) => {
    dispatch({ type: ADDRESS_LOADING });
    let response = await api.deleteAddress(userId, addressId);

    if (response.status == 200) {
      addresses.splice(index, 1);
      Toast.show({
        text2: i18n.toasts.addressDeletedSuccessfull,
        type: 'success',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: ADDRESS_DELETED_SUCCESS, addresses: addresses });

      if (resetSelected) {
        dispatch({ type: ADDRESS_RESET_SELECTED });
      }
    } else {
      dispatch({ type: ADDRESS_FAILED });
    }
  };
}

export function selectAddress(dataAddress, item, type, paymentType, i18n) {
  return async (dispatch) => {
    dispatch({ type: ADDRESS_LOADING });

    if (type == 1) {
      let response = await api.setPurchaseInfo(dataAddress);
      let status = response.status;
      if (response.status == 200) {
        let data = {
          purchaseInfo: response.data.response,
          selectedAddress: item
        }
        dispatch({ type: SELECT_ADDRESS, data });
      } else if (status == 404 || status == 403) {
        Toast.show({
          text2: i18n.toasts.defaultError,
          type: 'error',
          topOffset: 65,
          visibilityTime: 2500,
        });
        dispatch({ type: SELECT_ADDRESS_FAILED });
      } else {
        Toast.show({
          text2: i18n.toasts.defaultError,
          type: 'error',
          topOffset: 65,
          visibilityTime: 2500,
        });
        dispatch({ type: SELECT_ADDRESS_FAILED });
      }
    } else {
      let data = {
        selectedAddress: item
      }
      let responseCountry = await api.getCountry(item.attributes.country.code);

      if (responseCountry.status == 200) {
        data.country = responseCountry.data.data

        if (paymentType == 1 || paymentType == 2 || paymentType == 4) {
          let response = await api.setPurchaseInfo(dataAddress);
          let status = response.status;

          if (status == 200) {
            data.purchaseInfo = response.data.response;
            dispatch({ type: SELECT_BILLING_ADDRESS, data });
          } else if (status == 404 || status == 403) {
            Toast.show({
              text2: i18n.toasts.defaultError,
              type: 'error',
              topOffset: 65,
              visibilityTime: 2500,
            });
            dispatch({ type: SELECT_ADDRESS_FAILED });
          } else {
            Toast.show({
              text2: i18n.toasts.defaultError,
              type: 'error',
              topOffset: 65,
              visibilityTime: 2500,
            });
            dispatch({ type: SELECT_ADDRESS_FAILED });
          }
        } else {
          dispatch({ type: SELECT_BILLING_ADDRESS, data });
        }
      }
    }
  };
}

export function getCountries(country) {
  return async (dispatch) => {
    let response = await api.getCountries(country);
    if (response.status == 200) {
      dispatch({ type: SAVE_COUNTRIES, countries: response.data.data });
    }
  };
}

export function getAddressRegions(country) {
  return async (dispatch) => {
    dispatch({ type: REGIONS_LOADING });
    let response = await api.getAddressRegions(country);

    if (response.status == 200) {
      dispatch({ type: REGIONS_SUCCESS, regions: response.data.data });
    } else {
      dispatch({ type: REGIONS_FAILED });
    }
  };
}

export function resetAddressErrors() {
  return {
    type: RESET_ADDRESS_ERRORS,
  };
}

export function resetSuggestionModal(item) {
  return {
    type: RESET_SUGGESTION_MODAL,
  };
}

export function resetDefaultModal() {
  return {
    type: RESET_DEFAULT_MODAL,
  };
}

export function setPaymentMethod(type, purchaseInfo, valid, cartId, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_TOTALS });
    dispatch({ type: LOADING_PAYMENT_METHOD });

    let data = {
      paymentMethodType: type
    }

    if (valid) {
      let response = await api.setPurchaseInfo(purchaseInfo);

      if (response.status == 200) {
        //console.log("setPaymentMethod ACTION ENETERED******")
        let responseTotals = await api.getCartTotals(cartId);

        if (responseTotals && responseTotals.data && responseTotals.status == 200) {
          const totals = responseTotals.data.data;
          dispatch({ type: SELECT_PAYMENT_METHOD, data });
          dispatch({ type: SAVE_TOTALS, totals: totals });
        } else if (responseTotals.status == 404) {
          dispatch({ type: TOTALS_FAILED });
          dispatch({ type: PAYMENT_METHOD_FAILED });
        }
      } else {
        Toast.show({
          text2: i18n.toasts.defaultError,
          type: 'error',
          topOffset: 65,
          visibilityTime: 2500,
        });
        dispatch({ type: PURCHASE_CONFIRMATION_FAILED, data: { status: 404 } })
        dispatch({ type: PAYMENT_METHOD_FAILED });
        dispatch({ type: TOTALS_FAILED });
      }
    } else {
      dispatch({ type: SELECT_PAYMENT_METHOD, data });
      dispatch({ type: TOTALS_FAILED });
    }
  }
}

export function getCards(id) {
  return async (dispatch) => {
    dispatch({ type: CARD_LOADING });
    let response = await api.getCards(id);

    if (response.status == 200) {
      dispatch({ type: CARD_SUCCESS, cards: response.data.data });
    } else {
      dispatch({ type: CARD_FAILED });
    }
  };
}

export function selectCard(data, item, i18n) {
  return async (dispatch) => {
    dispatch({ type: CARD_LOADING });
    let response = await api.setPurchaseInfo(data);

    if (response.status == 200) {
      let data = {
        purchaseInfo: response.data.response,
        selectedCard: item
      }
      dispatch({ type: SELECT_CARD, data });
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: SELECT_CARD_FAILED });
    }
  };
}

export function saveCard(cardId, addressId, userId, i18n) {
  return async (dispatch) => {
    dispatch({ type: CARD_LOADING });
    let data = {
      token: cardId,
      address_id: addressId,
      is_default: false
    }

    let response = await api.createCard(data, userId);
    if (response.status == 200) {
      Toast.show({
        text2: i18n.toasts.cardAddedSuccessfull,
        type: 'success',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: NEW_CARD_SUCCESS });
    } else {
      dispatch({ type: NEW_CARD_FAILED });
    }
  };
}

export function createPurchase(data, i18n) {
  return async (dispatch) => {
    let myData = data
    dispatch({ type: PURCHASE_CONFIRMATION_LOADING });
    let response = await api.purchaseConfirmation(data);
    let status = response.status;

    if (status == 200) {
      dispatch({ type: PURCHASE_CONFIRMATION_SUCCESS, response: response.data.response });
    } else if (status == 403 || status == 404) {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: PURCHASE_CONFIRMATION_FAILED, data: { status: status } });
    } else if (status == 422) {
      const { errors } = response.data;
      if (errors.message) {
        // Send to store
        let data = { status: status }
        dispatch({ type: PURCHASE_CONFIRMATION_FAILED, data: data });
      } else if (errors.fields) {
        const { fields } = response.data.errors;
        let data = {}
        //console.log("errors.field", fields);
        if (fields["shipping.shipping_address.address_id"]) data.addressError = fields["shipping.shipping_address.address_id"];
        if (fields["payment.billing.address_id"]) data.billingError = fields['payment.billing.address_id'];
        if (fields['payment.payment_method.card_id']) data.paymentCardError = fields['payment.payment_method.card_id'];
        if (fields['payment.payment_method.wallet_type']) data.walletTypeError = fields['payment.payment_method.wallet_type'];
        if (fields['payment.payment_method.wallet_password']) data.walletPasswordError = fields['payment.payment_method.wallet_password'];
        if (fields['cart_id'] && typeof (fields['cart_id']) == 'object') data.purchaseCardError = fields['cart_id'];
        if (typeof (fields.cart_id) !== 'object') {
          data.cart = fields.cart_id;
        } else {
          data.cart = myData.cart_id;
        }
        if (fields.payex) data.payex = fields.payex;
        data.showModal = data.payex ? true : false;
        data.status = status;

        let responseTotals = await api.getCartTotals(myData.cart_id);

        if (responseTotals && responseTotals.data && responseTotals.status == 200) {
          const totals = responseTotals.data.data;
          dispatch({ type: SAVE_TOTALS, totals: totals });
        } else if (responseTotals.status == 404) {
          dispatch({ type: TOTALS_FAILED });
        }

        //console.log("PURCHASE CONF FAIL //////////", data)
        dispatch({ type: PURCHASE_CONFIRMATION_FAILED, data: data });
      } else {
        //Send to store
        let data = { status: status }
        dispatch({ type: PURCHASE_CONFIRMATION_FAILED, data: data });
      }
    }
  }
}


export function generateCart(i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_CART })
    let response = await api.generateCart();
    let status = response.status;

    if (response && response.data && status == 200) {
      const cart = response.data.response;
      dispatch({ type: SAVE_CART, cart: cart });
    } else {
      dispatch({ type: CART_FAILED });
    }
  };
}

export function getCartTotals(cartId) {
  return async (dispatch) => {
    if (cartId) {
      //console.log("getCartTotals ACTION ==================", cartId)
      dispatch({ type: LOADING_TOTALS })
      let response = await api.getCartTotals(cartId);
      let status = response.status;

      if (response && response.data && status == 200) {
        const totals = response.data.data;
        dispatch({ type: SAVE_TOTALS, totals: totals });
      } else if (status == 404 || status == 400 || status == 403) {
        regenerateCart(dispatch);
      }
    }
  };
}

async function regenerateCart(dispatch) {
  let response = await api.generateCart();
  let status = response.status;

  if (response && response.data && status == 200) {
    const cart = response.data.response;
    dispatch({ type: SAVE_CART, cart: cart });

    let responseTotals = await api.getCartTotals(cart);
    if (responseTotals && responseTotals.data) {
      const totals = responseTotals.data.response;
      dispatch({ type: SAVE_TOTALS, totals: totals });
    } else {
      dispatch({ type: TOTALS_FAILED });
    }
  } else {
    dispatch({ type: TOTALS_FAILED });
  }
};

export function addProductToCart(productObj, cartId, i18n) {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_CART_LOADING })
    let data = {
      "products": productObj,
    }

    let response = await api.setCartProduct(data, cartId);

    if (response && response.data && response.status == 200) {
      dispatch({ type: ADD_TO_CART_SUCCESS });
    } else if (response.status == 422) {
      const { fields } = response.data.errors;
      let message = i18n.toasts.defaultError

      if (fields["products"]) message = fields["products"];

      Toast.show({
        text2: message,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: ADD_TO_CART_FAILED });
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: ADD_TO_CART_FAILED });
    }
  };
}

export function resetCartModal() {
  return {
    type: RESET_CART_MODAL,
  };
}

export function resetPurchaseInfo() {
  return {
    type: RESET_PURCHASE_INFO,
  };
}

export function updateCartProductQty(sku, productObj, cartId, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_TOTALS })
    dispatch({ type: LOADING_CART_QTY, sku })

    let data = {
      "products": productObj,
      "replace_qty": true
    }

    let response = await api.setCartProduct(data, cartId);

    if (response && response.data && response.status == 200) {
      dispatch({ type: SUCCESS_CART_QTY });
      let responseTotals = await api.getCartTotals(cartId);
      let status = responseTotals.status;

      if (responseTotals && responseTotals.data && responseTotals.status == 200) {
        const totals = responseTotals.data.data;
        dispatch({ type: SAVE_TOTALS, totals: totals });
      } else if (status == 404 || status == 400 || status == 403) {
        regenerateCart(dispatch);
      }
    } else if (response.status == 422) {
      const { fields } = response.data.errors;
      let message = i18n.toasts.defaultError

      if (fields["products"]) message = fields["products"];

      Toast.show({
        text2: message,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: FAILED_CART_QTY_NO_MODAL });
      dispatch({ type: TOTALS_FAILED });
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: FAILED_CART_QTY });
      dispatch({ type: TOTALS_FAILED });
    }
  };
}

export function deleteCartItem(productObj, cartId, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_TOTALS })

    let data = {
      "products": productObj,
      "replace_qty": true
    }

    let response = await api.setCartProduct(data, cartId);

    if (response && response.data && response.status == 200) {
      let responseTotals = await api.getCartTotals(cartId);
      let status = responseTotals.status;

      if (responseTotals && responseTotals.data && responseTotals.status == 200) {
        const totals = responseTotals.data.data;
        dispatch({ type: SAVE_TOTALS, totals: totals });
      } else if (status == 404 || status == 400 || status == 403) {
        regenerateCart(dispatch);
      }
    } else {
      dispatch({ type: CART_FAILED });
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
    }
  };
}

export function getPurchaseInfo() {
  return async (dispatch) => {
    dispatch({ type: LOADING_PURCHASE_INFO })
    let response = await api.getPurchaseInfo();
    if (response && response.data && response.status == 200) {
      dispatch({ type: PURCHASE_INFO_SUCCESS, data: response.data.response });
    } else {
      dispatch({ type: PURCHASE_INFO_FAILED });
    }
  };
}

export function getWalletBalance() {
  return async (dispatch) => {
    let response = await api.getWalletBalance();
    if (response && response.data && response.status == 200) {
      dispatch({ type: WALLET_SAVE, data: response.data.response });
    }
  };
}

export function resetWallet() {
  return {
    type: RESET_WALLET,
  };
}

export function getPaymentMethods(country) {
  return async (dispatch) => {
    let response = await api.getPaymentMethods(country);

    if (response && response.data && response.status == 200) {
      dispatch({ type: PAYMENT_METHODS_SAVE, data: response.data.data });
    }
  };
}

// Register
export function updateRegisterQty(products) {
  return async (dispatch) => {
    dispatch({ type: UPD_REGISTER_QTY, products });
  };
}
export function updateAutoQty(products) {
  return async (dispatch) => {
    dispatch({ type: UPD_REGISTER_AUTO_QTY, products });
  };
}

export function getPackages() {
  return async (dispatch) => {
    dispatch({ type: LOADING_PACKAGES })
    let response = await api.getPackages();

    if (response && response.data && response.status == 200) {
      dispatch({ type: SAVE_PACKAGES, packages: response.data.data });
    } else {
      dispatch({ type: PACKAGES_FAILED, totals: totals });
    }
  };
}

export function registerStep1(data) {
  return async (dispatch) => {
    dispatch({ type: LOADING_STEP_1 })
    let response = await api.registerStep(data);

    if (response && response.data && response.status == 200) {
      let dataStep1 = {
        cart_id: response.data.response.cart_id,
        data: data.product
      }

      dispatch({ type: SAVE_STEP1, dataStep1: dataStep1 });
    } else if (response.status == 422) {
      let data = {}
      const { fields } = response.data.errors;

      if (fields["product.products"]) data.step1ProductError = fields["product.products"];

      dispatch({ type: FAILED_STEP1, data });
    } else {
      dispatch({ type: FAILED_STEP1, data: {} });
    }
  };
}

export function registerStep2(stepData, identityData, i18n, backAction) {
  return async (dispatch) => {
    dispatch({ type: LOADING_STEP_2 })

    let response = await api.registerStep(stepData);
    let status = response.status;

    if (response && response.data && response.status == 200) {
      let responseIdentity = await api.registerIdentity(identityData);

      if (responseIdentity && responseIdentity.data && responseIdentity.status == 200) {
        let dataStep2 = {
          identity: responseIdentity.data.response.identity_id,
          data: stepData.personal_information
        }
        dispatch({ type: SAVE_STEP2, dataStep2: dataStep2 });
      } else {
        let data = {}
        data.showModal = true;
        dispatch({ type: FAILED_STEP2, data });
      }
    } else {
      const { fields } = response.data.errors;
      let data = {}

      if (fields["personal_information.first_name"]) data.step2Firstname = fields["personal_information.first_name"];
      if (fields["personal_information.last_name"]) data.step2Lastname = fields["personal_information.last_name"];
      if (fields["personal_information.email"]) data.step2Email = fields["personal_information.email"];
      if (fields["personal_information.mobile_number"]) data.step2Number = fields["personal_information.mobile_number"];
      if (fields["personal_information.company"]) data.step2Company = fields["personal_information.company"];
      if (fields["personal_information.tax_id"]) data.step2Tax = fields["personal_information.tax_id"];
      if (fields["personal_information.username"]) data.step2Username = fields["personal_information.username"];
      if (fields["personal_information.password"]) data.step2Password = fields["personal_information.password"];
      if (fields["personal_information.password_confirmation"]) data.step2PasswordConf = fields["personal_information.password_confirmation"];
      if (fields["personal_information.birthdate"]) data.step2Birthdate = fields["personal_information.birthdate"];
      if (fields["personal_information.national_identification_number"])
        data.step2SSN = fields["personal_information.national_identification_number"];

      if (fields["cart_id"]) {
        Toast.show({
          text2: i18n.toasts.defaultError,
          type: 'error',
          topOffset: 65,
          visibilityTime: 2500,
        });
        backAction();
      }
      dispatch({ type: FAILED_STEP2, data });
    }
  };
}

export function registerStep3(dataStep, i18n, backAction) {
  return async (dispatch) => {
    dispatch({ type: LOADING_STEP_3 })
    dispatch({ type: ADDRESS_LOADING });
    let response = await api.registerStep(dataStep);

    if (response && response.data && response.status == 200) {
      let dataStep3 = {
        method: response.data.response,
        data: dataStep.shipping
      }

      dispatch({ type: SAVE_STEP3, dataStep3 });
    } else if (response.status == 422) {
      const { fields } = response.data.errors
      let data = {}
      data.showModal = false;

      if (fields["shipping.shipping_address.address"]) data.addressError = fields["shipping.shipping_address.address"];
      if (fields["shipping.shipping_address.city"]) data.cityError = fields["shipping.shipping_address.city"];
      if (fields["shipping.shipping_address.first_name"]) data.firstNameError = fields["shipping.shipping_address.first_name"];
      if (fields["shipping.shipping_address.last_name"]) data.lastNameError = fields["shipping.shipping_address.last_name"];
      if (fields["shipping.shipping_address.postcode"]) data.postCodeError = fields["shipping.shipping_address.postcode"];
      if (fields["shipping.shipping_address.region_id"]) data.regionError = fields["shipping.shipping_address.region_id"];

      if (fields["shipping.autoship.products"]) data.autofillError = fields["shipping.autoship.products"];

      if (fields["shipping.shipping_address.address"] && dataStep.shipping.shipping_address.address) {
        data.showAddressCorrect = true
      }

      if (fields["cart_id"]) {
        Toast.show({
          text2: i18n.toasts.defaultError,
          type: 'error',
          topOffset: 65,
          visibilityTime: 2500,
        });
        backAction();
      }

      if (fields['shipping.shipping_address.suggestion']) {
        let responseSuggestion = await api.getAddressSuggestion(dataStep.shipping.shipping_address);

        if (responseSuggestion.status == 200) {
          dispatch({ type: FAILED_STEP3, data });
          dispatch({ type: ADDRESS_SUGGEST_SUCCESS, suggestion: responseSuggestion.data.response });
        } else {
          dispatch({ type: FAILED_STEP3, data });
          dispatch({ type: NEW_ADDRESS_FAILED, data });
        }
      } else {
        dispatch({ type: FAILED_STEP3, data });
        dispatch({ type: NEW_ADDRESS_FAILED, data });
      }
    } else if (response.status == 403 || response.status == 404) {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      let data = {}
      backAction();
      dispatch({ type: FAILED_STEP3, data });
      dispatch({ type: NEW_ADDRESS_FAILED });
    }
  };
}

export function registerStep4(dataStep, i18n, backAction) {
  return async (dispatch) => {
    dispatch({ type: LOADING_STEP_4 })
    dispatch({ type: ADDRESS_LOADING });

    let response = await api.registerStep(dataStep);

    if (response && response.data && response.status == 200) {
      let dataStep4 = {
        card: response.data.response,
        data: dataStep.payment,
        cardId: dataStep.payment.payment_method.token && dataStep.payment.payment_method.token
      }

      dispatch({ type: SAVE_STEP4, dataStep4: dataStep4 });
    } else if (response.status == 422) {
      const { fields } = response.data.errors
      let data = {}
      if (fields["payment.billing.address"]) data.addressError = fields["payment.billing.address"];
      if (fields["payment.billing.city"]) data.cityError = fields["payment.billing.city"];
      if (fields["payment.billing.first_name"]) data.firstNameError = fields["payment.billing.first_name"];
      if (fields["payment.billing.last_name"]) data.lastNameError = fields["payment.billing.last_name"];
      if (fields["payment.billing.postcode"]) data.postCodeError = fields["payment.billing.postcode"];
      if (fields["payment.billing.region_id"]) data.regionError = fields["payment.billing.region_id"];
      if (fields['payment.payment_method.wallet_password']) data.walletPasswordError = fields['payment.payment_method.wallet_password'];
      if (fields['payment.payment_method.wallet_type'] && !data.walletPasswordError) data.walletPasswordError = fields['payment.payment_method.wallet_type'];

      if (fields["payment.billing.address"] && dataStep.payment.billing.address) {
        data.showAddressCorrect = true
      }

      if (fields["cart_id"]) {
        Toast.show({
          text2: i18n.toasts.defaultError,
          type: 'error',
          topOffset: 65,
          visibilityTime: 2500,
        });
        backAction();
      }

      if (fields['payment.billing.suggestion']) {
        let responseSuggestion = await api.getAddressSuggestion(dataStep.payment.billing);

        if (responseSuggestion.status == 200) {
          dispatch({ type: ADDRESS_SUGGEST_SUCCESS, suggestion: responseSuggestion.data.response });
        } else {
          dispatch({ type: FAILED_STEP4, data });
          dispatch({ type: NEW_ADDRESS_FAILED, data });
        }
      } else {
        dispatch({ type: FAILED_STEP4, data });
        dispatch({ type: NEW_ADDRESS_FAILED, data });
      }
    } else if (response.status == 404 || response.status == 403) {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      let data = {}
      backAction();
      dispatch({ type: FAILED_STEP4, data });
      dispatch({ type: NEW_ADDRESS_FAILED });
    }
  };
}

export function sendMobileMessage(mobile, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_MOBILE_MESSAGE })
    let data = {
      "mobile_number": mobile
    }
    let response = await api.sendMobileMessage(data);

    if (response && response.data && response.status == 200) {
      if (response.data.response.status == 'whitelisted') {
        dispatch({ type: SAVE_MOBILE_TOKEN, mobile: response.data.response });
      } else {
        dispatch({ type: SAVE_MOBILE_TOKEN, mobile: response.data.response });

      }
    } else if (response.status == 422) {
      const { fields } = response.data.errors
      let data = {}
      if (fields["mobile_number"]) data.mobileError = fields["mobile_number"];

      dispatch({ type: FAILED_MOBILE_MESSAGE, data });
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: FAILED_MOBILE_MESSAGE, data: {} });
    }
  };
}

export function resetMobileMessage() {
  return {
    type: RESET_MOBILE_MESSAGE,
  };
}

export function resetStep4() {
  return {
    type: RESET_STEP_4,
  };
}

export function resetRegisterData() {
  return {
    type: RESET_REGISTER_DATA,
  };
}

export function saveRegisterPosition(parent, position) {
  return {
    type: SAVE_REGISTER_POSITION, data: { parent, position }
  };
}

export function resetRegisterPosition() {
  return {
    type: RESET_REGISTER_POSITION,
  };
}

export function resetMobileValidation() {
  return {
    type: RESET_MOBILE_VALIDATION,
  };
}

export function validateMobileCode(data, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_MOBILE_VALIDATION })

    let response = await api.validateMobileCode(data);

    if (response && response.data && response.status == 200) {
      dispatch({ type: MOBILE_VALIDATION_SUCCESS, mobile: response.data.response });
    } else if (response.status == 422) {
      const { fields } = response.data.errors
      let data = {}
      if (fields["verification_code"]) data.mobileError = fields["verification_code"];

      dispatch({ type: FAILED_MOBILE_VALIDATION, data });
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: FAILED_MOBILE_VALIDATION, data: {} });
    }
  };
}

export function registerStep5(data, i18n, backAction, backDashboard) {
  return async (dispatch) => {
    dispatch({ type: LOADING_STEP_5 })
    let response = await api.registerStep(data);
    let status = response.status;

    if (response && response.data && status == 200) {
      dispatch({ type: SAVE_STEP5, response: response.data.response });
    } else if (status == 403 || status == 404) {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      backAction();
      dispatch({ type: FAILED_STEP5, data: {} });

    } else if (status == 422) {
      const { errors } = response.data;
      let data = {};

      if (errors.fields) {
        const { fields } = response.data.errors;

        //Parent or Leg Error
        if (fields['leg']) data.binaryLegError = fields['leg'];
        if (fields['parent']) data.binaryParentError = fields['parent'];
        if (data.binaryLegError || data.binaryParentError) {
          Toast.show({
            text2: i18n.toasts.positionError,
            type: 'error',
            topOffset: 65,
            visibilityTime: 2500,
          });
          backDashboard();
          return;
        } else {
          if (fields['tickets']) data.ticketsError = fields['tickets'];
          if (fields['cart_id'] && typeof (fields['cart_id']) == 'object') data.registerCardError = fields['cart_id'];

          if (typeof (fields.cart_id) !== 'object') data.cart = fields.cart_id;
          if (fields.payex) data.payex = fields.payex;
          data.showModal = data.payex ? true : false;
          data.status = status;
        }
      }
      if (data.registerCardError) {
        Toast.show({
          text2: data.registerCardError,
          type: 'error',
          topOffset: 65,
          visibilityTime: 2500,
        });
        backAction();
      } else {
        dispatch({ type: FAILED_STEP5, data });
      }
    } else if (status == 423) {
      Toast.show({
        text2: i18n.toasts.positionError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      backDashboard();
      dispatch({ type: FAILED_STEP5, data: {} });
    } else if (status == 500) {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: FAILED_STEP5, data: {} });
    }
  };
}

export function cartEstimatedTotals(data) {
  return async (dispatch) => {
    dispatch({ type: LOADING_ESTIMATED })
    let response = await api.cartEstimatedTotals(data);

    if (response && response.data && response.status == 200) {
      dispatch({ type: ESTIMATED_LOADED, data: response.data.response });
    } else {
      dispatch({ type: ESTIMATED_FAILED });
    }
  };
}

export function useCreditPoints(cartId, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_TOTALS });

    let response = await api.useCreditPoints(cartId);
    if (response.status == 200) {
      let responseTotals = await api.getCartTotals(cartId);

      if (responseTotals && responseTotals.data && responseTotals.status == 200) {
        const totals = responseTotals.data.data;
        dispatch({ type: SAVE_TOTALS, totals: totals });
      } else if (responseTotals.status == 404) {
        dispatch({ type: TOTALS_FAILED });
      }
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: TOTALS_FAILED });
    }
  }
}


export function removeCreditPoints(cartId, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_TOTALS });

    let response = await api.removeCreditPoints(cartId);
    if (response.status == 200) {
      let responseTotals = await api.getCartTotals(cartId);

      if (responseTotals && responseTotals.data && responseTotals.status == 200) {
        const totals = responseTotals.data.data;
        dispatch({ type: SAVE_TOTALS, totals: totals });
      } else if (responseTotals.status == 404) {
        dispatch({ type: TOTALS_FAILED });
      }
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: TOTALS_FAILED });
    }
  }
}

export function addCoupon(cartId, i18n, data) {
  return async (dispatch) => {
    dispatch({ type: LOADING_COUPON });
    let response = await api.useCoupon(cartId, data);

    if (response.status == 200) {
      dispatch({ type: LOADING_TOTALS });
      let responseTotals = await api.getCartTotals(cartId);

      if (responseTotals && responseTotals.data && responseTotals.status == 200) {
        const totals = responseTotals.data.data;
        dispatch({ type: SAVE_TOTALS, totals: totals });
        dispatch({ type: COUPON_LOADED });
      } else if (responseTotals.status == 404) {
        dispatch({ type: TOTALS_FAILED });
        dispatch({ type: COUPON_LOADED });
      }
    } else if (response.status == 422) {
      const { errors } = response.data;
      let data = {};

      if (errors.fields) {
        const { fields } = response.data.errors;
        if (fields['coupon_code']) data.couponError = fields['coupon_code'];
      }
      dispatch({ type: COUPON_FAILED, data });
      dispatch({ type: TOTALS_FAILED });
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: COUPON_FAILED, data: {} });
      dispatch({ type: TOTALS_FAILED });
    }
  }
}

export function deleteCoupon(cartId, i18n) {
  return async (dispatch) => {
    dispatch({ type: LOADING_COUPON });
    let response = await api.deleteCoupon(cartId);

    if (response.status == 200) {
      dispatch({ type: LOADING_TOTALS });
      let responseTotals = await api.getCartTotals(cartId);

      if (responseTotals && responseTotals.data && responseTotals.status == 200) {
        const totals = responseTotals.data.data;
        dispatch({ type: SAVE_TOTALS, totals: totals });
        dispatch({ type: COUPON_LOADED });
      } else if (responseTotals.status == 404) {
        dispatch({ type: TOTALS_FAILED });
        dispatch({ type: COUPON_LOADED });
      }
    } else {
      Toast.show({
        text2: i18n.toasts.defaultError,
        type: 'error',
        topOffset: 65,
        visibilityTime: 2500,
      });
      dispatch({ type: COUPON_LOADED });
      dispatch({ type: TOTALS_FAILED });
    }
  }
}
