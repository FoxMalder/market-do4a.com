(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{172:function(t,e,r){"use strict";r.r(e),function(t){r(12),r(14);var e=r(4),n=r(96),i=r(2),s=r(94);$(function(){i.a.registerModule("checkout",s.a),i.a.dispatch("checkout/initSoa",t.soaData),new e.a({store:i.a,render:function(t){return t(n.a)}}).$mount("#vueTest"),$('[data-cart="promocode"]').on("click",function(t){t.preventDefault();var e=t.currentTarget,r=e.innerHTML;e.classList.contains("btn-gray-2")&&(e.innerHTML='<div class="spinner-border spinner-border-sm" role="status"></div>',setTimeout(function(){Math.round(Math.random())?(e.classList.remove("btn-gray-2"),e.classList.add("btn-green"),e.innerHTML='<i class="icon icon-check"></i>'):(e.classList.remove("btn-gray-2"),e.classList.add("btn-red"),e.innerHTML="Неудачно",setTimeout(function(){e.classList.remove("btn-red"),e.classList.add("btn-gray-2"),e.innerHTML=r},1e3))},1e3))}),$('[data-cart="remove-product"]').on("click",function(t){t.preventDefault();var e=$(t.currentTarget).parents(".order-product");e.siblings(".order-product").length>0?e.slideUp(300,function(){e.remove()}):e.parents(".order-item").slideUp(300,function(){e.parents(".order-item").remove()})}),$('[data-cart="remove-shiping"]').on("click",function(t){t.preventDefault();var e=$(t.currentTarget).parents(".order-shiping");e.slideUp(500,function(){e.remove()})})})}.call(this,r(5))},6:function(t,e){t.exports=jQuery},94:function(t,e,r){"use strict";(function(t){var n=r(10);function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){s(t,e,r[e])})}return t}function s(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var a={getCurrentStep:function(t){return t.steps.find(function(e){return e.key===t.currentStepName})},nextStepButton:function(t){if(document.documentElement.clientWidth<1240){var e=t.steps.find(function(e){return e.key===t.currentStepName});return{key:e.next,text:e.nextButtonText}}return{key:"final",text:"Оформить заказ"}},visibleShippingMethods:function(t){if("N"===t.result.LOCAL_STORE)return t.delivery.filter(function(t){return!t.errors});if("Y"===t.result.LOCAL_STORE){var e=null,r=null;return t.delivery.forEach(function(t){"C"===t.type&&(e=t),"P"===t.type&&(r=t)}),[r,e].filter(function(t){return t})}return[]}},c={initSoa:function(t,e){var r=t.commit,n=t.dispatch;r("SET_SOA",e),n("refreshOrder",e.result)},refreshOrder:function(t,e){var r=t.commit;e.SHOW_AUTH&&console.error(e.ERROR),r("SET_DATA",e),r("SET_PROPERTY_LIST",e.ORDER_PROP.properties.map(function(t){return{id:t.ID,name:t.NAME,code:t.CODE,description:t.DESCRIPTION,fieldName:"ORDER_PROP_".concat(t.ID),value:t.VALUE[0],required:"Y"===t.REQUIRED}})),r("SET_SHIPPING_METHODS",Object.values(e.DELIVERY).sort(function(t,e){var r=parseInt(t.SORT,10)-parseInt(e.SORT,10);if(0===r){if(t.OWN_NAME.toLowerCase()>e.OWN_NAME.toLowerCase())return 1;if(t.OWN_NAME.toLowerCase()<e.OWN_NAME.toLowerCase())return-1}return r}).map(function(t){return{id:parseInt(t.ID,10),errors:t.CALCULATE_ERRORS,checked:"Y"===t.CHECKED,price:parseFloat(t.PRICE),name:t.NAME,description:t.DESCRIPTION,period:t.PERIOD_TEXT,type:t.TYPE,logoUrl:t.LOGOTIP?t.LOGOTIP.SRC:""}})),r("SET_PAYMENT_METHODS",e.PAY_SYSTEM.sort(function(t,e){var r=parseInt(t.SORT,10)-parseInt(e.SORT,10);if(0===r){if(t.NAME.toLowerCase()>e.NAME.toLowerCase())return 1;if(t.NAME.toLowerCase()<e.NAME.toLowerCase())return-1}return r}).map(function(t){return{id:t.ID,name:t.NAME,checked:"Y"===t.CHECKED,description:t.DESCRIPTION,isCash:"Y"===t.IS_CASH}}))},selectPaymentMethod:function(t,e){(0,t.commit)("SET_PAYMENT_METHODS",o(t.state.paymentMethods).map(function(t){return i({},t,{checked:t.id===e.id})}))},selectShippingMethod:function(t,e){(0,t.commit)("SET_SHIPPING_METHODS",o(t.state.delivery).map(function(t){return i({},t,{checked:t.id===e.id})}))},setStep:function(t,e){(0,t.commit)("SET_CURRENT_STEP",e)},enterCoupon:function(e,r){e.commit;var i=e.state,s=e.dispatch,o=t.BX&&t.BX.bitrix_sessid?t.BX.bitrix_sessid():"",a={order:{sessid:o},via_ajax:"Y",action:"enterCoupon",SITE_ID:i.soaData.siteID,signedParamsString:i.soaData.signedParamsString,sessid:o,coupon:r};return new Promise(function(t,e){n.e(i.soaData.ajaxUrl,a,function(e){t(),s("refreshOrder",e.order)},function(t){console.error(t.message),e()})})},removeCoupon:function(t){t.commit}};e.a={namespaced:!0,state:{currentStepName:"basket",steps:[{key:"basket",next:"form",title:"Корзина",nextButtonText:"Перейти к оформлению"},{key:"form",next:"shipping-and-payment",title:"Ваши данные",nextButtonText:"Доставка и оплата"},{key:"shipping-and-payment",next:"final",title:"Доставка и оплата",nextButtonText:"Оформить заказ"},{key:"final",next:"basket",title:"Финал",nextButtonText:"Оплатить заказ"}],propertyList:[],delivery:[],paymentMethods:[],result:null,props:{},checkoutStatus:null,soaData:null},getters:a,actions:c,mutations:{SET_DATA:function(t,e){t.result={TOTAL:e.TOTAL,LOCAL_STORE:e.LOCAL_STORE,CURRENT_STORE:e.CURRENT_STORE}},SET_SOA:function(t,e){t.soaData={signedParamsString:e.signedParamsString,siteID:e.siteID,ajaxUrl:e.ajaxUrl}},SET_CHECKOUT_STATUS:function(t,e){t.checkoutStatus=e},SET_CURRENT_STEP:function(t,e){var r=e.key;t.currentStepName=r},SET_PROPERTY_LIST:function(t,e){t.propertyList=e},SET_SHIPPING_METHODS:function(t,e){t.delivery=e},SET_PAYMENT_METHODS:function(t,e){t.paymentMethods=e}}}}).call(this,r(5))},96:function(t,e,r){"use strict";var n=r(1),i={name:"InputField",props:["prop","value"],data:function(){return{isActive:""!==this.value,type:null,autocomplete:null}},mounted:function(){switch(this.prop.code){case"EMAIL":this.type="email",this.autocomplete="email";break;case"FIO":this.type="text",this.autocomplete="name";break;case"PHONE":this.type="tel",this.autocomplete="tel";break;default:this.type="text",this.autocomplete="false"}}},s=r(0);function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var a={name:"CheckoutForm",components:{InputField:Object(s.a)(i,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input-field input-field_primary",class:{active:t.isActive}},[r("label",{staticClass:"input-field__label",attrs:{for:"property-"+t.prop.id}},[t._v(t._s(t.prop.required?t.prop.name+"*":t.prop.name))]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{id:"property-"+t.prop.id,name:t.prop.fieldName,type:t.type,autocomplete:t.autocomplete,required:t.prop.required},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)},focus:function(e){t.isActive=!0},blur:function(e){""===e.target.value&&(t.isActive=!1)}}})])},[],!1,null,null,null).exports},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){o(t,e,r[e])})}return t}({},Object(n.d)("checkout",{propertyList:"propertyList"}),{getPersonTypeId:function(){return window.soaData.result.PERSON_TYPE[Object.keys(window.soaData.result.PERSON_TYPE).filter(function(t){return"Y"===window.soaData.result.PERSON_TYPE[t].CHECKED})[0]].ID}})},c=Object(s.a)(a,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-personal-info"},[r("h3",{staticClass:"order-personal-info__title"},[t._v("Ваши данные")]),t._v(" "),r("div",{staticClass:"order-personal-info__form"},[r("div",{staticClass:"order-personal-info__subtitle"},[t._v("Данные покупателя")]),t._v(" "),r("div",{staticClass:"order-personal-info__container"},t._l(t.propertyList,function(e){return r("div",{staticClass:"form-group"},[r("InputField",{attrs:{prop:e},model:{value:e.value,callback:function(r){t.$set(e,"value",r)},expression:"item.value"}})],1)}),0),t._v(" "),r("div",{staticClass:"order-personal-info__subtitle"},[t._v("Адрес доставки")]),t._v(" "),t._m(0)]),t._v(" "),t.getPersonTypeId?r("input",{attrs:{type:"hidden",name:"PERSON_TYPE"},domProps:{value:t.getPersonTypeId}}):t._e()])},[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-personal-info__container"},[r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Населённый пункт")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-level2"}})])]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Улица")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-line1"}})])]),t._v(" "),r("div",{staticClass:"form-group form-group_row"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Дом")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text"}})]),t._v(" "),r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Квартира/офис")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-line2"}})])]),t._v(" "),r("div",{staticClass:"form-group form-group_row"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Этаж")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text"}})]),t._v(" "),r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Подъезд")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text"}})])]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Индекс")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"number",autocomplete:"postal-code"}})])])])}],!1,null,"0cb0f48a",null).exports;function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){u(t,e,r[e])})}return t}function u(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var p={name:"CheckoutShippingAndPayment",data:function(){return{selectedPaymentMethod:null,selectedShipingMethod:null}},computed:l({},Object(n.d)("checkout",{paymentMethods:function(t){return t.paymentMethods},currentStore:function(t){return t.result.CURRENT_STORE}}),Object(n.c)("checkout",{shippingMethods:"visibleShippingMethods"})),methods:l({},Object(n.b)("checkout",{selectPaymentMethod:"selectPaymentMethod",selectShippingMethod:"selectShippingMethod"}))},d=Object(s.a)(p,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-shiping"},[r("div",{staticClass:"order-shiping__shipping-type"},[r("h3",{staticClass:"order-shiping__title"},[t._v("Способ получения")]),t._v(" "),t._l(t.shippingMethods,function(e){return r("div",{key:e.id,staticClass:"order-option",class:{active:e.checked}},[r("div",{staticClass:"order-option__header",on:{click:function(r){return t.selectShippingMethod(e)}}},[e.logoUrl?r("img",{staticClass:"order-option__img",attrs:{src:e.logoUrl,alt:e.name}}):t._e(),t._v(" "),r("div",{staticClass:"order-option__title"},[t._v(t._s(e.name))]),t._v(" "),r("div",{staticClass:"order-option__info"},[0===e.price?r("span",{staticClass:"green"},[t._v("Бесплатная доставка")]):r("span",[t._v(t._s(t._f("formatPrice")(e.price)))]),t._v(" "),e.period?r("span",[t._v(t._s(e.period))]):t._e()])]),t._v(" "),e.description||"P"===e.type?r("div",{staticClass:"order-option__body"},["P"===e.type?r("ul",{staticClass:"order-option-list"},[r("li",{staticClass:"order-option-list__item"},[r("div",{staticClass:"order-option-list__title"},[t._v(t._s(t.currentStore.NAME))]),t._v(" "),r("a",{staticClass:"order-option-list__link",attrs:{href:"#"}},[t._v("Показать на карте")])])]):t._e(),t._v(" "),r("p",{staticClass:"order-option__description",domProps:{innerHTML:t._s(e.description)}})]):t._e()])})],2),t._v(" "),r("div",{staticClass:"order-shiping__payment-type"},[r("h3",{staticClass:"order-shiping__title"},[t._v("Способ оплаты")]),t._v(" "),t._l(t.paymentMethods,function(e){return r("div",{key:e.id,staticClass:"order-option",class:{active:e.checked}},[r("div",{staticClass:"order-option__header",on:{click:function(r){return t.selectPaymentMethod(e)}}},[r("div",{staticClass:"order-option__title"},[t._v(t._s(e.name))]),t._v(" "),e.description?r("div",{staticClass:"order-option__description"},[t._v(t._s(e.description))]):t._e(),t._v(" "),e.isCash?t._e():r("div",{staticClass:"order-option__info"},[r("i",{staticClass:"icon icon-visa"}),r("i",{staticClass:"icon icon-mastercard"}),r("i",{staticClass:"icon icon-mir"})])])])})],2)])},[],!1,null,null,null).exports,_=r(3),v={name:"ProductItem",props:{item:{type:Object,required:!0}},methods:Object(n.b)("cart",{removeFromCart:"removeFromCart",increment:"incrementItemQuantity",decrement:"decrementItemQuantity"})};function f(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var m={name:"ProductList",components:{ProductItem:Object(s.a)(v,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-product"},[r("div",{staticClass:"order-product__col-image"},[r("img",{staticClass:"order-product__img",attrs:{src:t.item.picture,srcset:(t.item.picture2x||t.item.picture)+" 2x",alt:t.item.name}})]),t._v(" "),r("div",{staticClass:"order-product__col-info"},[r("a",{staticClass:"order-product__name",attrs:{href:t.item.url}},[t._v(t._s(t.item.name))]),t._v(" "),r("div",{staticClass:"order-product__description"},[t._v(t._s(t.item.pack))])]),t._v(" "),r("div",{staticClass:"order-product__col-count"},[r("div",{staticClass:"order-product__counter"},[r("button",{staticClass:"order-product__decrement",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.decrement(t.item)}}},[t._v("-")]),t._v(" "),r("div",{staticClass:"order-product__quantity"},[t._v(t._s(t.item.quantity))]),t._v(" "),r("button",{staticClass:"order-product__increment",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.increment(t.item)}}},[t._v("+")])]),t._v(" "),r("div",{staticClass:"order-product__count-note"},[t._v(t._s(t._f("formatPrice")(t.item.price))+"/"+t._s(t.item.MEASURE_NAME||"шт.")+".")])]),t._v(" "),r("div",{staticClass:"order-product__col-price"},[t.item.price_benefit>0?r("del",{staticClass:"order-product__old-price"},[t._v(t._s(t._f("formatPrice")(t.item.sumBase)))]):t._e(),t._v(" "),r("div",{staticClass:"order-product__price"},[t._v(t._s(t._f("formatPrice")(t.item.sum)))]),t._v(" "),t.item.price_benefit>0?r("div",{staticClass:"order-product__profit"},[t._v("Выгода "+t._s(t._f("formatPrice")(t.item.price_benefit)))]):t._e()]),t._v(" "),r("button",{staticClass:"order-product__btn-delete",on:{click:function(e){return e.preventDefault(),t.removeFromCart(t.item)}}},[r("svg",{attrs:{width:"18",height:"20",viewBox:"0 0 18 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.67041 0H12.5289V2.54197H17.6368V4.46043H0.5625V2.54197H5.67041V0ZM7.58888 1.91847V2.54197H10.6105V1.91847H7.58888ZM2.86418 20V6.28298H4.78265V18.0815H13.4157V6.28298H15.3342V20H2.86418ZM8.14052 6.28298H6.22206V16.4149H8.14052V6.28298ZM10.0592 6.28298H11.9777V16.4149H10.0592V6.28298Z",fill:"currentColor"}})])])])},[],!1,null,null,null).exports},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){f(t,e,r[e])})}return t}({},Object(n.d)("checkout",{total:function(t){return t.result.TOTAL}}),Object(n.d)({products:function(t){return t.cart.items}}),{productCountText:function(){return this.products.length+" "+_.a.declOfNum(this.products.length,["товар","товара","товаров"])}})},b=Object(s.a)(m,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-item"},[r("div",{staticClass:"order-item__list"},t._l(t.products,function(t){return r("ProductItem",{key:t.basketItemId,attrs:{item:t}})}),1),t._v(" "),r("div",{staticClass:"order-item__amount"},[r("div",{staticClass:"order-item__row"},[r("div",{staticClass:"order-item__key"},[t._v("Товары")]),t._v(" "),r("div",{staticClass:"order-item__value"},[r("small",{staticClass:"gray"},[t._v(t._s(t.productCountText))]),t._v(" "),r("b",[t._v(t._s(t._f("formatPrice")(t.total.ORDER_PRICE)))])])]),t._v(" "),r("div",{staticClass:"order-item__row"},[r("div",{staticClass:"order-item__key"},[t._v("Доставка")]),t._v(" "),r("div",{staticClass:"order-item__value"},[r("b",[t._v(t._s(t.total.DELIVERY_PRICE>0?t.total.DELIVERY_PRICE:"Бесплатно"))])])]),t._v(" "),t.total.DISCOUNT_PRICE>0?r("div",{staticClass:"order-item__row"},[r("div",{staticClass:"order-item__key"},[t._v("Скидка")]),t._v(" "),r("div",{staticClass:"order-item__value"},[r("b",{staticClass:"red"},[t._v(t._s(t._f("formatPrice")(t.total.DISCOUNT_PRICE)))])])]):t._e()])])},[],!1,null,null,null).exports;function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var C={name:"Promocode",data:function(){return{promocode:"",isModal:document.documentElement.clientWidth<768,status:null}},methods:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){h(t,e,r[e])})}return t}({},Object(n.b)({enterCoupon:"checkout/enterCoupon"}),{setPromocode:function(){var t=this;if(this.status="loading",""===this.promocode)return this.status="failed",void setTimeout(function(){t.status=null},300);this.enterCoupon(this.promocode).then(function(){t.status="success"}).catch(function(){t.status="failed",setTimeout(function(){t.status=null},1e3)})}})};function y(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){O(t,e,r[e])})}return t}function O(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var E={name:"CheckoutBasket",components:{ProductList:b,Promocode:Object(s.a)(C,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-promocode"},[t.isModal?[r("button",{staticClass:"btn btn-gray-2 btn-block"},[t._v("Добавить промокод")])]:[r("div",{staticClass:"order-promocode__field"},[r("div",{staticClass:"input-field input-field_primary-white"},[r("label",{staticClass:"input-field__label"},[t._v("Добавить промокод")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.promocode,expression:"promocode"}],staticClass:"input-field__input",attrs:{type:"text",autocomplete:"off",disabled:"success"===t.status},domProps:{value:t.promocode},on:{input:function(e){e.target.composing||(t.promocode=e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"order-promocode__button"},["loading"===t.status?r("button",{staticClass:"btn btn-gray-2 btn-block",attrs:{type:"button"}},[r("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}})]):"success"===t.status?r("button",{staticClass:"btn btn-green btn-block",attrs:{type:"button"}},[r("svg",{attrs:{width:"16",height:"14",viewBox:"0 0 16 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M15.5588 3.06065L5.49816 13.1213L0.4375 8.06065L2.55882 5.93933L5.49816 8.87867L13.4375 0.939331L15.5588 3.06065Z",fill:"currentColor"}})])]):"failed"===t.status?r("button",{staticClass:"btn btn-red btn-block",attrs:{type:"button"}},[t._v("Ошибка")]):r("button",{staticClass:"btn btn-gray-2 btn-block",attrs:{type:"button"},on:{click:t.setPromocode}},[t._v("Применить")])])]],2)},[],!1,null,null,null).exports},computed:y({},Object(n.d)({products:function(t){return t.cart.items},total:function(t){return t.checkout.result.TOTAL}}),Object(n.c)("checkout",{nextStepButton:"nextStepButton"}),{productCountText:function(){return this.products.length+" "+_.a.declOfNum(this.products.length,["товар","товара","товаров"])}}),methods:y({},Object(n.b)({clearCart:"cart/clearCart",setStep:"checkout/setStep"}))},g=Object(s.a)(E,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order"},[r("h3",{staticClass:"order__title"},[t._v("В заказе "+t._s(t.productCountText))]),t._v(" "),r("div",{staticClass:"order__subtitle"},[r("button",{staticClass:"order__btn-clear",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.clearCart(e)}}},[r("i",{staticClass:"icon icon-delete"}),t._v(" "),r("span",[t._v("Очистить корзину")])])]),t._v(" "),r("ProductList"),t._v(" "),r("Promocode"),t._v(" "),r("div",{staticClass:"order-amount"},[r("div",{staticClass:"order-amount__sale"},[r("div",{staticClass:"order-amount__key"},[t._v("ваша Скидка")]),t._v(" "),r("div",{staticClass:"order-amount__value"},[t._v(t._s(t._f("formatPrice")(t.total.DISCOUNT_PRICE)))])]),t._v(" "),r("div",{staticClass:"order-amount__sum"},[r("div",{staticClass:"order-amount__key"},[t._v("Итого к оплате")]),t._v(" "),r("div",{staticClass:"order-amount__value"},[t._v(t._s(t._f("formatPrice")(t.total.ORDER_TOTAL_PRICE)))])])]),t._v(" "),r("div",{staticClass:"order__footer"},[r("button",{staticClass:"order__btn-checkout btn btn-red btn-skew",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.setStep(t.nextStepButton)}}},[t._v(t._s(t.nextStepButton.text))]),t._v(" "),t._m(0)])],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"order__footer-note"},[this._v("\n      Нажимая на кнопку, вы подтверждаете согласие на обработку\n      "),e("a",{attrs:{href:"#"}},[this._v(" персональных данных")]),this._v("\n      и\n      "),e("a",{attrs:{href:"#"}},[this._v(" политику конфиденциальности")])])}],!1,null,"29c236b1",null).exports,S={name:"CheckoutAlert"},k={name:"CheckoutFinal"},P={name:"CheckoutFinal"};function T(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){w(t,e,r[e])})}return t}function w(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var j={name:"Checkout",components:{CheckoutAlert:Object(s.a)(S,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"order-alert"},[e("div",{staticClass:"order-alert__title"},[this._v("Внимание! Этот заказ был разделён.")]),this._v(" "),e("div",{staticClass:"order-alert__text"},[this._v("Часть заказа будет отправлена с центрального склада. Вы получите товары разными\n    способами доставки.\n  ")])])}],!1,null,null,null).exports,CheckoutForm:c,CheckoutShippingAndPayment:d,CheckoutBasket:g,CheckoutFinal:Object(s.a)(k,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{},[e("h3",[this._v("Заказ оформлен, его номер:")]),this._v(" "),e("p",[this._v("1354315")]),this._v(" "),e("p",[this._v("Подробная информация о заказе отправлена на вашу почту konstantinopolsky@gmail.com. В ближайшее время с вами свяжется менеджер для уточнения деталей заказа.")])])}],!1,null,"8a629224",null).exports,CheckoutEmptyBasket:Object(s.a)(P,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cart__empty"},[e("h3",[this._v("Ваша корзина пуста")]),this._v(" "),e("p",[this._v("Добавьте покупки, чтобы начать оформление заказа")]),this._v(" "),e("button",{staticClass:"btn btn-red btn-skew"},[this._v("Начать покупать")])])}],!1,null,"11276bc9",null).exports},data:function(){return{isMobile:document.documentElement.clientWidth<1240}},computed:T({},Object(n.d)({products:function(t){return t.cart.items},steps:function(t){return t.checkout.steps},currentStep:function(t){return t.checkout.currentStepName}}),Object(n.c)("checkout",{nextStepButton:"nextStepButton"}),{currentTabComponent:function(){return"checkout-".concat(this.currentStep)}}),methods:T({},Object(n.b)("checkout",{setStep:"setStep"}))},x=Object(s.a)(j,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("article",[r("header",{staticClass:"cart-section-header"},[r("div",{staticClass:"container"},[r("div",{staticClass:"breadcumps"},[r("a",{staticClass:"breadcumps__link red",attrs:{href:"/"}},[t._v("Главная")]),t._v(" "),r("span",{staticClass:"breadcumps__delimiter"}),t._v(" "),r("span",{staticClass:"breadcumps__page"},[t._v(t._s("basket"===t.currentStep?"Корзина":"Оформление заказа"))])]),t._v(" "),r("h2",{staticClass:"cart-section-header__title"},[t._v(t._s("basket"===t.currentStep?"Корзина":"Оформление заказа"))])])]),t._v(" "),r("section",{staticClass:"cart"},[t.products.length?t.isMobile?["basket"!==t.currentStep?r("ul",{staticClass:"cart-mobile-header"},t._l(t.steps,function(e){return"basket"!==e.key?r("li",{key:e.key,class:["cart-mobile-header__item",{active:t.currentStep===e.key}]},[r("a",{staticClass:"cart-mobile-header__link",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.setStep(e)}}},[t._v(t._s(e.title)+"\n          ")])]):t._e()}),0):t._e(),t._v(" "),r("div",{staticClass:"container"},[r("keep-alive",[r(t.currentTabComponent,{tag:"component"})],1)],1),t._v(" "),r("div",{staticClass:"cart-mobile-bottom"},[r("button",{staticClass:"cart-mobile-bottom__button btn btn-red btn-block",attrs:{type:"button"},on:{click:function(e){return t.setStep(t.nextStepButton)}}},[t._v("\n          "+t._s(t.nextStepButton.text)+"\n        ")])])]:[r("div",{staticClass:"container"},["final"===t.currentStep?r("CheckoutFinal"):r("div",{staticClass:"cart__inner"},[r("div",{staticClass:"cart__col-left"},[r("CheckoutForm"),t._v(" "),r("CheckoutShippingAndPayment")],1),t._v(" "),r("div",{staticClass:"cart__col-right"},[r("CheckoutBasket")],1)])],1)]:r("CheckoutEmptyBasket")],2)])},[],!1,null,"22c34a24",null);e.a=x.exports}},[[172,1,0]]]);