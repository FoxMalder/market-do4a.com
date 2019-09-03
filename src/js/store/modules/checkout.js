import axios from 'axios';
import { validate, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import * as Api from '../../api';
import Utils from '../../utils/utils';
import { ADD_TOAST_MESSAGE } from './notifications';

// const REFRESH_ORDER = 'REFRESH_ORDER';
const SET_TOTAL = 'SET_TOTAL';
const SET_CURRENT_STORE = 'SET_CURRENT_STORE';
const SET_USER_PROPERTIES = 'SET_USER_PROPERTIES';
const SET_SHIPPING_METHODS = 'SET_SHIPPING_METHODS';
const SET_PAYMENT_METHODS = 'SET_PAYMENT_METHODS';

const SET_SHIPPING = 'SET_SELECTED_SHIPPING_METHOD_ID';
const SET_PAYMENT = 'SET_PAYMENT_SHIPPING_METHOD_ID';

extend('required', {
  ...required,
  message: 'Поле "{_field_}" должно быть заполнено',
});


extend('email', {
  ...email,
  message: 'Введите корректный email',
});

export {
  SET_SHIPPING as SET_SHIPPING_METHOD,
  SET_PAYMENT as SET_PAYMENT_METHOD,
};


// initial state
const state = {
  currentStepName: 'basket',
  steps: [
    {
      key: 'basket',
      next: 'form',
      title: 'Корзина',
      nextButtonText: 'Перейти к оформлению',
    },
    {
      key: 'form',
      next: 'shipping-and-payment',
      title: 'Ваши данные',
      nextButtonText: 'Доставка и оплата',
    },
    {
      key: 'shipping-and-payment',
      next: 'final',
      title: 'Доставка и оплата',
      nextButtonText: 'Оформить заказ',
    },
    {
      key: 'final',
      next: 'basket',
      title: 'Финал',
      nextButtonText: 'Оплатить заказ',
    },
  ],
  propertyList: [],

  delivery: [],
  selectedShippingMethodId: null,

  paymentMethods: [],
  selectedPaymentMethodId: null,

  checkoutStatus: null,

  total: null,
  currentStore: null,

  param: {
    signedParamsString: null,
    siteID: null,
    ajaxUrl: null,
    personTypeId: null, // order.PERSON_TYPE[].ID
    isLocaleStore: false,
    buyerStore: null, // BUYER_STORE
  },
  errors: {
    PROPERTY: [],
    PAY_SYSTEM: [],
    DELIVERY: [],
    AUTH: [],
  },
};

// getters
const getters = {
  getCurrentStep: state => state.steps.find(item => item.key === state.currentStepName),
  nextStepButton: (state) => {
    if (document.documentElement.clientWidth < 1240) {
      const st = state.steps.find(item => item.key === state.currentStepName);
      return {
        key: st.next,
        text: st.nextButtonText,
      };
    }
    return {
      key: 'final',
      text: 'Оформить заказ',
    };
  },
  // getLocationProperty: (state) => {
  //   state.propertyList.find;
  // },
  visibleShippingMethods: (state) => {
    if (state.param.isLocaleStore) {
      let courier = null;
      let pickup = null;

      state.delivery.forEach((item) => {
        if (item.type === 'C') {
          courier = item;
        }
        if (item.type === 'P') {
          pickup = item;
        }
      });

      return [pickup, courier].filter(item => item);
    }

    return state.delivery.filter(item => !item.errors);
  },
  getAllFormData: (state) => {
    const data = {
      DELIVERY_ID: state.selectedShippingMethodId,
      PAY_SYSTEM_ID: state.selectedPaymentMethodId,
      BUYER_STORE: state.param.buyerStore,
      PERSON_TYPE: state.param.personTypeId,
      action: 'saveOrderAjax',
      location_type: 'code',
      sessid: Utils.sessid(),
    };

    state.propertyList.forEach((item) => {
      data[item.name] = item.value;
    });

    return data;
  },
};

// actions
const actions = {
  initSoa({ commit, dispatch }, soa) {
    const person = Object.values(soa.result.PERSON_TYPE).find(item => item.CHECKED === 'Y');

    commit('SET_PARAM', {
      signedParamsString: soa.signedParamsString,
      siteID: soa.siteID,
      ajaxUrl: soa.ajaxUrl,
      isLocaleStore: soa.result.LOCAL_STORE === 'Y',
      personTypeId: parseInt(person.ID, 10),
      buyerStore: parseInt(soa.result.BUYER_STORE, 10),
    });

    dispatch('refreshOrder', soa.result);
  },

  [SET_USER_PROPERTIES]({ commit }, properties) {
    const propertyList = properties
      .sort((a, b) => a.SORT - b.SORT)
      .map((property) => {
        const prop = {
          id: parseInt(property.ID, 10),
          title: property.NAME || '',
          description: property.DESCRIPTION || '',
          value: property.VALUE[0],
          personTypeId: parseInt(property.PERSON_TYPE_ID, 10),
          propsGroupId: parseInt(property.PROPS_GROUP_ID, 10),
          required: property.REQUIRED === 'Y',
          name: `ORDER_PROP_${property.ID}`,
          isUserProps: property.USER_PROPS === 'Y',
          isLocation: property.IS_LOCATION === 'Y',
          type: '',
          inputmode: '',
          autocomplete: '',
          isValid: false,
          // pattern: property.PATTERN,
          // minlength: parseInt(property.MINLENGTH, 10),
          // maxlength: parseInt(property.MAXLENGTH, 10),
          // multiple: property.MULTIPLE === 'Y',
          // multiline: property.MULTILINE === 'Y',
        };

        switch (property.TYPE) {
          case 'DATE':
            prop.type = 'date';
            break;
          case 'NUMBER':
            prop.type = 'number';
            break;
          default:
            prop.type = 'text';
        }


        let type = property.CODE;

        if (property.IS_EMAIL === 'Y') type = 'EMAIL';
        if (property.IS_PHONE === 'Y') type = 'PHONE';
        if (property.IS_ZIP === 'Y') type = 'INDEX';
        if (property.IS_ADDRESS === 'Y') type = 'ADDRESS';

        switch (type) {
          case 'FIO':
            prop.autocomplete = 'name';
            break;
          case 'EMAIL':
            prop.type = 'email';
            prop.autocomplete = 'email';
            prop.inputmode = 'email';
            break;
          case 'PHONE':
            prop.type = 'tel';
            prop.autocomplete = 'tel';
            prop.inputmode = 'tel';
            break;
          case 'INDEX':
            prop.autocomplete = 'shipping postal-code';
            prop.inputmode = 'numeric';
            break;
          case 'ADDRESS':
            prop.autocomplete = 'shipping street-address';
            break;
          case 'STREET':
            prop.autocomplete = 'shipping address-line1';
            break;
          case 'HOUSE':
            prop.autocomplete = '';
            break;
          case 'CITY':
            prop.autocomplete = 'shipping address-level2';
            break;
          case 'FLAT':
            prop.autocomplete = 'shipping address-line2';
            break;
          default:
            break;
        }

        return prop;
      });

    commit(SET_USER_PROPERTIES, propertyList);
  },

  [SET_SHIPPING_METHODS]({ commit }, delivery) {
    const deliveryList = Object.values(delivery)
      .sort((a, b) => {
        const sort = parseInt(a.SORT, 10) - parseInt(b.SORT, 10);
        if (sort === 0) {
          if (a.OWN_NAME.toLowerCase() > b.OWN_NAME.toLowerCase()) return 1;
          if (a.OWN_NAME.toLowerCase() < b.OWN_NAME.toLowerCase()) return -1;
        }
        return sort;
      })
      .map(item => ({
        id: parseInt(item.ID, 10),
        errors: item.CALCULATE_ERRORS,
        checked: item.CHECKED === 'Y',
        price: parseFloat(item.PRICE),
        name: item.NAME,
        description: item.DESCRIPTION,
        period: item.PERIOD_TEXT,
        type: item.TYPE,
        logoUrl: item.LOGOTIP ? item.LOGOTIP.SRC : '',
      }));

    commit(SET_SHIPPING_METHODS, deliveryList);

    // commit('SET_SELECTED_SHIPPING_METHOD_ID', deliveryList.find(item => item.checked));
    // commit('SET_SELECTED_SHIPPING_METHOD_ID', deliveryList.find(item => item.checked));
  },

  [SET_PAYMENT_METHODS]({ commit }, payments) {
    const paymentMethods = payments
      .sort((a, b) => {
        const sort = parseInt(a.SORT, 10) - parseInt(b.SORT, 10);
        if (sort === 0) {
          if (a.NAME.toLowerCase() > b.NAME.toLowerCase()) return 1;
          if (a.NAME.toLowerCase() < b.NAME.toLowerCase()) return -1;
        }
        return sort;
      })
      .map(item => ({
        id: parseInt(item.ID, 10),
        name: item.NAME,
        checked: item.CHECKED === 'Y',
        description: item.DESCRIPTION,
        isCash: item.IS_CASH === 'Y',
      }));

    // commit('SET_SELECTED_PAYMENT_METHOD_ID', paymentMethods.find(item => item.checked));
    commit(SET_PAYMENT_METHODS, paymentMethods);
  },

  refreshOrder({ dispatch, commit }, order) {
    if (order.SHOW_AUTH) {
      console.error(order.ERROR);
    }

    dispatch('cart/getFromSOA', order, { root: true });


    commit(SET_TOTAL, order.TOTAL);
    dispatch(SET_USER_PROPERTIES, order.ORDER_PROP.properties);
    dispatch(SET_SHIPPING_METHODS, order.DELIVERY);
    dispatch(SET_PAYMENT_METHODS, order.PAY_SYSTEM);
  },


  sendRequest({ state, getters, dispatch }, data) {
    const request = {
      order: getters.getAllFormData,
      via_ajax: 'Y',
      action: 'refreshOrderAjax',
      SITE_ID: state.param.siteID,
      signedParamsString: state.param.signedParamsString,
      sessid: Utils.sessid(),
      ...data,
    };

    return new Promise((resolve, reject) => {
      Api.fetchSaleOrderAjax(state.param.ajaxUrl, request)
        .then((result) => {
          if (result.order) {
            dispatch('refreshOrder', result.order);
          }

          if (request.action === 'enterCoupon') {
            if (result.order) {
              dispatch(ADD_TOAST_MESSAGE, { title: 'Промокод применён' }, { root: true });
            } else {
              dispatch(ADD_TOAST_MESSAGE, {
                title: 'Промокод не найден',
                text: 'Возможно, он работает только в стационарных магазинах',
              }, { root: true });
              reject();
            }
          }

          if (request.action === 'removeCoupon' && !result.order) {
            // this.removeCouponItem(result);
            console.log('removeCouponItem');
          }

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  saveOrderAjax({ dispatch }) {
    return dispatch('sendRequest', { action: 'saveOrderAjax' });
  },
  enterCoupon({ dispatch }, coupon) {
    return dispatch('sendRequest', { action: 'enterCoupon', coupon });
  },
  removeCoupon({ dispatch }) {
    return dispatch('sendRequest', { action: 'removeCoupon' });
  },


  [SET_PAYMENT]({ commit, dispatch }, { id }) {

    commit('SET_ERRORS', { PAY_SYSTEM: [] });
    // const savedPaymentMethods = [...state.paymentMethods];
    // const paymentMethods = savedPaymentMethods.map(item => ({
    //   ...item,
    //   checked: item.id === payment.id,
    // }));
    // commit('SET_PAYMENT_METHODS', paymentMethods);
    commit(SET_PAYMENT, id);

    dispatch('sendRequest');
  },

  [SET_SHIPPING]({ commit, dispatch }, { id }) {
    // const savedShippingMethods = [...state.delivery];
    // const shippingMethods = savedShippingMethods.map(item => ({
    //   ...item,
    //   checked: item.id === delivery.id,
    // }));
    // commit('SET_SHIPPING_METHODS', shippingMethods);
    commit('SET_ERRORS', { DELIVERY: [] });
    commit(SET_SHIPPING, id);

    dispatch('sendRequest');
  },

  async validatePropsData({ state, dispatch }) {
    const error = [];
    await Promise.all(state.propertyList.map(async (item) => {
      const { errors } = await validate(item.value, {
        required: item.required,
        email: item.type === 'email',
      }, {
        name: item.title,
      });

      if (errors.length) {
        error.push(errors[0]);
      }
    }));
    dispatch('SET_ERRORS', { PROPERTY: error });
  },


  setStep({ commit, dispatch }, step) {
    if (step.key === 'final') {
      dispatch('checkout');
    } else {
      commit('SET_CURRENT_STEP', step);
    }
  },

  SET_ERRORS({ commit }, errors) {
    commit('SET_ERRORS', errors);

    if (errors.PROPERTY && errors.PROPERTY.length) {
      commit('SET_CURRENT_STEP', 'form');
      Utils.scrollTo(document.getElementById('order-props'));
      return;
    }

    if (errors.DELIVERY && errors.DELIVERY.length) {
      commit('SET_CURRENT_STEP', 'shipping-and-payment');
      Utils.scrollTo(document.getElementById('order-shipping'));
      return;
    }

    if (errors.PAY_SYSTEM && errors.PAY_SYSTEM.length) {
      commit('SET_CURRENT_STEP', 'shipping-and-payment');
      Utils.scrollTo(document.getElementById('order-payment'));
    }
  },

  async validate({ state, dispatch }) {
    const err = {
      PROPERTY: [],
      PAY_SYSTEM: [],
      DELIVERY: [],
    };

    await Promise.all(state.propertyList.map(async (item) => {
      const { errors } = await validate(item.value, {
        required: item.required,
        email: item.type === 'email',
      }, {
        name: item.title,
      });

      if (errors.length) {
        err.PROPERTY.push(errors[0]);
      }
    }));

    if (!state.selectedPaymentMethodId) {
      err.PAY_SYSTEM.push('Не выбран метод оплаты');
    }

    if (!state.selectedShippingMethodId) {
      err.DELIVERY.push('Не выбран способ доставки');
    }

    if (err.PROPERTY.length || err.PAY_SYSTEM.length || err.DELIVERY.length) {
      dispatch('SET_ERRORS', err);
      return false;
    }
    return true;
  },

  async checkout(context) {
    const valid = await context.dispatch('validate');
    if (!valid) {
      return;
    }

    context.commit('SET_CHECKOUT_STATUS', 'loading');

    axios
      .post('/checkout/', context.getters.getAllFormData)
      .then(response => response.data)
      .then((result) => {
        if (result && result.order) {
          const { order } = result;

          if (result.SHOW_AUTH) {
            console.error('SHOW_AUTH not implemented');
          } else {
            if (order.REDIRECT_URL && order.REDIRECT_URL.length) {
              document.location.href = order.REDIRECT_URL;
            }

            if (order.ERROR) {
              context.commit('SET_ERRORS', order.ERROR);
              // dispatch('showErrors', order.ERROR);
            }
          }
        }

        context.commit('SET_CHECKOUT_STATUS', null);
      })
      .catch(() => {
        context.commit('SET_CHECKOUT_STATUS', 'error');
        setTimeout(() => context.commit('SET_CHECKOUT_STATUS', null), 1000);
      });
  },
};

// mutations
const mutations = {
  SET_PARAM: (state, param) => {
    state.param = {
      ...state.param,
      ...param,
    };
  },

  SET_CHECKOUT_STATUS: (state, status) => {
    state.checkoutStatus = status;
  },
  SET_CURRENT_STEP(state, { key }) {
    state.currentStepName = key;
  },

  [SET_USER_PROPERTIES]: (state, propertyList) => {
    state.propertyList = propertyList;
  },

  [SET_CURRENT_STORE]: (state, store) => {
    state.currentStore = {
      ...state.currentStore,
      ...store,
    };
  },

  [SET_SHIPPING_METHODS]: (state, deliveryList) => {
    state.delivery = deliveryList;
  },
  [SET_SHIPPING]: (state, id) => {
    state.selectedShippingMethodId = id;
  },

  [SET_PAYMENT_METHODS]: (state, paymentMethods) => {
    state.paymentMethods = paymentMethods;
  },
  [SET_PAYMENT]: (state, id) => {
    state.selectedPaymentMethodId = id;
  },
  [SET_TOTAL]: (state, total) => {
    state.total = {
      ...state.total,
      ...total,
    };
  },
  // SET_SELECTED_PAYMENT_METHOD(state, { id }) {
  //   state.selectedPaymentMethod = id;
  // },

  // SET_PERSON_TYPE(state, id) {
  //   state.personType = id;
  // },

  SET_ERRORS(state, errors) {
    state.errors = {
      ...state.errors,
      ...errors,
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
