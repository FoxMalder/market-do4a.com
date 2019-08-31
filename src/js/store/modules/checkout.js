import * as Api from '../../api';
import { ADD_TOAST_MESSAGE } from './notifications';

const REFRESH_ORDER = 'REFRESH_ORDER';
const SET_SHIPPING_METHODS = 'SET_SHIPPING_METHODS';
const SET_PAYMENT_METHODS = 'SET_PAYMENT_METHODS';
const SET_SHIPPING = 'SET_SELECTED_SHIPPING_METHOD_ID';
const SET_PAYMENT = 'SET_PAYMENT_SHIPPING_METHOD_ID';


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
  getLocationProperty: (state) => {
    state.propertyList.find;
  },
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
};

// actions
const actions = {
  initSoa({ commit, dispatch }, soa) {
    commit('SET_SOA', soa);
    dispatch('refreshOrder', soa.result);
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

  refreshOrder({ commit, dispatch, state }, order) {
    if (order.SHOW_AUTH) {
      console.error(order.ERROR);
      // this.showErrors(order.ERROR, false);
    }

    dispatch('cart/getFromSOA', order, { root: true });

    commit('SET_DATA', order);


    // const locationProperty = order.ORDER_PROP.properties.find(property => property.IS_LOCATION === 'Y');
    const propertyList = order.ORDER_PROP.properties.map(property => ({
      id: property.ID,
      name: property.NAME,
      code: property.CODE,
      description: property.DESCRIPTION,
      fieldName: `ORDER_PROP_${property.ID}`,
      value: property.VALUE[0],
      required: property.REQUIRED === 'Y',
      isLocation: property.IS_LOCATION === 'Y',
    }));
    commit('SET_PROPERTY_LIST', propertyList);


    dispatch(SET_SHIPPING_METHODS, order.DELIVERY);
    dispatch(SET_PAYMENT_METHODS, order.PAY_SYSTEM);

    const person = Object.values(order.PERSON_TYPE).find(item => item.CHECKED === 'Y');
    commit('SET_PERSON_TYPE', person.ID);
  },


  sendRequest({ state, dispatch }, data) {
    const sessid = global.BX && global.BX.bitrix_sessid
      ? global.BX.bitrix_sessid()
      : '';

    const request = {
      order: {
        DELIVERY_ID: state.selectedShippingMethodId,
        PAY_SYSTEM_ID: state.selectedPaymentMethodId,
        BUYER_STORE: state.result.BUYER_STORE,
        PERSON_TYPE: state.personType,
        action: 'saveOrderAjax',
        location_type: 'code',
        sessid,
      },
      via_ajax: 'Y',
      action: 'refreshOrderAjax',
      SITE_ID: state.soaData.siteID,
      signedParamsString: state.soaData.signedParamsString,
      sessid,
      ...data,
    };

    state.propertyList.forEach((item) => {
      request.order[item.fieldName] = item.value;
    });

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
    // const savedPaymentMethods = [...state.paymentMethods];
    // const paymentMethods = savedPaymentMethods.map(item => ({
    //   ...item,
    //   checked: item.id === payment.id,
    // }));
    // commit('SET_PAYMENT_METHODS', paymentMethods);
    dispatch('sendRequest');
    commit(SET_PAYMENT, id);
  },

  [SET_SHIPPING]({ commit, dispatch }, { id }) {
    // const savedShippingMethods = [...state.delivery];
    // const shippingMethods = savedShippingMethods.map(item => ({
    //   ...item,
    //   checked: item.id === delivery.id,
    // }));
    // commit('SET_SHIPPING_METHODS', shippingMethods);
    dispatch('sendRequest');
    commit(SET_SHIPPING, id);
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

  checkout({ commit, dispatch, state }) {
    if (!state.selectedPaymentMethodId) {
      dispatch(ADD_TOAST_MESSAGE, { title: 'Не выбран метод оплаты' }, { root: true });
      return 0;
    }
    if (!state.selectedShippingMethodId) {
      dispatch(ADD_TOAST_MESSAGE, { title: 'Не выбран способ доставки' }, { root: true });
      return 0;
    }
    return 0;
  },
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
