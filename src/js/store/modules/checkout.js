import * as Api from '../../api';

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
  // selectedShippingMethodId: null,
  paymentMethods: [],
  // selectedPaymentMethodId: null,
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
  visibleShippingMethods: (state) => {
    if (state.result.LOCAL_STORE === 'N') {
      return state.delivery.filter(item => !item.errors);
    }
    if (state.result.LOCAL_STORE === 'Y') {
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
    return [];
  },
};

// actions
const actions = {
  initSoa({ commit, dispatch }, soa) {
    commit('SET_SOA', soa);
    dispatch('refreshOrder', soa.result);
  },
  refreshOrder({ commit }, order) {
    if (order.SHOW_AUTH) {
      console.error(order.ERROR);
      // this.showErrors(order.ERROR, false);
    }

    commit('SET_DATA', order);

    const propertyList = order.ORDER_PROP.properties.map(property => ({
      id: property.ID,
      name: property.NAME,
      code: property.CODE,
      description: property.DESCRIPTION,
      fieldName: `ORDER_PROP_${property.ID}`,
      value: property.VALUE[0],
      required: property.REQUIRED === 'Y',
    }));

    commit('SET_PROPERTY_LIST', propertyList);


    const deliveryList = Object.values(order.DELIVERY)
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

    commit('SET_SHIPPING_METHODS', deliveryList);


    const paymentMethods = order.PAY_SYSTEM
      .sort((a, b) => {
        const sort = parseInt(a.SORT, 10) - parseInt(b.SORT, 10);
        if (sort === 0) {
          if (a.NAME.toLowerCase() > b.NAME.toLowerCase()) return 1;
          if (a.NAME.toLowerCase() < b.NAME.toLowerCase()) return -1;
        }
        return sort;
      })
      .map(item => ({
        id: item.ID,
        name: item.NAME,
        checked: item.CHECKED === 'Y',
        description: item.DESCRIPTION,
        isCash: item.IS_CASH === 'Y',
      }));

    commit('SET_PAYMENT_METHODS', paymentMethods);
  },

  selectPaymentMethod({ commit, state }, payment) {
    const savedPaymentMethods = [...state.paymentMethods];
    const paymentMethods = savedPaymentMethods.map(item => ({
      ...item,
      checked: item.id === payment.id,
    }));
    commit('SET_PAYMENT_METHODS', paymentMethods);
    // commit('SELECT_PAYMENT_METHOD_ID', payment);
    // commit('SET_SELECTED_PAYMENT_METHOD_ID', payment);
  },

  selectShippingMethod({ commit, state }, delivery) {
    const savedShippingMethods = [...state.delivery];
    const shippingMethods = savedShippingMethods.map(item => ({
      ...item,
      checked: item.id === delivery.id,
    }));
    commit('SET_SHIPPING_METHODS', shippingMethods);
  },
  setStep({ commit }, step) {
    commit('SET_CURRENT_STEP', step);
  },
  refreshOrderAjax({ dispatch }) {
    const sessid = global.BX && global.BX.bitrix_sessid
      ? global.BX.bitrix_sessid()
      : '';

    const data = {
      order: {
        sessid,
      },
      via_ajax: 'Y',
      action: 'refreshOrderAjax',
      SITE_ID: state.soaData.siteID,
      signedParamsString: state.soaData.signedParamsString,
      sessid,
    };

    Api.getSoaData(
      state.soaData.ajaxUrl,
      data,
      (result) => {
        dispatch('refreshOrder', result.order);
      },
      (err) => {
        console.error(err.message);
      },
    );
  },
  enterCoupon({ commit, state, dispatch }, coupon) {
    const sessid = global.BX && global.BX.bitrix_sessid
      ? global.BX.bitrix_sessid()
      : '';

    const data = {
      order: {
        sessid,
      },
      via_ajax: 'Y',
      action: 'enterCoupon', // 'refreshOrderAjax',
      SITE_ID: state.soaData.siteID,
      signedParamsString: state.soaData.signedParamsString,
      sessid,
      coupon,
    };


    return new Promise((resolve, reject) => {
      Api.getSoaData(
        state.soaData.ajaxUrl,
        data,
        (result) => {
          if (result.order) {
            resolve();
            dispatch('refreshOrder', result.order);
            alert('Промокод применён');
          } else {
            reject();
            alert('Промокод не найден, возможно, он работает только в стационарных магазинах');
          }
        },
        (err) => {
          console.error(err.message);
          reject();
        },
      );
    });
  },
  removeCoupon({ commit }) {

  },
};

// mutations
const mutations = {
  SET_DATA(state, order) {
    state.result = {
      TOTAL: order.TOTAL,
      LOCAL_STORE: order.LOCAL_STORE,
      CURRENT_STORE: order.CURRENT_STORE,
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
  SET_SHIPPING_METHODS(state, deliveryList) {
    state.delivery = deliveryList;
  },
  SET_PAYMENT_METHODS(state, paymentMethods) {
    state.paymentMethods = paymentMethods;
  },
  // SET_SELECTED_PAYMENT_METHOD_ID(state, { id }) {
  //   state.selectedPaymentMethod = id;
  // },
  // SELECT_PAYMENT_METHOD_ID(state, { id }) {
  //   state.paymentMethods
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
