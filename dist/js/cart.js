(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{123:function(t,e,s){"use strict";s.r(e);s(11),s(10);var i=s(5),r=s(1),a={name:"CartProductItem",props:{item:{type:Object,required:!0}},methods:{remove:function(){this.$emit("remove",this.item.ID)}},destroyed:function(){console.log("destroyed")}},o=s(0),n=Object(o.a)(a,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-product"},[s("div",{staticClass:"order-product__col-image"},[s("img",{staticClass:"order-product__img",attrs:{src:"https://marketdo4a.com"+t.item.DETAIL_PICTURE_SRC,srcset:"https://marketdo4a.com"+t.item.DETAIL_PICTURE_SRC_2X+" 2x",alt:t.item.NAME}})]),t._v(" "),s("div",{staticClass:"order-product__col-info"},[s("a",{staticClass:"order-product__name",attrs:{href:t.item.DETAIL_PAGE_URL}},[t._v(t._s(t.item.NAME))])]),t._v(" "),s("div",{staticClass:"order-product__col-count"},[s("div",{staticClass:"order-product__count-note"},[t._v(t._s(t.item.SUM_NUM)+" ₽/шт.")])]),t._v(" "),t.item.SUM_BASE>t.item.SUM_NUM?s("div",{staticClass:"order-product__col-price"},[s("del",{staticClass:"order-product__old-price"},[t._v(t._s(t.item.SUM_BASE)+" "),s("span",{staticClass:"currency"},[t._v("₽")])]),t._v(" "),s("div",{staticClass:"order-product__price"},[t._v(t._s(t.item.SUM_NUM)+" "),s("span",{staticClass:"currency"},[t._v("₽")])]),t._v(" "),s("div",{staticClass:"order-product__profit"},[t._v("Выгода "+t._s(t.item.SUM_BASE-t.item.SUM_NUM)+" ₽")])]):s("div",{staticClass:"order-product__col-price"},[s("div",{staticClass:"order-product__price"},[t._v(t._s(t.item.SUM_NUM)+" "),s("span",{staticClass:"currency"},[t._v("₽")])])]),t._v(" "),s("button",{staticClass:"order-product__btn-delete",on:{click:function(e){return e.preventDefault(),t.$emit("remove")}}},[s("i",{staticClass:"icon icon-delete"})])])},[],!1,null,null,null).exports,l={name:"CartProductList",data:function(){return{orderLength:1}},props:{rows:Object,total:Object},components:{CartProductItem:n},computed:{getProductLength:function(){return Object.keys(this.rows).length},getProductLengthFormated:function(){return this.getProductLength+" "+r.a.declOfNum(this.getProductLength,["товар","товара","товаров"])}}},c={name:"CartPromocode"},_={name:"InputField",props:["prop","value"],data:function(){return{isActive:""!==this.value,type:null,autocomplete:null}},mounted:function(){switch(this.prop.code){case"EMAIL":this.type="email",this.autocomplete="email";break;case"FIO":this.type="text",this.autocomplete="name";break;case"PHONE":this.type="tel",this.autocomplete="tel";break;default:this.type="text",this.autocomplete="false"}}};function d(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var u={name:"Cart",data:function(){return function(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{},i=Object.keys(s);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(s).filter(function(t){return Object.getOwnPropertyDescriptor(s,t).enumerable}))),i.forEach(function(e){d(t,e,s[e])})}return t}({propertyList:[],orderList:[]},window.soaData)},components:{CartProductList:Object(o.a)(l,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-item"},[s("div",{staticClass:"order-item__product-list"},t._l(t.rows,function(e){return s("CartProductItem",{key:e.id,attrs:{item:e.data},on:{remove:function(s){return t.$emit("remove-product",e.id)}}})}),1),t._v(" "),s("div",{staticClass:"order-item__amount"},[s("div",{staticClass:"order-item__row"},[s("div",{staticClass:"order-item__key"},[t._v("Товары")]),t._v(" "),s("div",{staticClass:"order-item__value"},[s("small",{staticClass:"gray"},[t._v(t._s(t.getProductLengthFormated))]),t._v(" "),s("b",[t._v(t._s(t.total.ORDER_PRICE)+" "),s("span",{staticClass:"currency"},[t._v("₽")])])])]),t._v(" "),s("div",{staticClass:"order-item__row"},[s("div",{staticClass:"order-item__key"},[t._v("Доставка")]),t._v(" "),t.total.DELIVERY_PRICE>0?s("div",{staticClass:"order-item__value"},[s("b",[t._v(t._s(t.total.DELIVERY_PRICE)+" "),s("span",{staticClass:"currency"},[t._v("₽")])])]):s("div",{staticClass:"order-item__value"},[s("b",[t._v("Бесплатно")])])]),t._v(" "),t.total.DISCOUNT_PRICE>0?s("div",{staticClass:"order-item__row"},[s("div",{staticClass:"order-item__key"},[t._v("Скидка")]),t._v(" "),s("div",{staticClass:"order-item__value"},[s("b",{staticClass:"red"},[t._v(t._s(t.total.DISCOUNT_PRICE)+" "),s("span",{staticClass:"currency"},[t._v("₽")])])])]):t._e()])])},[],!1,null,null,null).exports,CartPromocode:Object(o.a)(c,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"order-promocode"},[e("div",{staticClass:"order-promocode__field"},[e("div",{staticClass:"input-field input-field_primary-white"},[e("label",{staticClass:"input-field__label"},[this._v("Добавить промокод")]),this._v(" "),e("input",{staticClass:"input-field__input"})])]),this._v(" "),e("div",{staticClass:"order-promocode__button"},[e("button",{staticClass:"btn btn-gray-2 btn-block",attrs:{"data-cart":"promocode"}},[this._v("Применить")])])])}],!1,null,"d6526e20",null).exports,InputField:Object(o.a)(_,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-field input-field_primary",class:{active:t.isActive}},[s("label",{staticClass:"input-field__label",attrs:{for:"property-"+t.prop.id}},[t._v(t._s(t.prop.required?t.prop.name+"*":t.prop.name))]),t._v(" "),s("input",{staticClass:"input-field__input",attrs:{id:"property-"+t.prop.id,name:t.prop.fieldName,type:t.type,autocomplete:t.autocomplete,required:t.prop.required},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)},focus:function(e){t.isActive=!0},blur:function(e){""===e.target.value&&(t.isActive=!1)}}})])},[],!1,null,null,null).exports},mounted:function(){this.propertyList=this.result.ORDER_PROP.properties.map(function(t){return{id:t.ID,name:t.NAME,code:t.CODE,description:t.DESCRIPTION,fieldName:"ORDER_PROP_"+t.ID,value:t.VALUE[0],required:"Y"===t.REQUIRED}});var t=window.soaData.result;t.DELIVERY=this.getDeliverySortedArray(t.DELIVERY)},computed:{deliverySortedArray:function(){},getPersonTypeId:function(){var t=this;return this.result.PERSON_TYPE[Object.keys(this.result.PERSON_TYPE).filter(function(e){return"Y"===t.result.PERSON_TYPE[e].CHECKED})[0]].ID}},methods:{removeProduct:function(t){console.log("Удален товар №"+t)},clearCart:function(){console.log("Корзина очищена")},getDeliverySortedArray:function(t){var e=[];return(e=Array.isArray(t)?t:Object.keys(t).map(function(e){return t[e]})).sort(function(t,e){var s=parseInt(t.SORT)-parseInt(e.SORT);return 0===s?t.OWN_NAME.toLowerCase()>e.OWN_NAME.toLowerCase()?1:t.OWN_NAME.toLowerCase()<e.OWN_NAME.toLowerCase()?-1:0:s}),e}}},p=Object(o.a)(u,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("form",{staticClass:"cart"},[s("div",{staticClass:"container"},[s("div",{staticClass:"cart__inner"},[s("div",{staticClass:"cart__col-left"},[s("div",{staticClass:"order-personal-info"},[s("h4",[t._v("Ваши данные")]),t._v(" "),s("div",{staticClass:"order-personal-info__form"},[t._l(t.propertyList,function(e){return s("div",{staticClass:"form-group"},[s("InputField",{attrs:{prop:e},model:{value:e.value,callback:function(s){t.$set(e,"value",s)},expression:"item.value"}})],1)}),t._v(" "),s("div",{staticClass:"order-personal-info__note"},[t._v("*поля, обязательные для заполнения")])],2),t._v(" "),t.getPersonTypeId?s("input",{attrs:{type:"hidden",name:"PERSON_TYPE"},domProps:{value:t.getPersonTypeId}}):t._e()]),t._v(" "),t._m(0)]),t._v(" "),s("div",{staticClass:"cart__col-right"},[s("div",{staticClass:"order"},[s("div",{staticClass:"order__header"},[s("div",{staticClass:"order__header-col"},[s("h4",{staticClass:"order__title"},[t._v("В заказе 2354532")]),t._v(" "),s("button",{staticClass:"order__btn-clear",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.clearCart(e)}}},[s("i",{staticClass:"icon icon-delete"}),t._v(" "),s("span",[t._v("Очистить корзину")])])]),t._v(" "),s("button",{staticClass:"order__btn-checkout btn btn-red btn-skew",attrs:{type:"submit"}},[t._v("оформить заказ")])]),t._v(" "),s("CartProductList",{attrs:{rows:t.result.GRID.ROWS,total:t.result.TOTAL},on:{"remove-product":t.removeProduct}}),t._v(" "),s("CartPromocode"),t._v(" "),s("div",{staticClass:"order-amount"},[s("div",{staticClass:"order-amount__sale"},[s("div",{staticClass:"order-amount__key"},[t._v("ваша Скидка")]),t._v(" "),s("div",{staticClass:"order-amount__value"},[t._v(t._s(t.result.TOTAL.DISCOUNT_PRICE)+" "),s("span",{staticClass:"currency"},[t._v("₽")])])]),t._v(" "),s("div",{staticClass:"order-amount__sum"},[s("div",{staticClass:"order-amount__key"},[t._v("Итого к оплате")]),t._v(" "),s("div",{staticClass:"order-amount__value"},[t._v(t._s(t.result.TOTAL.ORDER_TOTAL_PRICE)+" "),s("span",{staticClass:"currency"},[t._v("₽")])])])]),t._v(" "),t._m(1)],1)])])])])},[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-shiping"},[s("div",{staticClass:"order-shiping__shipping-type"},[s("h4",[t._v("Способ получения")]),t._v(" "),s("div",{staticClass:"order-option"}),t._v(" "),s("div",{staticClass:"order-option active"},[s("div",{staticClass:"order-option__header"},[s("div",{staticClass:"order-option__title"},[t._v("Почтой России")]),t._v(" "),s("div",{staticClass:"order-option__info"},[s("span",{staticClass:"green"},[t._v("Бесплатная доставка")]),s("span",[t._v(" Сегодня")])]),t._v(" "),s("div",{staticClass:"order-option__img"},[s("img",{attrs:{src:"images/logo-rp.svg"}})])]),t._v(" "),s("div",{staticClass:"order-option__body"},[s("div",{staticClass:"order-option__subtitle"},[t._v("Срок доставки 14.05 - 17.05")]),t._v(" "),s("p",{staticClass:"order-option__text"},[t._v("В удалённые районы доставка от 14 дней. При получении обязательно\n                    проверяйте целостность упаковки")]),t._v(" "),s("div",{staticClass:"order-option__subtitle"},[t._v("Адрес доставки")]),t._v(" "),s("div",{staticClass:"form-group"},[s("div",{staticClass:"input-field input-field_primary-white"},[s("label",{staticClass:"input-field__label"},[t._v("Населённый\n                      пункт")]),s("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-level2"}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("div",{staticClass:"input-field input-field_primary-white"},[s("label",{staticClass:"input-field__label"},[t._v("Улица")]),s("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-line1"}})])]),t._v(" "),s("div",{staticClass:"form-group form-group_row"},[s("div",{staticClass:"input-field input-field_primary-white"},[s("label",{staticClass:"input-field__label"},[t._v("Дом")]),s("input",{staticClass:"input-field__input",attrs:{type:"text"}})]),t._v(" "),s("div",{staticClass:"input-field input-field_primary-white"},[s("label",{staticClass:"input-field__label"},[t._v("Квартира/офис")]),s("input",{staticClass:"input-field__input",attrs:{type:"text",autocomplete:"address-line2"}})])]),t._v(" "),s("div",{staticClass:"form-group form-group_row"},[s("div",{staticClass:"input-field input-field_primary-white"},[s("label",{staticClass:"input-field__label"},[t._v("Этаж")]),s("input",{staticClass:"input-field__input",attrs:{type:"text"}})]),t._v(" "),s("div",{staticClass:"input-field input-field_primary-white"},[s("label",{staticClass:"input-field__label"},[t._v("Подъезд")]),s("input",{staticClass:"input-field__input",attrs:{type:"text"}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("div",{staticClass:"input-field input-field_primary-white"},[s("label",{staticClass:"input-field__label"},[t._v("Индекс")]),s("input",{staticClass:"input-field__input",attrs:{type:"number",autocomplete:"postal-code"}})])])])])]),t._v(" "),s("div",{staticClass:"order-shiping__payment-type"},[s("h4",[t._v("Способ оплаты")]),t._v(" "),s("div",{staticClass:"order-option active"},[s("div",{staticClass:"order-option__header"},[s("div",{staticClass:"order-option__title"},[t._v("Картой онлайн")]),t._v(" "),s("div",{staticClass:"order-option__info"},[s("i",{staticClass:"icon icon-visa"}),s("i",{staticClass:"icon icon-mastercard"}),s("i",{staticClass:"icon icon-mir"})])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"order__footer"},[e("button",{staticClass:"order__btn-checkout btn btn-red btn-skew",attrs:{type:"submit"}},[this._v("оформить заказ")]),this._v(" "),e("div",{staticClass:"order__footer-note"},[this._v("Нажимая на кнопку, вы подтверждаете согласие на обработку\n                "),e("a",{attrs:{href:"#"}},[this._v(" персональных данных")]),this._v("\n                и\n                "),e("a",{attrs:{href:"#"}},[this._v(" политику конфиденциальности")])])])}],!1,null,null,null).exports;$(function(){new i.a({el:"#vueTest",template:"<Cart/>",components:{Cart:p}}),$('[data-cart="promocode"]').on("click",function(t){t.preventDefault();var e=t.currentTarget,s=e.innerHTML;e.classList.contains("btn-gray-2")&&(e.innerHTML='<div class="spinner-border spinner-border-sm" role="status"></div>',setTimeout(function(){Math.round(Math.random())?(e.classList.remove("btn-gray-2"),e.classList.add("btn-green"),e.innerHTML='<i class="icon icon-check"></i>'):(e.classList.remove("btn-gray-2"),e.classList.add("btn-red"),e.innerHTML="Неудачно",setTimeout(function(){e.classList.remove("btn-red"),e.classList.add("btn-gray-2"),e.innerHTML=s},1e3))},1e3))}),$('[data-cart="remove-product"]').on("click",function(t){t.preventDefault();var e=$(t.currentTarget).parents(".order-product");e.siblings(".order-product").length>0?e.slideUp(300,function(){e.remove()}):e.parents(".order-item").slideUp(300,function(){e.parents(".order-item").remove()})}),$('[data-cart="remove-shiping"]').on("click",function(t){t.preventDefault();var e=$(t.currentTarget).parents(".order-shiping");e.slideUp(500,function(){e.remove()})}),$(".order-option__header").on("click",function(t){var e=t.currentTarget.parentElement;e.classList.contains("active")?(e.classList.remove("active"),$(e).find(".order-option__body").slideUp(500)):(e.classList.add("active"),$(e).find(".order-option__body").slideDown(500))})})},3:function(t,e){t.exports=jQuery}},[[123,1,0]]]);