/* eslint-disable no-shadow,no-param-reassign */
import axios from 'axios';
import Vue from 'vue';
// import unionBy from 'lodash.unionby';
import { validate, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

import * as Api from '../../api';
import Utils from '../../utils/utils';
import { ADD_TOAST_MESSAGE } from './notifications';

// const REFRESH_ORDER = 'REFRESH_ORDER';
// const SET_TOTAL = 'SET_TOTAL';
// const SET_CURRENT_STORE = 'SET_CURRENT_STORE';

const SET_PROPERTY_LIST = 'SET_PROPERTY_LIST';
const SET_PROPERTY_GROUPS = 'SET_PROPERTY_GROUPS';

// const SET_SHIPPING_METHODS = 'SET_SHIPPING_METHODS';
// const SET_PAYMENT_METHODS = 'SET_PAYMENT_METHODS';

const SET_SHIPPING = 'SET_SELECTED_SHIPPING_METHOD_ID';
const SET_PAYMENT = 'SET_SELECTED_PAYMENT_METHOD_ID';
const SET_STORE = 'SET_SELECTED_STORE_ID';
const REMOVE_ORDER = 'REMOVE_ORDER';

extend('required', {
  ...required,
  message: 'Поле "{_field_}" должно быть заполнено',
});


extend('email', {
  ...email,
  message: 'Введите корректный email',
});


// const Id = (i => () => i += 1)(0);

export {
  SET_SHIPPING as SET_SHIPPING_METHOD,
  SET_PAYMENT as SET_PAYMENT_METHOD,
  SET_STORE,
  REMOVE_ORDER,
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


/*
  soaData: {
    result: {
      DELIVERY[]:
        CATEGORY: 'other' | 'sdek.pickup' | 'sdek' | 'courier' | 'pickup'
    }
  }
 */


function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * Преобразует и сортирует список методов оплаты
 *
 * @param   { Array } payments - Список в формате Битрикса ( order.PAY_SYSTEM )
 *
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
 * @param   { Object }  DELIVERY - Список в формате Битрикса ( order.DELIVERY )
 *
 * @returns { Array } - Список в собственном формате
 */
function mappingDeliveryMethods(DELIVERY) {
  return Object.values(DELIVERY)
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
      priceFormated: item.PRICE_FORMATED,
      name: item.NAME || '',
      ownName: item.OWN_NAME || '',
      description: item.DESCRIPTION || '',
      period: item.PERIOD_TEXT || '',
      type: item.TYPE,
      logoUrl: item.LOGOTIP ? item.LOGOTIP.SRC : '',
      category: item.CATEGORY,
    }))
    .filter(item => !item.errors);
}


/**
 * Преобразует список итоговых цен
 *
 * @param   { Object } TOTAL - Список в формате Битрикса ( order.TOTAL )
 *
 * @returns { Object } - Список в собственном формате
 */
function convertTotal(TOTAL) {
  return {
    PRICE_WITHOUT_DISCOUNT: parseFloat(TOTAL.PRICE_WITHOUT_DISCOUNT_VALUE),
    PRICE_WITHOUT_DISCOUNT_FORMATED: TOTAL.PRICE_WITHOUT_DISCOUNT,
    ORDER_TOTAL_PRICE: parseFloat(TOTAL.ORDER_TOTAL_PRICE),
    ORDER_TOTAL_PRICE_FORMATED: TOTAL.ORDER_TOTAL_PRICE_FORMATED,
    DELIVERY_PRICE: parseFloat(TOTAL.DELIVERY_PRICE),
    DELIVERY_PRICE_FORMATED: TOTAL.DELIVERY_PRICE_FORMATED,
    DISCOUNT_PRICE: parseFloat(TOTAL.DISCOUNT_PRICE),
    DISCOUNT_PRICE_FORMATED: TOTAL.DISCOUNT_PRICE_FORMATED,
    ORDER_PRICE: parseFloat(TOTAL.ORDER_PRICE),
    ORDER_PRICE_FORMATED: TOTAL.ORDER_PRICE_FORMATED,
  };
}


/**
 * Преобразует список товаров в заказе
 *
 * @param   { Object } rows - Список в формате Битрикса ( order.GRID.ROWS )
 *
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
 * @param   { Object } groups - Список в формате Битрикса ( order.ORDER_PROP.groups )
 *
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
 * @param   { Array|Object } properties Список в формате Битрикса ( order.ORDER_PROP.properties )
 *
 * @return  { Array } Список в собственном формате
 */
function convertPropertyList(properties) {
  return (Array.isArray(properties) ? properties : Object.values(properties))
    .sort((a, b) => parseInt(a.SORT, 10) - parseInt(b.SORT, 10))
    .map((property) => {
      const prop = {
        id: parseInt(property.ID, 10),
        isDynamic: true,
        title: property.NAME || '',
        description: property.DESCRIPTION || '',
        // category:
        code: property.CODE,
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
        relationDelivery: [],
        // pattern: property.PATTERN,
        // minlength: parseInt(property.MINLENGTH, 10),
        // maxlength: parseInt(property.MAXLENGTH, 10),
        // multiple: property.MULTIPLE === 'Y',
        // multiline: property.MULTILINE === 'Y',
      };

      if (property.RELATION) {
        prop.relationDelivery = property.RELATION
          .filter(item => item.ENTITY_TYPE === 'D')
          .map(item => parseInt(item.ENTITY_ID, 10));
      }

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
  param.locations = options.locations;
  param.siteID = options.siteID;
  param.ajaxUrl = options.ajaxUrl;
  param.signedParamsString = options.signedParamsString;
  param.result = options.result;
  param.basketHasRemoteProducts = options.basketHasRemoteProducts;

  const state = {
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
          errors,
          storeId,
          deliveryId,
          paymentId,
          paymentMethods,
          deliveryMethods,
          productList,
          groupStore: [],
        }
       */
    ],
    // groupStore: options.groupStore,
    propertyGroups: [],
    propertyList: [],
    props: {
      // location: '',
      DESCRIPTION: '',
      sdekPickup: '',
    },
  };

  const getters = {
    // New
    totalQuantity: state => state.orderList.reduce((c, order) => c + order.productList.length, 0),

    totalQuantityText: (state, getters) => `${getters.totalQuantity} ${Utils.declOfNum(getters.totalQuantity, [
      'товар',
      'товара',
      'товаров',
    ])}`,

    propertyList: (state) => {
      const propertyList = {};

      state.orderList.forEach((order) => {
        order.props.forEach((prop) => {
          // propertyList[prop.code] = prop;
          propertyList[prop.code] = state.propertyList.find(item => item.code === prop.code);
        });
      });

      return Object.values(propertyList);
      // return convertPropertyList(propertyList);
    },

    orderList(state, getters, rootState, rootGetters) {
      return state.orderList.map(order => ({
        ...order,
        // productList: order.productList.map(product => ({
        //   ...rootGetters['cart/getBasketItemById'](product.basketItemId),
        //   ...product,
        // })),
        quantity: order.productList.length,
        quantityText: `${order.productList.length} ${Utils.declOfNum(order.productList.length, [
          'товар',
          'товара',
          'товаров',
        ])}`,
        paymentItem: order.paymentMethods.find(item => item.id === order.paymentId),
        deliveryItem: order.deliveryMethods.find(item => item.id === order.deliveryId),
      }));
    },

    getAllFormData: (state, getters) => (orderId) => {
      const order = getters.orderList.find(item => item.id === orderId);

      const data = {
        DELIVERY_ID: order.deliveryId,
        PAY_SYSTEM_ID: order.paymentId,
        // BUYER_STORE: order.buyerStore,
        PERSON_TYPE: state.personTypeId,
        ORDER_DESCRIPTION: state.props.DESCRIPTION,
        action: 'saveOrderAjax',
        location_type: 'code',
        sessid: Utils.sessid(),
      };

      order.props.forEach((prop) => {
        data[`ORDER_PROP_${prop.id}`] = state.props[prop.code] || '';
      });

      // state.propertyList.forEach((prop) => {
      //   switch (prop.code) {
      //     // case 'LOCATION':
      //     //   data[`ORDER_PROP_${prop.id}`] = state.props.location;
      //     //   break;
      //     case 'ADDRESS':
      //       data[`ORDER_PROP_${prop.id}`] = `${state.props.street}, ${state.props.house}, ${state.props.flat}`;
      //       break;
      //     case 'STREET':
      //       data[`ORDER_PROP_${prop.id}`] = state.props.street;
      //       break;
      //     case 'HOUSE':
      //       data[`ORDER_PROP_${prop.id}`] = state.props.house;
      //       break;
      //     // case 'CITY':
      //     //   data[`ORDER_PROP_${prop.id}`] = '';
      //     //   break;
      //     case 'FLAT':
      //       data[`ORDER_PROP_${prop.id}`] = state.props.flat;
      //       break;
      //     default:
      //       data[`ORDER_PROP_${prop.id}`] = prop.value;
      //   }
      // });


      // data.ORDER_DESCRIPTION = state.props.description;

      // state.staticPropertyList.forEach((prop) => {
      //   if (!prop.root) {
      //     data[prop.name] = prop.value;
      //   }
      // });

      if (order.deliveryItem) {
        if (order.deliveryItem.category === 'sdek.pickup') {
          data.ORDER_PROP_5 = state.props.sdekPickup;
        } else if (order.deliveryItem.category === 'sdek') {
          // const flat = state.propertyList.find(prop => prop.code === 'FLAT');
          // const house = state.propertyList.find(prop => prop.code === 'HOUSE');
          // const street = state.propertyList.find(prop => prop.code === 'STREET');
          //
          // // для сдек свои поля для улицы, кв, дом. ИХ нужно собрать для поля Адрес
          // data.ORDER_PROP_5 = `${street && street.value}, ${house && house.value}, ${flat && flat.value}`;

          data.ORDER_PROP_5 = `${state.props.STREET}, ${state.props.HOUSE}, ${state.props.FLAT}`;
        }
      }

      return data;
    },
  };

  const actions = {
    async init({ commit, dispatch, rootState }) {
      commit('SET_PARAM', options.result);
      commit('SET_CHECKOUT_STATUS', 'initialization');


      const orderList = [];
      const propertyGroups = {};
      const propertyList = {};


      if (options.result.ORDER_PROP) {
        // order.ORDER_PROP.groups: Object
        Object.assign(propertyGroups, options.result.ORDER_PROP.groups);

        // order.ORDER_PROP.properties: Array
        options.result.ORDER_PROP.properties.forEach((prop) => {
          propertyList[prop.CODE] = prop;
        });
      }

      if (!options.result.SHOW_EMPTY_BASKET) {
        const isLocaleStore = options.result.LOCAL_STORE === 'Y';

        // order.DELIVERY: Object
        const deliveryMethods = mappingDeliveryMethods(options.result.DELIVERY);
        const checkedDelivery = deliveryMethods.find(item => item.checked) || null;

        // order.PAY_SYSTEM: Array
        const paymentMethods = mappingPaymentMethods(options.result.PAY_SYSTEM);
        const checkedPayment = checkedDelivery ? paymentMethods.find(item => item.checked) : null;

        orderList.unshift({
          id: 2,
          index: 2,
          errors: [],
          storeId: rootState.storeId,
          total: convertTotal(options.result.TOTAL),
          productList: convertProducts(options.result.GRID.ROWS),
          groupStore: options.groupStore,
          isLocaleStore,
          deliveryMethods,
          paymentMethods,
          deliveryId: checkedDelivery ? checkedDelivery.id : null,
          paymentId: checkedPayment ? checkedPayment.id : null,

          // props: convertPropertyList(options.result.ORDER_PROP.properties),
          props: options.result.ORDER_PROP.properties.map(item => ({
            id: parseInt(item.ID, 10),
            code: item.CODE,
          })),
        });
      }

      if (options.basketHasRemoteProducts) {
        const request = {
          order: {
            sessid: Utils.sessid(),
            action: 'saveOrderAjax',
            location_type: 'code',
          },
          via_ajax: 'Y',
          action: 'refreshOrderAjax',
          SITE_ID: options.siteID,
          signedParamsString: options.signedParamsString,
          sessid: Utils.sessid(),
          storeId: rootState.storeRemoteId,
        };

        Object.values(propertyList).forEach((prop) => {
          // eslint-disable-next-line prefer-destructuring
          request.order[`ORDER_PROP_${prop.ID}`] = prop.VALUE[0];
        });

        const { order, groupStore } = await Api.fetchSaleOrderAjax(options.ajaxUrl, request);
        options.result = [options.result, order];

        // order.DELIVERY: Object
        const deliveryMethods = mappingDeliveryMethods(order.DELIVERY);
        const checkedDelivery = deliveryMethods.find(item => item.checked) || null;

        // order.PAY_SYSTEM: Array
        const paymentMethods = mappingPaymentMethods(order.PAY_SYSTEM);
        const checkedPayment = checkedDelivery ? paymentMethods.find(item => item.checked) : null;

        // order.ORDER_PROP.groups: Object
        Object.assign(propertyGroups, order.ORDER_PROP.groups);

        // order.ORDER_PROP.properties: Array
        order.ORDER_PROP.properties.forEach((prop) => {
          propertyList[prop.CODE] = prop;
        });

        orderList.unshift({
          id: 1,
          index: 1,
          errors: [],
          storeId: rootState.storeRemoteId,
          isLocaleStore: false,
          productList: convertProducts(order.GRID.ROWS),
          total: convertTotal(order.TOTAL),
          groupStore,
          deliveryMethods,
          paymentMethods,
          deliveryId: checkedDelivery ? checkedDelivery.id : null,
          paymentId: checkedPayment ? checkedPayment.id : null,

          // props: convertPropertyList(order.ORDER_PROP.properties),
          props: order.ORDER_PROP.properties.map(item => ({
            id: parseInt(item.ID, 10),
            code: item.CODE,
          })),
        });
      }


      commit('SET_ORDER_LIST', orderList);
      dispatch(SET_PROPERTY_GROUPS, propertyGroups);
      dispatch(SET_PROPERTY_LIST, propertyList);


      commit('SET_CHECKOUT_STATUS', null);
    },

    refreshOrder({ commit, dispatch }, payload) {
      const propertyGroups = {};
      const propertyList = {};

      const orderList = payload
        .filter(result => !result.redirect)
        .map((result) => {
          const { order, groupStore, oldOrderData } = result;

          if (!order) {
            return oldOrderData;
          }

          if (order.SHOW_AUTH) {
            console.error(order.ERROR);
          }

          // order.ORDER_PROP.groups: Object
          Object.assign(propertyGroups, order.ORDER_PROP.groups);

          // order.ORDER_PROP.properties: Array
          order.ORDER_PROP.properties.forEach((prop) => {
            // propertyList[prop.ID] = prop;
            propertyList[prop.CODE] = prop;
          });

          // const properties = convertPropertyList(order.ORDER_PROP.properties);
          //
          // properties.forEach((property) => {
          //   commit('UPDATE_PROP_BY_CODE', { code: property.code, message: property.value });
          //   commit('SET_PROPERTY', { [property.code]: property });
          // });


          // order.DELIVERY: Object
          const deliveryMethods = mappingDeliveryMethods(order.DELIVERY);
          const checkedDelivery = deliveryMethods.find(item => item.checked) || null;

          // order.PAY_SYSTEM: Array
          const paymentMethods = mappingPaymentMethods(order.PAY_SYSTEM);
          const checkedPayment = checkedDelivery ? paymentMethods.find(item => item.checked) : null;


          return {
            ...oldOrderData,
            deliveryMethods,
            paymentMethods,
            groupStore,
            deliveryId: checkedDelivery ? checkedDelivery.id : null,
            paymentId: checkedPayment ? checkedPayment.id : null,
            productList: convertProducts(order.GRID.ROWS),
            total: convertTotal(order.TOTAL),

            props: order.ORDER_PROP.properties.map(item => ({
              id: parseInt(item.ID, 10),
              code: item.CODE,
            })),

            // props: convertPropertyList(order.ORDER_PROP.properties),
          };
        });

      commit('SET_ORDER_LIST', orderList);
      dispatch(SET_PROPERTY_GROUPS, propertyGroups);
      dispatch(SET_PROPERTY_LIST, propertyList);
    },

    sendRequest({ state, getters }, data, orders) {
      // const request = {
      //   via_ajax: 'Y',
      //   SITE_ID: param.siteID,
      //   signedParamsString: param.signedParamsString,
      //   sessid: Utils.sessid(),
      //   action: 'refreshOrderAjax',
      //   ...data,
      // };

      // state.staticPropertyList.forEach((prop) => {
      //   if (prop.root) {
      //     request[prop.name] = prop.value;
      //   }
      // });

      return Promise.all((orders || state.orderList).map(
        order => Api.fetchSaleOrderAjax(param.ajaxUrl, {
          order: getters.getAllFormData(order.id),
          storeId: order.storeId,
          via_ajax: 'Y',
          SITE_ID: param.siteID,
          signedParamsString: param.signedParamsString,
          sessid: Utils.sessid(),
          action: 'refreshOrderAjax',
          ...data,
        }).then(result => ({ ...result, oldOrderData: order })),
      ));
    },

    async refreshOrderAjax({ commit, dispatch }, orders = null) {
      commit('SET_CHECKOUT_STATUS', 'loading');
      await dispatch('refreshOrder', await dispatch('sendRequest', { action: 'refreshOrderAjax' }, orders));
      commit('SET_CHECKOUT_STATUS', null);
    },

    async enterCoupon({ commit, dispatch }, coupon) {
      commit('SET_CHECKOUT_STATUS', 'loading');
      const resultList = await dispatch('sendRequest', { action: 'enterCoupon', coupon });
      commit('SET_CHECKOUT_STATUS', null);

      console.log(resultList);

      const { order } = resultList[0];
      let notify = null;
      console.log(order);

      if (order) {
        const lastCoupon = order.COUPON_LIST[order.COUPON_LIST.length - 1];
        switch (lastCoupon.JS_STATUS) {
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
              text: lastCoupon.STATUS_TEXT,
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

    clearCheckout({ state, commit, dispatch }) {
      const savedOrders = [...state.orderList];

      commit('SET_ORDER_LIST', []);

      dispatch('cart/clearCart', null, { root: true })
        .catch(() => commit('SET_ORDER_LIST', savedOrders));
    },

    [SET_PROPERTY_GROUPS]({ commit }, groups) {
      commit(SET_PROPERTY_GROUPS, convertPropertyGroups(groups));
    },

    [SET_PROPERTY_LIST]({ commit }, properties) {
      const convertedProps = convertPropertyList(properties);

      convertedProps.forEach((property) => {
        commit('UPDATE_PROP_BY_CODE', { code: property.code, message: property.value });
      });
      commit(SET_PROPERTY_LIST, convertedProps);
    },

    [SET_PAYMENT]({ commit, dispatch }, { id, order }) {
      commit(SET_PAYMENT, { id, order });

      dispatch('refreshOrderAjax', order);
    },

    [SET_SHIPPING]({ commit, dispatch }, { id, order }) {
      commit(SET_SHIPPING, { id, order });

      dispatch('refreshOrderAjax', order);
    },

    // [SET_STORE]({ commit, dispatch }, { storeId, order }) {
    //   commit(SET_STORE, { storeId, order });
    //
    //   // dispatch('refreshOrderAjax');
    // },

    [REMOVE_ORDER]({ commit, dispatch }, order) {
      commit(REMOVE_ORDER, order);

      dispatch('refreshOrderAjax');
    },

    SET_ERRORS({ commit }, errors) {
      console.log(errors);
      commit('SET_ERRORS', errors);

      if (errors.PROPERTY && errors.PROPERTY.length) {
        commit('SET_CURRENT_STEP', 'form');
        Utils.scrollTo(document.getElementById('order-props'));
        return;
      }

      if (errors.DELIVERY && errors.DELIVERY.length) {
        commit('SET_CURRENT_STEP', 'shipping-and-payment');
        Utils.scrollTo(document.getElementById('order-delivery'));
        return;
      }

      if (errors.PAY_SYSTEM && errors.PAY_SYSTEM.length) {
        commit('SET_CURRENT_STEP', 'shipping-and-payment');
        Utils.scrollTo(document.getElementById('order-delivery'));
      }
    },

    async checkout({
      state, commit, dispatch, getters,
    }) {
      // try {
      //   window['yaCounter' + app.metrikaId].reachGoal('CLICK_ORDER_BUTTON');
      // } catch (ex) {}

      // if (await dispatch('validatePropsData')) {
      //   Utils.scrollTo(document.getElementById('order-props'));
      //   return;
      // }

      // const err = {};
      // getters.orderList.forEach((order) => {
      //   // if (!order.deliveryItem) {
      //   //   err.DELIVERY = ['Не выбран способ доставки'];
      //   // } else if (order.deliveryItem.category === 'sdek.pickup' && !state.props.sdekPickup) {
      //   //   err.DELIVERY = ['Не выбран пункт самовывоза'];
      //   // }
      //
      //   console.log(order);
      //
      //   // if (!order.deliveryId) {
      //   //   err.DELIVERY = ['Не выбран способ доставки (1)'];
      //   // }
      //
      //   if (!order.deliveryItem) {
      //     err.DELIVERY = ['Не выбран способ доставки'];
      //   } else if (order.deliveryItem.category === 'sdek.pickup' && !state.props.sdekPickup) {
      //     err.DELIVERY = ['Не выбран пункт самовывоза'];
      //   }
      //
      //   if (!order.paymentId) {
      //     err.PAY_SYSTEM = ['Не выбран метод оплаты'];
      //   }
      // });
      //
      //
      // if (err.PAY_SYSTEM || err.DELIVERY) {
      //   dispatch('SET_ERRORS', err);
      //   return;
      // }


      commit('SET_CHECKOUT_STATUS', 'loading');

      Utils.log('Checkout', 'Отправка заказов');

      const resultList = await Promise.all(state.orderList.map(async (order) => {
        const request = {
          ...getters.getAllFormData(order.id),
          storeId: order.storeId,
          // save: 'Y', // ???
        };

        const formData = new FormData();
        Object.keys(request).forEach((key) => {
          formData.append(key, request[key]);
        });


        Utils.log('Checkout', `Отправка заказа ${order.index}`);

        return axios
          .post('/checkout/', formData)
          .then((response) => {
            Utils.log('Checkout', `Ответ по заказу ${order.index} получен`);
            return response.data;
          });
      }));

      // const b = {
      //   order: {
      //     REDIRECT_URL: '\/checkout\/?ORDER_ID=77341',
      //     ID: 77341,
      //     DELIVERY: null,
      //     LOCAL_STORE: 'Y',
      //     LOCKED_LOCATION_NAME: '',
      //     CURRENT_STORE: {
      //       ID: '24390',
      //       NAME: 'ул. Кирова, д. 27',
      //       SHORT_ADDRESS: 'м.Октябрьская, между Бахетле и ГПНТБ',
      //       ADDRESS: 'ул. Кирова, д. 27',
      //       COORDS: '55.018122402267,82.944041570144',
      //       WAY_ON_FOOT: '\u0412\u044b\u0445\u043e\u0434 \u043c\u0435\u0442\u0440\u043e \u0432 \u0441\u0442\u043e\u0440\u043e\u043d\u0443 \u0413\u041f\u041d\u0422\u0411. \u041f\u043e\u0441\u043b\u0435 \u043f\u0435\u0440\u0435\u043a\u0440\u0435\u0441\u0442\u043a\u0430 \u0441\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u043d\u0430\u043b\u0435\u0432\u043e.',
      //       WAY_ON_CAR: '\u0417\u0430\u0435\u0437\u0434 \u0447\u0435\u0440\u0435\u0437 \u043f\u0435\u0440\u0435\u043a\u0440\u0435\u0441\u0442\u043e\u043a \u041a\u0438\u0440\u043e\u0432\u0430 \/ \u0421\u0430\u043a\u043a\u043e \u0412\u0430\u043d\u0446\u0435\u0442\u0442\u0438. \r\n\r\n\u041f\u0440\u0438\u043f\u0430\u0440\u043a\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u043c\u043e\u0436\u043d\u043e \u043d\u0430\u043f\u0440\u043e\u0442\u0438\u0432 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430 \u0438\u043b\u0438 \u0432\u043e\u0437\u043b\u0435 \u0411\u0430\u0445\u0435\u0442\u043b\u0435.',
      //     },
      //   },
      // };


      commit('SET_CHECKOUT_STATUS', null);

      Utils.log('Checkout', 'Разбор ответов');

      // if (resultList.length === 1) {
      //   const { order } = resultList[0];
      //
      //   if (order) {
      //     if (order.REDIRECT_URL && order.REDIRECT_URL.length) {
      //       document.location.href = order.REDIRECT_URL;
      //     }
      //
      //     if (order.ERROR) {
      //       dispatch('SET_ERRORS', order.ERROR);
      //     }
      //   }
      //   return;
      // }

      // if (resultList.length > 1) {
      const orders = [];

      console.log(resultList);

      resultList.forEach((result) => {
        const { order } = result;

        if (!order) {
          return;
        }

        if (order.REDIRECT_URL && order.ID) {
          orders.push(order.ID);
          return;
        }

        if (order.ERROR) {
          dispatch('SET_ERRORS', order.ERROR);
        }
      });

      // Нет успешных заказов
      if (orders.length === 0) {
        return;
      }

      if (resultList.length !== orders.length) {
        alert('Некоторые отправления не были оформлены. Вернитесь в корзину, чтобы повторить');
      }

      document.location.href = `/checkout/final/?ORDER_ID=${orders.join(',')}`;
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

    // SET_GROUP_STORE: (state, groupStore) => {
    //   state.groupStore = groupStore;
    // },
    SET_CHECKOUT_STATUS: (state, status) => {
      state.checkoutStatus = status;
    },
    SET_CURRENT_STEP(state, { key }) {
      state.currentStepName = key;
    },

    // SET_DESCRIPTION(state, message) {
    //   state.propertyDescription = message;
    // },

    // SET_PROPERTY(state, { name, value, root = false }) {
    //   const currentProp = state.staticPropertyList.find(prop => prop.name === name);
    //   if (currentProp) {
    //     currentProp.value = value;
    //   } else {
    //     state.staticPropertyList.push({ name, value, root });
    //   }
    // },

    // CLEAR_ERRORS(state, errors) {
    //   state.errors = {
    //     PROPERTY: [],
    //     PAY_SYSTEM: [],
    //     DELIVERY: [],
    //     AUTH: [],
    //   };
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

    [REMOVE_ORDER]: (state, order) => {
      state.orderList = state.orderList.filter(item => item.id !== order.id);
    },

    [SET_STORE]: (state, { storeId, order }) => {
      const currentOrder = state.orderList.find(item => item.id === order.id);
      currentOrder.storeId = storeId;
    },

    [SET_SHIPPING]: (state, { id, order }) => {
      const currentOrder = state.orderList.find(item => item.id === order.id);
      currentOrder.deliveryId = id;
    },

    [SET_PAYMENT]: (state, { id, order }) => {
      const currentOrder = state.orderList.find(item => item.id === order.id);
      currentOrder.paymentId = id;
    },

    [SET_PROPERTY_GROUPS]: (state, propertyGroups) => {
      state.propertyGroups = propertyGroups;
    },

    [SET_PROPERTY_LIST]: (state, propertyList) => {
      state.propertyList = propertyList;
    },


    // ADD_STATIC_PROPERTY: (state, prop) => {
    //   state.staticPropertyList.push(prop);
    // },

    SET_PROPERTY: (state, property) => {
      state.propertyList = {
        ...state.propertyList,
        ...property,
      };
    },

    UPDATE_PROP_BY_CODE: (state, { code, message }) => {
      // state.props[name] = message;
      Vue.set(state.props, code, message);
    },

    UPDATE_DESCRIPTION: (state, message) => {
      state.props.description = message;
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
