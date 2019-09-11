/* eslint-disable no-shadow,no-param-reassign */
import axios from 'axios';
import unionBy from 'lodash.unionby';
import { validate, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import * as Api from '../../api';
import Utils from '../../utils/utils';
import { ADD_TOAST_MESSAGE } from './notifications';

// const REFRESH_ORDER = 'REFRESH_ORDER';
// const SET_TOTAL = 'SET_TOTAL';
const SET_CURRENT_STORE = 'SET_CURRENT_STORE';

const SET_PROPERTY_LIST = 'SET_PROPERTY_LIST';
const SET_PROPERTY_GROUPS = 'SET_PROPERTY_GROUPS';

// const SET_SHIPPING_METHODS = 'SET_SHIPPING_METHODS';
// const SET_PAYMENT_METHODS = 'SET_PAYMENT_METHODS';

const SET_SHIPPING = 'SET_SELECTED_SHIPPING_METHOD_ID';
const SET_PAYMENT = 'SET_SELECTED_PAYMENT_METHOD_ID';

extend('required', {
  ...required,
  message: 'Поле "{_field_}" должно быть заполнено',
});


extend('email', {
  ...email,
  message: 'Введите корректный email',
});


const Id = (i => () => i += 1)(0);

export {
  SET_SHIPPING as SET_SHIPPING_METHOD,
  SET_PAYMENT as SET_PAYMENT_METHOD,
};

export const param = {
  siteID: '',
  ajaxUrl: '/local/components/custom/sale.order.ajax/ajax.php',
  signedParamsString: '',
  locale: {},
  result: [],
};


// const getters = {
//   productListByOrderId: state => id => state.productList.filter(item => item.id === id),
//   paymentMethodsByOrderId: state => id => state.paymentMethods.filter(item => item.id === id),
//   deliveryMethodsByOrderId: state => id => state.deliveryMethods.filter(item => item.id === id),
// };


/**
 * Преобразует и сортирует список методов оплаты
 *
 * @param payments { Array } - Список в формате Битрикса ( order.PAY_SYSTEM )
 * @returns { Array } - Список в собственном формате
 */
function mappingPaymentMethods(payments) {
  return payments
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
}


/**
 * Преобразует, сортирует и фильтрует список методов доставки
 *
 * @param deliveryMethods { Object } - Список в формате Битрикса ( order.DELIVERY )
 * @param isLocaleStore { Boolean } - Тип заказа (магазин или ЦС)
 * @returns { Array } - Список в собственном формате
 */
function mappingDeliveryMethods(deliveryMethods, isLocaleStore = false) {
  const filtredDeliveryMethods = Object.values(deliveryMethods)
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
      description: item.DESCRIPTION || null,
      period: item.PERIOD_TEXT || null,
      type: item.TYPE,
      logoUrl: item.LOGOTIP ? item.LOGOTIP.SRC : '',
    }));

  if (isLocaleStore) {
    let courier = null;
    let pickup = null;

    filtredDeliveryMethods.forEach((item) => {
      if (item.type === 'C') {
        courier = item;
      }
      if (item.type === 'P') {
        pickup = item;
      }
    });

    return [pickup, courier].filter(item => item);
  }
  return filtredDeliveryMethods.filter(item => !item.errors);
}


/**
 * Преобразует список итоговых цен
 *
 * @param total { Object } - Список в формате Битрикса ( order.TOTAL )
 * @returns { Object } - Список в собственном формате
 */
function convertTotal(total) {
  return {
    PRICE_WITHOUT_DISCOUNT_VALUE: parseFloat(total.PRICE_WITHOUT_DISCOUNT_VALUE),
    ORDER_TOTAL_PRICE: parseFloat(total.ORDER_TOTAL_PRICE),
    DELIVERY_PRICE: parseFloat(total.DELIVERY_PRICE),
    DISCOUNT_PRICE: parseFloat(total.DISCOUNT_PRICE),
    ORDER_PRICE: parseFloat(total.ORDER_PRICE),
  };
}


/**
 * Преобразует список товаров в заказе
 *
 * @param rows { Object } - Список в формате Битрикса ( order.GRID.ROWS )
 * @returns { Array } - Список в собственном формате
 */
function convertProducts(rows) {
  return Object.keys(rows).map((key) => {
    const { data } = rows[key];
    return {
      basketItemId: parseInt(data.ID, 10),
      productId: parseInt(data.PRODUCT_ID, 10),
      name: data.NAME,
      canBuy: data.CAN_BUY === 'Y',

      quantity: parseInt(data.QUANTITY, 10), // Количество
      // quantity_max: 10,

      price: parseFloat(data.PRICE), // Цена за единицу
      priceBase: parseFloat(data.BASE_PRICE), // Цена за единицу без скидки
      price_benefit: parseFloat(data.DISCOUNT_PRICE), // Скидка за единицу
      sum: parseFloat(data.SUM_NUM), // Итоговая сумма за N единиц
      sumBase: parseFloat(data.SUM_BASE), // Итоговая сумма за N единиц без скидки
      sumDiscount:
        parseFloat(data.SUM_BASE) - parseFloat(data.SUM_NUM), // Итоговая скидка за N единиц

      url: data.DETAIL_PAGE_URL,
      picture: data.DETAIL_PICTURE_SRC,
      picture2x: data.DETAIL_PICTURE_SRC_2X,

      measureName: data.MEASURE_NAME, // Единица измерения ("шт" и т.д)
    };
  });
}


/**
 * Преобразует и сортирует группы свойств
 *
 * @param groups { Object } - Список в формате Битрикса ( order.ORDER_PROP.groups )
 * @returns { Array } - Список в собственном формате
 */
function convertPropertyGroups(groups) {
  return Object.values(groups)
    .sort((a, b) => parseInt(a.SORT, 10) - parseInt(b.SORT, 10))
    .map(group => ({
      id: parseInt(group.ID, 10),
      name: group.NAME,
      personTypeId: parseInt(group.PERSON_TYPE_ID, 10),
    }));
}


/**
 * Преобразует и сортирует список свойств
 *
 * @param properties { Array } - Список в формате Битрикса ( order.ORDER_PROP.properties )
 * @returns { Array } - Список в собственном формате
 */
function convertPropertyList(properties) {
  return properties
    .sort((a, b) => parseInt(a.SORT, 10) - parseInt(b.SORT, 10))
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
        error: '',
        // pattern: property.PATTERN,
        // minlength: parseInt(property.MINLENGTH, 10),
        // maxlength: parseInt(property.MAXLENGTH, 10),
        // multiple: property.MULTIPLE === 'Y',
        // multiline: property.MULTILINE === 'Y',
      };

      switch (property.TYPE) {
        case 'STRING':
          prop.type = 'text';
          break;
        case 'DATE':
          prop.type = 'date';
          break;
        case 'NUMBER':
          prop.type = 'number';
          break;
        case 'LOCATION':
          prop.type = 'location';
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
}


export default function createModule(options) {
  // param.locale = options.locale;
  param.siteID = options.siteID;
  param.ajaxUrl = options.ajaxUrl;
  param.signedParamsString = options.signedParamsString;
  param.result = options.result;
  param.basketHasRemoteProducts = options.basketHasRemoteProducts;

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

    propertyDescription: '',

    checkoutStatus: null,

    buyerStore: null,
    personTypeId: null,
    locationName: '',
    isKnownCity: false,
    knownCityName: [],

    errors: {
      PROPERTY: [],
      PAY_SYSTEM: [],
      DELIVERY: [],
      AUTH: [],
    },

    // New:
    orderList: [
      /*
        {
          storeId,
          deliveryId,
          paymentId,
          paymentMethods,
          deliveryMethods,
          productList,
        }
       */
    ],
    propertyGroups: [],
    propertyList: [],
  };

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


    // New
    productTotalCount: state => state.orderList.reduce((accumulator, order) => accumulator + order.productList.length, 0),
    getAllFormData: state => (storeId) => {
      const order = state.orderList.find(item => item.storeId === storeId);

      const data = {
        DELIVERY_ID: order.deliveryId,
        PAY_SYSTEM_ID: order.paymentId,
        // BUYER_STORE: state.buyerStore,
        PERSON_TYPE: state.personTypeId,
        ORDER_DESCRIPTION: state.propertyDescription,
        action: 'saveOrderAjax',
        location_type: 'code',
        sessid: Utils.sessid(),
      };

      state.propertyList.forEach((prop) => {
        data[prop.name] = prop.value;
      });

      return data;
    },
  };

  const actions = {
    async getAll({ commit, dispatch }) {
      commit('SET_PARAM', param.result);
      commit('SET_CHECKOUT_STATUS', 'loading');

      const orderList = [];
      const propertyGroups = { ...param.result.ORDER_PROP.groups };
      const propertyList = [...param.result.ORDER_PROP.properties];

      // order.DELIVERY: Object
      const deliveryMethods = mappingDeliveryMethods(param.result.DELIVERY, param.result.LOCAL_STORE === 'Y');
      const checkedDelivery = deliveryMethods.find(item => item.checked) || null;

      // order.PAY_SYSTEM: Array
      const paymentMethods = mappingPaymentMethods(param.result.PAY_SYSTEM);
      const checkedPayment = checkedDelivery ? paymentMethods.find(item => item.checked) : null;

      orderList.push({
        index: 1,
        storeId: window.app.storeId,
        isLocaleStore: param.result.LOCAL_STORE === 'Y',
        productList: convertProducts(param.result.GRID.ROWS),
        total: convertTotal(param.result.TOTAL),
        deliveryMethods,
        paymentMethods,
        deliveryId: checkedDelivery ? checkedDelivery.id : null,
        paymentId: checkedPayment ? checkedPayment.id : null,
      });

      if (options.basketHasRemoteProducts) {
        const request = {
          order: {
            sessid: Utils.sessid(),
            action: 'saveOrderAjax',
            location_type: 'code',
          },
          via_ajax: 'Y',
          action: 'refreshOrderAjax',
          SITE_ID: param.siteID,
          signedParamsString: param.signedParamsString,
          sessid: Utils.sessid(),
          storeId: window.app.storeRemoteId,
        };

        propertyList.forEach((prop) => {
          // eslint-disable-next-line prefer-destructuring
          request.order[`ORDER_PROP_${prop.ID}`] = prop.VALUE[0];
        });

        const { order } = await Api.fetchSaleOrderAjax(param.ajaxUrl, request);
        param.result = [param.result, order];

        // order.DELIVERY: Object
        const deliveryMethods = mappingDeliveryMethods(order.DELIVERY);
        const checkedDelivery = deliveryMethods.find(item => item.checked) || null;

        // order.PAY_SYSTEM: Array
        const paymentMethods = mappingPaymentMethods(order.PAY_SYSTEM);
        const checkedPayment = checkedDelivery ? paymentMethods.find(item => item.checked) : null;

        // order.ORDER_PROP.groups: Object
        Object.assign(propertyGroups, order.ORDER_PROP.groups);

        // order.ORDER_PROP.properties: Array
        order.ORDER_PROP.properties.forEach((group) => {
          if (propertyList.find(item => item.id === group.id) === 'undefined') {
            propertyList.push(group);
          }
        });

        orderList.push({
          index: 2,
          storeId: window.app.storeRemoteId,
          isLocaleStore: false,
          productList: convertProducts(order.GRID.ROWS),
          total: convertTotal(order.TOTAL),
          deliveryMethods,
          paymentMethods,
          deliveryId: checkedDelivery ? checkedDelivery.id : null,
          paymentId: checkedPayment ? checkedPayment.id : null,
        });
      }


      commit('SET_ORDER_LIST', orderList);
      dispatch(SET_PROPERTY_GROUPS, propertyGroups);
      dispatch(SET_PROPERTY_LIST, propertyList);


      commit('SET_CHECKOUT_STATUS', null);
    },

    refreshOrder({ commit, dispatch }, payloads) {
      const propertyGroups = {};
      const propertyList = [];

      const orderList = payloads.map((result) => {
        const { order, oldOrderData } = result;

        if (!order) {
          return oldOrderData;
        }

        if (order.SHOW_AUTH) {
          console.error(order.ERROR);
        }

        // order.ORDER_PROP.groups: Object
        Object.assign(propertyGroups, order.ORDER_PROP.groups);

        // order.ORDER_PROP.properties: Array
        order.ORDER_PROP.properties.forEach((group) => {
          if (propertyList.find(item => item.id === group.id) === 'undefined') {
            propertyList.push(group);
          }
        });

        // order.DELIVERY: Object
        const deliveryMethods = mappingDeliveryMethods(order.DELIVERY, oldOrderData.isLocaleStore);
        const checkedDelivery = deliveryMethods.find(item => item.checked) || null;

        // order.PAY_SYSTEM: Array
        const paymentMethods = mappingPaymentMethods(order.PAY_SYSTEM);
        const checkedPayment = checkedDelivery ? paymentMethods.find(item => item.checked) : null;


        return {
          ...oldOrderData,
          deliveryMethods,
          paymentMethods,
          deliveryId: checkedDelivery ? checkedDelivery.id : null,
          paymentId: checkedPayment ? checkedPayment.id : null,
          productList: convertProducts(order.GRID.ROWS),
          total: convertTotal(order.TOTAL),
        };
      });

      commit('SET_ORDER_LIST', orderList);
      dispatch(SET_PROPERTY_GROUPS, propertyGroups);
      dispatch(SET_PROPERTY_LIST, propertyList);
    },

    sendRequest({ state, getters }, data) {
      const request = {
        via_ajax: 'Y',
        SITE_ID: param.siteID,
        signedParamsString: param.signedParamsString,
        sessid: Utils.sessid(),
        action: 'refreshOrderAjax',
        ...data,
      };

      return Promise.all(state.orderList.map(
        order => Api.fetchSaleOrderAjax(param.ajaxUrl, {
          ...request,
          order: getters.getAllFormData(order.storeId),
          storeId: order.storeId,
        }).then(result => ({ ...result, oldOrderData: order })),
      ));
    },

    [SET_PROPERTY_GROUPS]({ commit }, groups) {
      commit(SET_PROPERTY_GROUPS, convertPropertyGroups(groups));
    },

    [SET_PROPERTY_LIST]({ commit }, properties) {
      commit(SET_PROPERTY_LIST, convertPropertyList(properties));
    },


    // refreshOrder({ dispatch, commit }, order) {
    //   if (order.SHOW_AUTH) {
    //     console.error(order.ERROR);
    //   }
    //
    //   if (order.ROWS) {
    //     dispatch('cart/getFromSOA', order, { root: true });
    //   }
    //   if (order.TOTAL) {
    //     commit(SET_TOTAL, order.TOTAL);
    //   }
    //   if (order.ORDER_PROP) {
    //     dispatch(SET_PROPERTY_LIST, order.ORDER_PROP.properties);
    //   }
    //   if (order.DELIVERY) {
    //     dispatch(SET_SHIPPING_METHODS, order.DELIVERY);
    //   }
    //   if (order.PAY_SYSTEM) {
    //     dispatch(SET_PAYMENT_METHODS, order.PAY_SYSTEM);
    //   }
    // },


    // sendRequest({ getters, dispatch }, data, orderId = 0) {
    //   const request = {
    //     order: getters.getAllFormData,
    //     via_ajax: 'Y',
    //     action: 'refreshOrderAjax',
    //     SITE_ID: param.siteID,
    //     signedParamsString: param.signedParamsString,
    //     sessid: Utils.sessid(),
    //     ...data,
    //   };
    //
    //   // return Api.fetchSaleOrderAjax(param.ajaxUrl, request);
    //
    //   return new Promise((resolve, reject) => {
    //     Api.fetchSaleOrderAjax(param.ajaxUrl, request)
    //       .then((result) => {
    //         if (result.order) {
    //           dispatch('refreshOrder', result.order);
    //
    //           if (result.order.ERROR) {
    //             dispatch('SET_ERRORS', result.order.ERROR);
    //           }
    //         }
    //
    //         resolve(result);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },

    async refreshOrderAjax({ commit, dispatch }) {
      commit('SET_CHECKOUT_STATUS', 'loading');
      await dispatch('refreshOrder', await dispatch('sendRequest', { action: 'refreshOrderAjax' }));
      commit('SET_CHECKOUT_STATUS', null);
    },

    // saveOrderAjax({ dispatch }) {
    //   return dispatch('sendRequest', { action: 'saveOrderAjax' })
    // },

    async enterCoupon({ commit, dispatch }, coupon) {
      commit('SET_CHECKOUT_STATUS', 'loading');
      const resultList = await dispatch('sendRequest', { action: 'enterCoupon', coupon });

      const { order } = resultList[0];
      let notify = null;

      if (order) {
        switch (order.COUPON_LIST[order.COUPON_LIST.length].JS_STATUS) {
          case 'ENTERED':
            notify = {
              title: 'Промокод не применён',
            };
            break;
          case 'APPLIED':
            notify = {
              title: 'Промокод применён',
            };
            break;
          case 'BAD':
            notify = {
              title: 'Промокод не применён',
              text: order.COUPON_LIST[order.COUPON_LIST.length].STATUS_TEXT,
            };
            break;
          default:
            notify = {
              title: 'Промокод не найден',
              text: 'Возможно, он работает только в стационарных магазинах',
            };

        }
      } else {
        notify = {
          title: 'Промокод не найден',
          text: 'Возможно, он работает только в стационарных магазинах',
        };
      }

      dispatch(ADD_TOAST_MESSAGE, notify, { root: true });

      await dispatch('refreshOrder', resultList);
      commit('SET_CHECKOUT_STATUS', null);
    },

    // removeCoupon({ dispatch }) {
    //   return dispatch('sendRequest', { action: 'removeCoupon' })
    //     .then((result) => {
    //       if (!result.order) {
    //         // this.removeCouponItem(result);
    //         console.log('removeCouponItem');
    //       }
    //     });
    // },


    [SET_PAYMENT]({ commit, dispatch }, { id, storeId }) {
      commit('SET_ERRORS', { PAY_SYSTEM: [] });
      // const savedPaymentMethods = [...state.paymentMethods];
      // const paymentMethods = savedPaymentMethods.map(item => ({
      //   ...item,
      //   checked: item.id === payment.id,
      // }));
      // commit('SET_PAYMENT_METHODS', paymentMethods);
      commit(SET_PAYMENT, { id, storeId });

      dispatch('refreshOrderAjax');
    },

    [SET_SHIPPING]({ commit, dispatch }, { id, storeId }) {
      // const savedShippingMethods = [...state.delivery];
      // const shippingMethods = savedShippingMethods.map(item => ({
      //   ...item,
      //   checked: item.id === delivery.id,
      // }));
      // commit('SET_SHIPPING_METHODS', shippingMethods);
      commit('SET_ERRORS', { DELIVERY: [] });
      commit(SET_SHIPPING, { id, storeId });

      dispatch('refreshOrderAjax');
    },

    async validatePropsData({ state }) {
      let error = false;

      await Promise.all(state.propertyList.map(async (item) => {
        if (item.required && item.value === '') {
          item.error = 'Заполните это поле';
          error = true;
          return;
        }

        if (item.type === 'email') {
          const { errors } = await validate(item.value, 'email');

          if (errors.length > 0) {
            item.error = 'Введите верный email';
            error = true;
          }
        }
      }));

      return error;
    },

    async setStep({ commit, dispatch }, step) {
      if (step.key === 'final') {
        dispatch('checkout');
      } else if (step.key === 'shipping-and-payment') {
        if (await dispatch('validatePropsData')) {
          Utils.scrollTo(document.getElementById('order-props'));
          return;
        }
        commit('SET_CURRENT_STEP', step);
        Utils.scrollTo(document.querySelector('.cart'));
      } else if (step.key === 'form') {
        commit('SET_CURRENT_STEP', step);
        Utils.scrollTo(document.querySelector('.cart'));
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

    async checkout({ state, commit, dispatch }) {
      if (await dispatch('validatePropsData')) {
        Utils.scrollTo(document.getElementById('order-props'));
        return;
      }

      const err = {};
      state.orderList.forEach((order) => {
        if (!order.deliveryId) {
          err.DELIVERY = ['Не выбран способ доставки'];
        }
        if (!order.paymentId) {
          err.PAY_SYSTEM = ['Не выбран метод оплаты'];
        }
      });
      if (err.PAY_SYSTEM || err.DELIVERY) {
        dispatch('SET_ERRORS', err);
        return;
      }

      commit('SET_CHECKOUT_STATUS', 'loading');
      const resultList = await dispatch('sendRequest', { action: 'saveOrderAjax' });

      resultList.forEach((result) => {
        console.log(result);
        const { order } = result;

        if (!order) {
          return;
        }

        if (order.ERROR) {
          commit('SET_ERRORS', order.ERROR);
        }
      });

      // axios
      //   .post('/checkout/', context.getters.getAllFormData)
      //   .then(response => response.data)
      //   .then((result) => {
      //     if (result && result.order) {
      //       const { order } = result;
      //
      //       if (result.SHOW_AUTH) {
      //         console.error('SHOW_AUTH not implemented');
      //       } else {
      //         if (order.REDIRECT_URL && order.REDIRECT_URL.length) {
      //           document.location.href = order.REDIRECT_URL;
      //         }
      //
      //         if (order.ERROR) {
      //           context.commit('SET_ERRORS', order.ERROR);
      //           // dispatch('showErrors', order.ERROR);
      //         }
      //       }
      //     }
      //
      //     context.commit('SET_CHECKOUT_STATUS', null);
      //   })
      //   .catch(() => {
      //     context.commit('SET_CHECKOUT_STATUS', 'error');
      //     setTimeout(() => context.commit('SET_CHECKOUT_STATUS', null), 1000);
      //   });
    },
  };

  const mutations = {
    SET_PARAM: (state, result) => {
      state.locationName = result.LOCKED_LOCATION_NAME || '';
      // state.isLocaleStore = result.LOCAL_STORE === 'Y';
      state.isKnownCity = result.KNOWN_CITY === 'Y';
      state.knownCityName = result.KNOWN_CITY_NAME_DECLENSION || [];
      state.buyerStore = parseInt(result.BUYER_STORE, 10);
      state.personTypeId = Object.values(result.PERSON_TYPE).find(item => item.CHECKED === 'Y').ID;
    },

    SET_CHECKOUT_STATUS: (state, status) => {
      state.checkoutStatus = status;
    },
    SET_CURRENT_STEP(state, { key }) {
      state.currentStepName = key;
    },

    // [SET_PROPERTY_LIST]: (state, propertyList) => {
    //   state.propertyList = propertyList;
    // },
    //
    // [SET_CURRENT_STORE]: (state, store) => {
    //   state.currentStore = {
    //     ...state.currentStore,
    //     ...store,
    //   };
    // },

    // [SET_SHIPPING_METHODS]: (state, deliveryList) => {
    //   state.delivery = deliveryList;
    // },
    [SET_SHIPPING]: (state, { id, storeId }) => {
      const currentOrder = state.orderList.find(item => item.storeId === storeId);
      currentOrder.deliveryId = id;
    },

    // [SET_PAYMENT_METHODS]: (state, paymentMethods) => {
    //   state.paymentMethods = paymentMethods;
    // },
    [SET_PAYMENT]: (state, { id, storeId }) => {
      const currentOrder = state.orderList.find(item => item.storeId === storeId);
      currentOrder.paymentId = id;
    },
    // [SET_TOTAL]: (state, total) => {
    //   state.total = {
    //     ...state.total,
    //     ...total,
    //   };
    // },
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
      // Object.assign(state.errors, errors);
    },

    // NEW:
    SET_ORDER_LIST: (state, orderList) => {
      state.orderList = orderList;
    },

    [SET_PROPERTY_GROUPS]: (state, propertyGroups) => {
      state.propertyGroups = propertyGroups;
    },

    [SET_PROPERTY_LIST]: (state, propertyList) => {
      state.propertyList = propertyList;
    },
  };

  return {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
}
