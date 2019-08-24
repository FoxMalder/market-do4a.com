(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{141:function(t,e,r){"use strict";r.r(e);r(12),r(11);var i=r(4),s=r(1),a={name:"InputField",props:["prop","value"],data:function(){return{isActive:""!==this.value,type:null,autocomplete:null}},mounted:function(){switch(this.prop.code){case"EMAIL":this.type="email",this.autocomplete="email";break;case"FIO":this.type="text",this.autocomplete="name";break;case"PHONE":this.type="tel",this.autocomplete="tel";break;default:this.type="text",this.autocomplete="false"}}},n=r(0),o=Object(n.a)(a,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input-field input-field_primary",class:{active:t.isActive}},[r("label",{staticClass:"input-field__label",attrs:{for:"property-"+t.prop.id}},[t._v(t._s(t.prop.required?t.prop.name+"*":t.prop.name))]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{id:"property-"+t.prop.id,name:t.prop.fieldName,type:t.type,autocomplete:t.autocomplete,required:t.prop.required},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)},focus:function(e){t.isActive=!0},blur:function(e){""===e.target.value&&(t.isActive=!1)}}})])},[],!1,null,null,null).exports,c=r(2),l={name:"ProductItem",props:{item:{type:Object,required:!0}},methods:Object(s.b)("cart",{removeProductFromCart:"removeProductFromCart",increment:"incrementItemQuantity",decrement:"decrementItemQuantity"})};function d(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var _={name:"ProductList",components:{ProductItem:Object(n.a)(l,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-product"},[r("div",{staticClass:"order-product__col-image"},[r("img",{staticClass:"order-product__img",attrs:{src:"https://marketdo4a.com"+t.item.DETAIL_PICTURE_SRC,srcset:"https://marketdo4a.com"+t.item.DETAIL_PICTURE_SRC_2X+" 2x",alt:t.item.NAME}})]),t._v(" "),r("div",{staticClass:"order-product__col-info"},[r("a",{staticClass:"order-product__name",attrs:{href:t.item.DETAIL_PAGE_URL}},[t._v(t._s(t.item.NAME))])]),t._v(" "),r("div",{staticClass:"order-product__col-count"},[r("div",{staticClass:"order-product__counter"},[r("button",{staticClass:"order-product__decrement",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.decrement(t.item)}}},[t._v("-")]),t._v(" "),r("div",{staticClass:"order-product__quantity"},[t._v(t._s(t.item.QUANTITY))]),t._v(" "),r("button",{staticClass:"order-product__increment",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.increment(t.item)}}},[t._v("+")])]),t._v(" "),r("div",{staticClass:"order-product__count-note"},[t._v(t._s(t._f("formatPrice")(t.item.SUM_NUM))+"/"+t._s(t.item.MEASURE_NAME)+".")])]),t._v(" "),r("div",{staticClass:"order-product__col-price"},[t.item.SUM_BASE>t.item.SUM_NUM?r("del",{staticClass:"order-product__old-price"},[t._v(t._s(t._f("formatPrice")(t.item.SUM_BASE)))]):t._e(),t._v(" "),r("div",{staticClass:"order-product__price"},[t._v(t._s(t._f("formatPrice")(t.item.SUM_NUM)))]),t._v(" "),t.item.SUM_BASE>t.item.SUM_NUM?r("div",{staticClass:"order-product__profit"},[t._v("Выгода "+t._s(t._f("formatPrice")(t.item.SUM_BASE-t.item.SUM_NUM))+"\n    ")]):t._e()]),t._v(" "),r("button",{staticClass:"order-product__btn-delete",on:{click:function(e){return e.preventDefault(),t.removeProductFromCart(t.item)}}},[r("i",{staticClass:"icon icon-delete"})])])},[],!1,null,null,null).exports},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},i=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),i.forEach(function(e){d(t,e,r[e])})}return t}({},Object(s.d)("checkout",{total:function(t){return t.result.TOTAL}}),Object(s.c)("cart",{products:"products"}),{productCountText:function(){return this.products.length+" "+c.a.declOfNum(this.products.length,["товар","товара","товаров"])}})},u={name:"Promocode"};function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},i=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),i.forEach(function(e){v(t,e,r[e])})}return t}function v(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var m={name:"OrderInfo",components:{ProductList:Object(n.a)(_,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-item"},[r("div",{staticClass:"order-item__product-list"},t._l(t.products,function(t){return r("ProductItem",{key:t.ID,attrs:{item:t}})}),1),t._v(" "),r("div",{staticClass:"order-item__amount"},[r("div",{staticClass:"order-item__row"},[r("div",{staticClass:"order-item__key"},[t._v("Товары")]),t._v(" "),r("div",{staticClass:"order-item__value"},[r("small",{staticClass:"gray"},[t._v(t._s(t.productCountText))]),t._v(" "),r("b",[t._v(t._s(t._f("formatPrice")(t.total.ORDER_PRICE)))])])]),t._v(" "),r("div",{staticClass:"order-item__row"},[r("div",{staticClass:"order-item__key"},[t._v("Доставка")]),t._v(" "),r("div",{staticClass:"order-item__value"},[r("b",[t._v(t._s(t.total.DELIVERY_PRICE>0?t.total.DELIVERY_PRICE:"Бесплатно"))])])]),t._v(" "),t.total.DISCOUNT_PRICE>0?r("div",{staticClass:"order-item__row"},[r("div",{staticClass:"order-item__key"},[t._v("Скидка")]),t._v(" "),r("div",{staticClass:"order-item__value"},[r("b",{staticClass:"red"},[t._v(t._s(t._f("formatPrice")(t.total.DISCOUNT_PRICE)))])])]):t._e()])])},[],!1,null,null,null).exports,Promocode:Object(n.a)(u,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"order-promocode"},[e("div",{staticClass:"order-promocode__field"},[e("div",{staticClass:"input-field input-field_primary-white"},[e("label",{staticClass:"input-field__label"},[this._v("Добавить промокод")]),this._v(" "),e("input",{staticClass:"input-field__input"})])]),this._v(" "),e("div",{staticClass:"order-promocode__button"},[e("button",{staticClass:"btn btn-gray-2 btn-block",attrs:{"data-cart":"promocode"}},[this._v("Применить")])])])}],!1,null,"5c69658f",null).exports},computed:p({},Object(s.d)("checkout",{total:function(t){return t.result.TOTAL}}),Object(s.c)("cart",{products:"products"}),{productCountText:function(){return this.products.length+" "+c.a.declOfNum(this.products.length,["товар","товара","товаров"])}}),methods:p({},Object(s.b)("cart",{clearCart:"clearCart"}))};function f(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var C={name:"Checkout",data:function(){return{selectedPaymentMethod:null,selectedShipingMethod:null,propertyList:[],orderList:[]}},components:{OrderInfo:Object(n.a)(m,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order"},[r("div",{staticClass:"order__header"},[r("div",{staticClass:"order__header-col"},[r("h4",{staticClass:"order__title"},[t._v("В заказе "+t._s(t.productCountText))]),t._v(" "),r("button",{staticClass:"order__btn-clear",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.clearCart(e)}}},[r("i",{staticClass:"icon icon-delete"}),t._v(" "),r("span",[t._v("Очистить корзину")])])])]),t._v(" "),r("ProductList"),t._v(" "),r("Promocode"),t._v(" "),r("div",{staticClass:"order-amount"},[r("div",{staticClass:"order-amount__sale"},[r("div",{staticClass:"order-amount__key"},[t._v("ваша Скидка")]),t._v(" "),r("div",{staticClass:"order-amount__value"},[t._v(t._s(t._f("formatPrice")(t.total.DISCOUNT_PRICE)))])]),t._v(" "),r("div",{staticClass:"order-amount__sum"},[r("div",{staticClass:"order-amount__key"},[t._v("Итого к оплате")]),t._v(" "),r("div",{staticClass:"order-amount__value"},[t._v(t._s(t._f("formatPrice")(t.total.ORDER_TOTAL_PRICE)))])])]),t._v(" "),t._m(0)],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"order__footer"},[e("button",{staticClass:"order__btn-checkout btn btn-red btn-skew",attrs:{type:"submit"}},[this._v("оформить заказ")]),this._v(" "),e("div",{staticClass:"order__footer-note"},[this._v("\n      Нажимая на кнопку, вы подтверждаете согласие на обработку\n      "),e("a",{attrs:{href:"#"}},[this._v(" персональных данных")]),this._v("\n      и\n      "),e("a",{attrs:{href:"#"}},[this._v(" политику конфиденциальности")])])])}],!1,null,"9d415a00",null).exports,InputField:o},mounted:function(){this.propertyList=window.soaData.result.ORDER_PROP.properties.map(function(t){return{id:t.ID,name:t.NAME,code:t.CODE,description:t.DESCRIPTION,fieldName:"ORDER_PROP_"+t.ID,value:t.VALUE[0],required:"Y"===t.REQUIRED}});var t=window.soaData.result;t.DELIVERY=this.getDeliverySortedArray(t.DELIVERY)},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},i=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),i.forEach(function(e){f(t,e,r[e])})}return t}({},Object(s.d)("checkout",{total:function(t){return t.result.TOTAL},paymentMethods:function(t){return t.result.PAY_SYSTEM},currentStore:function(t){return t.result.CURRENT_STORE}}),Object(s.c)("cart",{products:"products"}),Object(s.c)("checkout",{shippingMethods:"shippingMethods"}),{deliverySortedArray:function(){},getPersonTypeId:function(){return window.soaData.result.PERSON_TYPE[Object.keys(window.soaData.result.PERSON_TYPE).filter(function(t){return"Y"===window.soaData.result.PERSON_TYPE[t].CHECKED})[0]].ID},productCountText:function(){return this.products.length+" "+Utils.declOfNum(this.products.length,["товар","товара","товаров"])}}),methods:{selectShiping:function(t){var e=t.ID;this.selectedShipingMethod=e},selectPayment:function(t){var e=t.ID;this.selectedPaymentMethod=e},getDeliverySortedArray:function(t){var e=[];return(e=Array.isArray(t)?t:Object.keys(t).map(function(e){return t[e]})).sort(function(t,e){var r=parseInt(t.SORT)-parseInt(e.SORT);return 0===r?t.OWN_NAME.toLowerCase()>e.OWN_NAME.toLowerCase()?1:t.OWN_NAME.toLowerCase()<e.OWN_NAME.toLowerCase()?-1:0:r}),e}}},h=Object(n.a)(C,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{staticClass:"cart"},[r("div",{staticClass:"container"},[t.products.length?r("div",{staticClass:"cart__inner"},[r("div",{staticClass:"cart__col-left"},[r("div",{staticClass:"order-personal-info"},[r("h4",[t._v("Ваши данные")]),t._v(" "),r("div",{staticClass:"order-personal-info__form"},[r("div",{staticClass:"order-personal-info__subtitle"},[t._v("Данные покупателя")]),t._v(" "),r("div",{staticClass:"order-personal-info__container"},t._l(t.propertyList,function(e){return r("div",{staticClass:"form-group"},[r("InputField",{attrs:{prop:e},model:{value:e.value,callback:function(r){t.$set(e,"value",r)},expression:"item.value"}})],1)}),0),t._v(" "),r("div",{staticClass:"order-personal-info__subtitle"},[t._v("Адрес доставки")]),t._v(" "),t._m(0)]),t._v(" "),t.getPersonTypeId?r("input",{attrs:{type:"hidden",name:"PERSON_TYPE"},domProps:{value:t.getPersonTypeId}}):t._e()]),t._v(" "),r("div",{staticClass:"order-shiping"},[r("div",{staticClass:"order-shiping__shipping-type"},[r("h4",[t._v("Способ получения")]),t._v(" "),t._l(t.shippingMethods,function(e){return r("div",{key:e.ID,staticClass:"order-option",class:{active:e.ID===t.selectedShipingMethod}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedShipingMethod,expression:"selectedShipingMethod"}],staticStyle:{display:"none"},attrs:{type:"radio",name:"DELIVERY_ID"},domProps:{value:e.ID,checked:"Y"===e.CHECKED,checked:t._q(t.selectedShipingMethod,e.ID)},on:{change:function(r){t.selectedShipingMethod=e.ID}}}),t._v(" "),r("div",{staticClass:"order-option__header",on:{click:function(r){return t.selectShiping(e)}}},[r("div",{staticClass:"order-option__title"},[t._v(t._s(e.NAME))]),t._v(" "),r("div",{staticClass:"order-option__info"},[r("span",{class:{green:0===parseInt(e.PRICE)}},[t._v("\n                    "+t._s(e.PRICE>0?e.PRICE+" Р":"Бесплатная доставка")+"\n                  ")]),t._v(" "),e.PERIOD_TEXT?r("span",[t._v(t._s(e.PERIOD_TEXT))]):t._e()]),t._v(" "),e.LOGOTIP_SRC?r("div",{staticClass:"order-option__img"},[r("img",{attrs:{src:e.LOGOTIP_SRC,alt:"item.NAME"}})]):t._e()]),t._v(" "),r("div",{staticClass:"order-option__body",style:{display:e.ID===t.selectedShipingMethod?"":"none"}},["P"===e.TYPE?r("div",{staticClass:"order-option-store"},[r("div",{staticClass:"order-option-store__title"},[t._v(t._s(t.currentStore.NAME))]),t._v(" "),r("a",{staticClass:"order-option-store__link",attrs:{href:"#"}},[t._v("Показать на карте")])]):t._e(),t._v(" "),r("p",{staticClass:"order-option__text",domProps:{innerHTML:t._s(e.DESCRIPTION)}})])])})],2),t._v(" "),r("div",{staticClass:"order-shiping__payment-type"},[r("h4",[t._v("Способ оплаты")]),t._v(" "),t._l(t.paymentMethods,function(e){return r("div",{key:e.ID,staticClass:"order-option",class:{active:e.ID===t.selectedPaymentMethod}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedPaymentMethod,expression:"selectedPaymentMethod"}],staticStyle:{display:"none"},attrs:{type:"radio",name:"PAY_SYSTEM_ID"},domProps:{value:e.ID,checked:"Y"===e.CHECKED,checked:t._q(t.selectedPaymentMethod,e.ID)},on:{change:function(r){t.selectedPaymentMethod=e.ID}}}),t._v(" "),r("div",{staticClass:"order-option__header",on:{click:function(r){return t.selectPayment(e)}}},[r("div",{staticClass:"order-option__title"},[t._v(t._s(e.NAME))]),t._v(" "),t._m(1,!0)])])})],2)])]),t._v(" "),r("div",{staticClass:"cart__col-right"},[r("OrderInfo")],1)]):r("div",{staticClass:"cart__empty"},[r("h3",[t._v("Ваша корзина пуста")]),t._v(" "),r("p",[t._v("Добавьте покупки, чтобы начать оформление заказа")]),t._v(" "),r("button",{staticClass:"btn btn-red btn-skew"},[t._v("Начать покупать")])])])])},[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"order-personal-info__container"},[r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Населённый пункт")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-level2"}})])]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Улица")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-line1"}})])]),t._v(" "),r("div",{staticClass:"form-group form-group_row"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Дом")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text"}})]),t._v(" "),r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Квартира/офис")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-line2"}})])]),t._v(" "),r("div",{staticClass:"form-group form-group_row"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Этаж")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text"}})]),t._v(" "),r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Подъезд")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"text"}})])]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-field input-field_primary"},[r("label",{staticClass:"input-field__label"},[t._v("Индекс")]),t._v(" "),r("input",{staticClass:"input-field__input",attrs:{type:"number",autocomplete:"postal-code"}})])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"order-option__info"},[e("i",{staticClass:"icon icon-visa"}),this._v(" "),e("i",{staticClass:"icon icon-mastercard"}),this._v(" "),e("i",{staticClass:"icon icon-mir"})])}],!1,null,null,null).exports,b=r(3);i.a.filter("formatPrice",function(t){return"".concat(t.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")," ₽")}),$(function(){b.a.dispatch("checkout/getAll"),b.a.dispatch("cart/getCart"),new i.a({store:b.a,render:function(t){return t(h)}}).$mount("#vueTest"),$('[data-cart="promocode"]').on("click",function(t){t.preventDefault();var e=t.currentTarget,r=e.innerHTML;e.classList.contains("btn-gray-2")&&(e.innerHTML='<div class="spinner-border spinner-border-sm" role="status"></div>',setTimeout(function(){Math.round(Math.random())?(e.classList.remove("btn-gray-2"),e.classList.add("btn-green"),e.innerHTML='<i class="icon icon-check"></i>'):(e.classList.remove("btn-gray-2"),e.classList.add("btn-red"),e.innerHTML="Неудачно",setTimeout(function(){e.classList.remove("btn-red"),e.classList.add("btn-gray-2"),e.innerHTML=r},1e3))},1e3))}),$('[data-cart="remove-product"]').on("click",function(t){t.preventDefault();var e=$(t.currentTarget).parents(".order-product");e.siblings(".order-product").length>0?e.slideUp(300,function(){e.remove()}):e.parents(".order-item").slideUp(300,function(){e.parents(".order-item").remove()})}),$('[data-cart="remove-shiping"]').on("click",function(t){t.preventDefault();var e=$(t.currentTarget).parents(".order-shiping");e.slideUp(500,function(){e.remove()})})})},6:function(t,e){t.exports=jQuery}},[[141,1,0]]]);