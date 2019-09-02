import axios from 'axios';
import { validate, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import * as Api from '../../api';
import Utils from '../../utils/utils';
import { ADD_TOAST_MESSAGE } from './notifications';

const REFRESH_ORDER = 'REFRESH_ORDER';
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

// /**
//  * Преобразование и сортировка видов доставки
//  * @param {Object | Array} objDelivery
//  * @returns {Array}
//  */
// function getDeliverySortedArray(objDelivery) {
//   let arDelivery = [];
//
//   if (Array.isArray(objDelivery)) {
//     arDelivery = objDelivery;
//   } else {
//     arDelivery = Object.keys(objDelivery).map((key) => objDelivery[key]);
//   }
//
//   arDelivery.sort((a, b) => {
//     const sort = parseInt(a.SORT, 10) - parseInt(b.SORT, 10);
//     if (sort === 0) {
//       return a.OWN_NAME.toLowerCase() > b.OWN_NAME.toLowerCase() ? 1 : (a.OWN_NAME.toLowerCase() < b.OWN_NAME.toLowerCase() ? -1 : 0);
//     }
//     return sort;
//   });
//
//   return arDelivery;
// }


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
  selectedShippingMethod: null,

  paymentMethods: [],
  selectedPaymentMethodId: null,
  selectedPaymentMethod: null,

  result: null,
  props: {},
  checkoutStatus: null,
  soaData: null,
  personType: null, // order.PERSON_TYPE[].ID
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
    if (state.result.LOCAL_STORE) {
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
      BUYER_STORE: state.result.BUYER_STORE,
      PERSON_TYPE: state.personType,
      action: 'saveOrderAjax',
      location_type: 'code',
      sessid: global.BX && global.BX.bitrix_sessid ? global.BX.bitrix_sessid() : '',
    };

    state.propertyList.forEach((item) => {
      data[item.fieldName] = item.value;
    });

    return data;
  },
};

// actions
const actions = {
  initSoa({ commit, dispatch }, soa) {
    commit('SET_SOA', soa);
    dispatch(REFRESH_ORDER, soa.result);
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
    commit('SET_PROPERTY_LIST', propertyList);
  },

  [SET_SHIPPING_METHODS]({ commit, getters }, delivery) {
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

  [REFRESH_ORDER]({ commit, dispatch, state }, order) {
    if (order.SHOW_AUTH) {
      console.error(order.ERROR);
      // this.showErrors(order.ERROR, false);
    }

    dispatch('cart/getFromSOA', order, { root: true });

    commit('SET_DATA', order);


    dispatch(SET_USER_PROPERTIES, order.ORDER_PROP.properties);
    dispatch(SET_SHIPPING_METHODS, order.DELIVERY);
    dispatch(SET_PAYMENT_METHODS, order.PAY_SYSTEM);

    // order.PERSON_TYPE{}
    const person = Object.values(order.PERSON_TYPE).find(item => item.CHECKED === 'Y');
    commit('SET_PERSON_TYPE', person.ID);
  },


  sendRequest({ state, getters, dispatch }, data) {
    const sessid = global.BX && global.BX.bitrix_sessid
      ? global.BX.bitrix_sessid()
      : '';

    const request = {
      order: getters.getAllFormData,
      via_ajax: 'Y',
      action: 'refreshOrderAjax',
      SITE_ID: state.soaData.siteID,
      signedParamsString: state.soaData.signedParamsString,
      sessid,
      ...data,
    };

    return new Promise((resolve, reject) => {
      Api.getSoaData(
        state.soaData.ajaxUrl,
        request,
        (result) => {
          if (result.order) {
            dispatch('REFRESH_ORDER', result.order);
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
        },
        (err) => {
          console.error(err.message);
          reject();
        },
      );
    });
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
    state.propertyList.forEach(async (item) => {
      const { errors } = await validate(item.value, {
        required: item.required,
        email: item.type === 'email',
      }, {
        name: item.title,
      });

      if (errors.length) {
        error.push(errors[0]);
      }
    });
    dispatch('SET_ERRORS', { PROPERTY: error });
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

  // showErrors({ commit, dispatch }, error) {
  //   Object.keys(error).forEach(key => {
  //     const message = error[key];
  //     if (Array.isArray(message)) {
  //       message.forEach((item) => {
  //         dispatch(ADD_TOAST_MESSAGE, { title: item }, { root: true });
  //       });
  //     } else {
  //       dispatch(ADD_TOAST_MESSAGE, { title: message }, { root: true });
  //     }
  //   });
  // },
};

// mutations
const mutations = {
  SET_DATA(state, order) {
    state.result = {
      TOTAL: order.TOTAL,
      LOCAL_STORE: order.LOCAL_STORE === 'Y',
      CURRENT_STORE: order.CURRENT_STORE,
      BUYER_STORE: order.BUYER_STORE,
    };
  },
  SET_SOA(state, param) {
    state.soaData = {
      signedParamsString: param.signedParamsString,
      siteID: param.siteID,
      ajaxUrl: param.ajaxUrl,
    };
  },
  SET_CHECKOUT_STATUS(state, status) {
    state.checkoutStatus = status;
  },
  SET_CURRENT_STEP(state, { key }) {
    state.currentStepName = key;
  },
  SET_PROPERTY_LIST(state, propertyList) {
    state.propertyList = propertyList;
  },

  [SET_SHIPPING_METHODS](state, deliveryList) {
    state.delivery = deliveryList;
  },
  [SET_SHIPPING](state, id) {
    state.selectedShippingMethodId = id;
  },

  [SET_PAYMENT_METHODS](state, paymentMethods) {
    state.paymentMethods = paymentMethods;
  },
  [SET_PAYMENT](state, id) {
    state.selectedPaymentMethodId = id;
  },
  // SET_SELECTED_PAYMENT_METHOD(state, { id }) {
  //   state.selectedPaymentMethod = id;
  // },

  SET_PERSON_TYPE(state, id) {
    state.personType = id;
  },

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
