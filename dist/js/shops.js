/*! Front by Roman Meshcheryakov */
(window.webpackJsonp=window.webpackJsonp||[]).push([[11,12],{15:function(t,e){t.exports=jQuery},278:function(t,e,r){"use strict";r.r(e);var o=r(14),a=r.n(o),n=r(6),s=(r(47),r(21)),i=r.n(s),c=r(2),l=r.n(c),u=r(4),p=r(36),d=r(48),m=r(20);function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}var f={name:"ShopList",components:{ShopListMap:d.a},data:function(){return{currentTab:"map",isMobile:document.documentElement.clientWidth<768,isTabs:document.documentElement.clientWidth<1240,shownStoreInfo:!1,searchFieldValue:"",currentStoreId:null}},mounted:function(){var t=this;/(storeId\d+)/i.test(document.location.hash)&&(this.currentStoreId=parseInt(document.location.hash.match(/\d+/)[0],10)),document.documentElement.clientWidth>=1240&&(this.SimpleBar=new p.a(this.$refs.scrollEl,{autoHide:!1})),this.headerEl=document.querySelector(".page-header"),this.headerEl&&([].forEach.call(this.headerEl.querySelectorAll("form"),(function(t){t.addEventListener("submit",(function(t){t.preventDefault()}))})),[].forEach.call(this.headerEl.querySelectorAll("input"),(function(e){e.addEventListener("input",(function(){t.searchFieldValue=e.value.trim().toLowerCase()}))})))},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){l()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(u.c)({getStoreListByCityId:"getStoreListByCityId"}),{sortedCityList:function(){var t=this,e=i()(this.$store.state.cityList),r=e.findIndex((function(e){return e.id===t.$store.state.cityId}));return r>=0&&e.unshift.apply(e,i()(e.splice(r,1))),e},filtredCityList:function(){var t=this;return this.sortedCityList.filter((function(e){return!e.isFake||e.id===t.$store.state.cityId}))},searchedCityList:function(){var t=this;return this.filtredCityList.filter((function(e){return-1!==e.name.toLowerCase().indexOf(t.searchFieldValue)}))},activeStore:function(){return this.$store.getters.getStoreById(this.currentStoreId)}}),methods:{normalizePhone:function(t){return t.replace(/[^0-9+\uFF0B]/g,"")},getStore:function(t){this.currentTab="map",this.currentStoreId=t,this.headerEl&&this.isTabs&&(this.headerEl.style.display="none",m.b.scrollTo(this.$el))},back:function(){this.currentStoreId=null,this.headerEl&&(this.headerEl.style.display="")},setPoint:function(t){t?this.getStore(t):this.back()}}},C=r(1),v=Object(C.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"s-shops"},[r("div",{directives:[{name:"show",rawName:"v-show",value:!t.isTabs||!t.currentStoreId,expression:"!isTabs || !currentStoreId"}],staticClass:"s-shops__list"},[r("div",{ref:"scrollEl",staticClass:"s-shops__scroll"},[r("ul",{staticClass:"s-city-list"},[0===t.searchedCityList.length?r("li",{staticClass:"s-city-list__empty"},[t._v("Не найдено")]):t._e(),t._v(" "),t._l(t.searchedCityList,(function(e){return r("li",{key:e.id,staticClass:"s-city",class:{active:e.id===t.$store.state.cityId}},[r("div",{staticClass:"s-city__header"},[r("div",{staticClass:"s-city__name"},[t._v(t._s(e.name))]),t._v(" "),e.id===t.$store.state.cityId?r("div",{staticClass:"s-city__note"},[r("svg",{attrs:{width:"13",height:"15",viewBox:"0 0 13 15",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M4.04028 0.543988C4.86651 0.290477 6.00108 0 6.95171 0C7.90234 0 9.03691 0.290477 9.86315 0.543988C10.2914 0.675388 10.6666 0.806428 10.935 0.904682C11.0696 0.953918 11.178 0.995202 11.2538 1.02456C11.2917 1.03924 11.3215 1.05096 11.3423 1.05922L11.3668 1.06897L11.3738 1.07179L11.377 1.07308C11.3771 1.07313 11.3772 1.07317 11.0017 2L11.377 1.07308L12.0964 1.36453L11.0425 9.18467L4.9868 14.4714L0.957031 8.94306L1.9882 1.29114L2.52623 1.07317L2.90171 2C2.52623 1.07317 2.52611 1.07322 2.52623 1.07317L2.52966 1.07179L2.53667 1.06897L2.56111 1.05922C2.58194 1.05096 2.61172 1.03924 2.64963 1.02456C2.7254 0.995202 2.83387 0.953918 2.96838 0.904682C3.23681 0.806428 3.61202 0.675388 4.04028 0.543988ZM3.8129 2.72611L3.04639 8.41409L5.31662 11.5286L9.16087 8.17248L9.90365 2.66059C9.71767 2.59642 9.50509 2.52615 9.27649 2.45601C8.47314 2.20952 7.5827 2 6.95171 2C6.32072 2 5.43029 2.20952 4.62693 2.45601C4.31749 2.55096 4.03741 2.64613 3.8129 2.72611Z",fill:"currentColor"}})]),t._v("\n              Вы здесь\n            ")]):t._e()]),t._v(" "),r("ul",{staticClass:"s-city__store-list"},t._l(t.getStoreListByCityId(e.id),(function(e){return r("li",{key:e.id,staticClass:"s-item",class:{active:e.id===t.currentStoreId},on:{click:function(r){return t.getStore(e.id)}}},[r("div",{staticClass:"s-item__header"},[r("div",{staticClass:"s-item__address"},[t._v(t._s(e.name))]),t._v(" "),t.isMobile?r("div",{staticClass:"s-item__info"},[t._v(t._s(e.shortAddress||""))]):r("div",{staticClass:"s-item__info",domProps:{innerHTML:t._s((e.workTime||[]).join("<br>"))}})]),t._v(" "),r("div",{staticClass:"s-item__body"},t._l(e.phone,(function(e){return r("a",{staticClass:"s-item__phone",attrs:{href:"tel:"+e}},[t._v(t._s(e))])})),0),t._v(" "),r("div",{staticClass:"s-item__bottom"},[t.isMobile?r("div",{staticClass:"s-item__info",domProps:{innerHTML:t._s((e.workTime||[]).join("<br>"))}}):r("div",{staticClass:"s-item__info"},[t._v(t._s(e.shortAddress||""))]),t._v(" "),r("div",{staticClass:"s-item__contacts"},[e.instagram?r("a",{staticClass:"s-item__link",attrs:{href:e.instagram,target:"_blank"}},[r("svg",{attrs:{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M10.0009 0C7.28508 0 6.94424 0.0118751 5.87756 0.0604173C4.81297 0.109168 4.08629 0.277711 3.45045 0.525005C2.79274 0.780425 2.23481 1.12209 1.67898 1.67814C1.12272 2.23398 0.78105 2.7919 0.524797 3.44941C0.276878 4.08546 0.108126 4.81234 0.060209 5.87652C0.0125001 6.9432 0 7.28424 0 10.0001C0 12.716 0.0120835 13.0558 0.0604173 14.1224C0.109376 15.187 0.27792 15.9137 0.525005 16.5495C0.780633 17.2073 1.1223 17.7652 1.67835 18.321C2.23398 18.8773 2.7919 19.2198 3.4492 19.4752C4.08546 19.7225 4.81234 19.891 5.87673 19.9398C6.94341 19.9883 7.28403 20.0002 9.99969 20.0002C12.7158 20.0002 13.0556 19.9883 14.1222 19.9398C15.1868 19.891 15.9143 19.7225 16.5506 19.4752C17.2081 19.2198 17.7652 18.8773 18.3208 18.321C18.8771 17.7652 19.2187 17.2073 19.475 16.5498C19.7208 15.9137 19.8896 15.1868 19.9396 14.1226C19.9875 13.056 20 12.716 20 10.0001C20 7.28424 19.9875 6.9434 19.9396 5.87673C19.8896 4.81213 19.7208 4.08546 19.475 3.44962C19.2187 2.7919 18.8771 2.23398 18.3208 1.67814C17.7646 1.12189 17.2083 0.780216 16.55 0.525005C15.9125 0.277711 15.1854 0.109168 14.1208 0.0604173C13.0541 0.0118751 12.7145 0 9.99781 0H10.0009ZM9.09388 1.80118C9.36013 1.80076 9.65722 1.80118 9.99097 1.80118C12.661 1.80118 12.9775 1.81076 14.0318 1.85868C15.0069 1.90326 15.536 2.06618 15.8885 2.20305C16.3552 2.38431 16.6879 2.60098 17.0377 2.95098C17.3877 3.30098 17.6044 3.63432 17.7861 4.10099C17.9229 4.45308 18.0861 4.98225 18.1304 5.95726C18.1784 7.01144 18.1888 7.32811 18.1888 9.99689C18.1888 12.6657 18.1784 12.9823 18.1304 14.0365C18.0858 15.0115 17.9229 15.5407 17.7861 15.8928C17.6048 16.3595 17.3877 16.6918 17.0377 17.0415C16.6877 17.3916 16.3554 17.6082 15.8885 17.7895C15.5364 17.927 15.0069 18.0895 14.0318 18.1341C12.9777 18.182 12.661 18.1924 9.99097 18.1924C7.32074 18.1924 7.00427 18.182 5.9501 18.1341C4.97509 18.0891 4.44591 17.9261 4.0932 17.7893C3.62653 17.608 3.29319 17.3913 2.94319 17.0413C2.59319 16.6913 2.37652 16.3588 2.19485 15.892C2.05797 15.5399 1.89484 15.0107 1.85047 14.0357C1.80255 12.9815 1.79297 12.6648 1.79297 9.99439C1.79297 7.32394 1.80255 7.00894 1.85047 5.95476C1.89505 4.97975 2.05797 4.45058 2.19485 4.09808C2.3761 3.6314 2.59319 3.29807 2.94319 2.94806C3.29319 2.59806 3.62653 2.38139 4.0932 2.19972C4.44571 2.06222 4.97509 1.89972 5.9501 1.85493C6.87261 1.81326 7.23011 1.80076 9.09388 1.79868V1.80118ZM15.3484 3.46373C14.6859 3.46373 14.1484 4.00062 14.1484 4.66333C14.1484 5.32584 14.6859 5.86334 15.3484 5.86334C16.011 5.86334 16.5485 5.32584 16.5485 4.66333C16.5485 4.00082 16.011 3.46332 15.3484 3.46332V3.46373ZM9.99875 4.86337C7.16268 4.86337 4.86328 7.16277 4.86328 9.99884C4.86328 12.8349 7.16268 15.1333 9.99875 15.1333C12.8348 15.1333 15.1334 12.8349 15.1334 9.99884C15.1334 7.16277 12.8346 4.86337 9.99854 4.86337H9.99875ZM10.0131 6.66611C11.8539 6.66611 13.3464 8.15841 13.3464 9.99948C13.3464 11.8403 11.8539 13.3328 10.0131 13.3328C8.172 13.3328 6.67969 11.8403 6.67969 9.99948C6.67969 8.15841 8.172 6.66611 10.0131 6.66611Z",fill:"url(#paint0_linear)"}}),t._v(" "),r("defs",[r("linearGradient",{attrs:{id:"paint0_linear",x1:"16.5385",y1:"1.15386",x2:"5.76908",y2:"17.6924",gradientUnits:"userSpaceOnUse"}},[r("stop",{attrs:{"stop-color":"#536DE8"}}),t._v(" "),r("stop",{attrs:{offset:"0.366894","stop-color":"#A84CA7"}}),t._v(" "),r("stop",{attrs:{offset:"0.751381","stop-color":"#FC3436"}}),t._v(" "),r("stop",{attrs:{offset:"1","stop-color":"#FFA10D"}})],1)],1)])]):t._e(),t._v(" "),e.vk?r("a",{staticClass:"s-item__link",attrs:{href:e.vk,target:"_blank"}},[r("svg",{attrs:{width:"26",height:"14",viewBox:"0 0 26 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.005 13.8163C14.005 13.8163 14.4477 13.768 14.6745 13.5289C14.8821 13.3098 14.8749 12.8964 14.8749 12.8964C14.8749 12.8964 14.8473 10.9659 15.7605 10.6809C16.6604 10.4006 17.8159 12.5478 19.0423 13.3735C19.9686 13.9977 20.6718 13.8611 20.6718 13.8611L23.9488 13.8163C23.9488 13.8163 25.6623 13.7127 24.8499 12.39C24.7827 12.2816 24.3759 11.4112 22.4141 9.6232C20.3586 7.7516 20.6346 8.05431 23.1088 4.81642C24.6159 2.8447 25.2183 1.64095 25.0299 1.12623C24.8511 0.63389 23.7424 0.764631 23.7424 0.764631L20.0538 0.78701C20.0538 0.78701 19.7802 0.750497 19.5774 0.869459C19.3794 0.986066 19.251 1.25815 19.251 1.25815C19.251 1.25815 18.6679 2.78346 17.8891 4.08144C16.2464 6.81875 15.5901 6.96363 15.3213 6.79402C14.6961 6.39708 14.8521 5.20157 14.8521 4.35234C14.8521 1.69866 15.2625 0.592666 14.0542 0.30645C13.6534 0.211044 13.3582 0.148618 12.3323 0.138018C11.016 0.125062 9.90242 0.142729 9.27126 0.445435C8.85129 0.646847 8.52731 1.09678 8.7253 1.1227C8.96888 1.1545 9.52085 1.26875 9.81363 1.65979C10.1916 2.16509 10.1784 3.29817 10.1784 3.29817C10.1784 3.29817 10.3956 6.42182 9.67084 6.80933C9.17407 7.07552 8.49251 6.53253 7.0274 4.04846C6.27745 2.77639 5.71108 1.37004 5.71108 1.37004C5.71108 1.37004 5.60189 1.10738 5.4063 0.966042C5.16992 0.795255 4.83994 0.742252 4.83994 0.742252L1.33495 0.764631C1.33495 0.764631 0.808185 0.778765 0.614997 1.00373C0.443408 1.20279 0.601798 1.61621 0.601798 1.61621C0.601798 1.61621 3.34603 7.91886 6.45384 11.0955C9.30366 14.0071 12.5387 13.8163 12.5387 13.8163H14.005Z",fill:"#4C6C91"}})])]):t._e(),t._v(" "),t._l(e.phone,(function(e){return r("a",{staticClass:"s-item__phone",attrs:{href:"tel:"+t.normalizePhone(e)}},[t._v(t._s(e))])}))],2)])])})),0)])}))],2)])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.isTabs||t.currentStoreId,expression:"!isTabs || currentStoreId"}],staticClass:"s-shops__map"},[t.activeStore?r("div",{staticClass:"s-active-shop"},[r("div",{staticClass:"s-active-shop__header"},[r("button",{staticClass:"s-active-shop__btn-back",on:{click:t.back}},[r("svg",{attrs:{width:"18",height:"20",viewBox:"0 0 18 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.93342 20L-1.03312e-06 10L9.93342 1.20215e-06L11.9431 2L5.32546 8.58579L18 8.58579L18 11.4142L5.32546 11.4142L11.9431 18L9.93342 20Z",fill:"#F4412D"}})])]),t._v(" "),r("div",{staticClass:"s-active-shop__name"},[t._v(t._s(t.activeStore.name))])]),t._v(" "),r("div",{staticClass:"s-active-shop__body"},[r("div",{staticClass:"s-active-shop__info"},[t._v(t._s(t.activeStore.shortAddress))]),t._v(" "),t._l(t.activeStore.phone,(function(e){return r("a",{staticClass:"s-active-shop__phone",attrs:{href:"tel:"+t.normalizePhone(e)}},[t._v(t._s(e))])}))],2),t._v(" "),r("div",{staticClass:"s-active-shop__footer"},[r("div",{staticClass:"s-active-shop__info",domProps:{innerHTML:t._s((t.activeStore.workTime||[]).join("<br>"))}}),t._v(" "),r("div",{staticClass:"s-active-shop__social"},[t.activeStore.instagram?r("a",{staticClass:"s-active-shop__social-link",attrs:{href:t.activeStore.instagram}},[r("svg",{attrs:{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M10.0009 0C7.28508 0 6.94424 0.0118751 5.87756 0.0604173C4.81297 0.109168 4.08629 0.277711 3.45045 0.525005C2.79274 0.780425 2.23481 1.12209 1.67898 1.67814C1.12272 2.23398 0.78105 2.7919 0.524797 3.44941C0.276878 4.08546 0.108126 4.81234 0.060209 5.87652C0.0125001 6.9432 0 7.28424 0 10.0001C0 12.716 0.0120835 13.0558 0.0604173 14.1224C0.109376 15.187 0.27792 15.9137 0.525005 16.5495C0.780633 17.2073 1.1223 17.7652 1.67835 18.321C2.23398 18.8773 2.7919 19.2198 3.4492 19.4752C4.08546 19.7225 4.81234 19.891 5.87673 19.9398C6.94341 19.9883 7.28403 20.0002 9.99969 20.0002C12.7158 20.0002 13.0556 19.9883 14.1222 19.9398C15.1868 19.891 15.9143 19.7225 16.5506 19.4752C17.2081 19.2198 17.7652 18.8773 18.3208 18.321C18.8771 17.7652 19.2187 17.2073 19.475 16.5498C19.7208 15.9137 19.8896 15.1868 19.9396 14.1226C19.9875 13.056 20 12.716 20 10.0001C20 7.28424 19.9875 6.9434 19.9396 5.87673C19.8896 4.81213 19.7208 4.08546 19.475 3.44962C19.2187 2.7919 18.8771 2.23398 18.3208 1.67814C17.7646 1.12189 17.2083 0.780216 16.55 0.525005C15.9125 0.277711 15.1854 0.109168 14.1208 0.0604173C13.0541 0.0118751 12.7145 0 9.99781 0H10.0009ZM9.09388 1.80118C9.36013 1.80076 9.65722 1.80118 9.99097 1.80118C12.661 1.80118 12.9775 1.81076 14.0318 1.85868C15.0069 1.90326 15.536 2.06618 15.8885 2.20305C16.3552 2.38431 16.6879 2.60098 17.0377 2.95098C17.3877 3.30098 17.6044 3.63432 17.7861 4.10099C17.9229 4.45308 18.0861 4.98225 18.1304 5.95726C18.1784 7.01144 18.1888 7.32811 18.1888 9.99689C18.1888 12.6657 18.1784 12.9823 18.1304 14.0365C18.0858 15.0115 17.9229 15.5407 17.7861 15.8928C17.6048 16.3595 17.3877 16.6918 17.0377 17.0415C16.6877 17.3916 16.3554 17.6082 15.8885 17.7895C15.5364 17.927 15.0069 18.0895 14.0318 18.1341C12.9777 18.182 12.661 18.1924 9.99097 18.1924C7.32074 18.1924 7.00427 18.182 5.9501 18.1341C4.97509 18.0891 4.44591 17.9261 4.0932 17.7893C3.62653 17.608 3.29319 17.3913 2.94319 17.0413C2.59319 16.6913 2.37652 16.3588 2.19485 15.892C2.05797 15.5399 1.89484 15.0107 1.85047 14.0357C1.80255 12.9815 1.79297 12.6648 1.79297 9.99439C1.79297 7.32394 1.80255 7.00894 1.85047 5.95476C1.89505 4.97975 2.05797 4.45058 2.19485 4.09808C2.3761 3.6314 2.59319 3.29807 2.94319 2.94806C3.29319 2.59806 3.62653 2.38139 4.0932 2.19972C4.44571 2.06222 4.97509 1.89972 5.9501 1.85493C6.87261 1.81326 7.23011 1.80076 9.09388 1.79868V1.80118ZM15.3484 3.46373C14.6859 3.46373 14.1484 4.00062 14.1484 4.66333C14.1484 5.32584 14.6859 5.86334 15.3484 5.86334C16.011 5.86334 16.5485 5.32584 16.5485 4.66333C16.5485 4.00082 16.011 3.46332 15.3484 3.46332V3.46373ZM9.99875 4.86337C7.16268 4.86337 4.86328 7.16277 4.86328 9.99884C4.86328 12.8349 7.16268 15.1333 9.99875 15.1333C12.8348 15.1333 15.1334 12.8349 15.1334 9.99884C15.1334 7.16277 12.8346 4.86337 9.99854 4.86337H9.99875ZM10.0131 6.66611C11.8539 6.66611 13.3464 8.15841 13.3464 9.99948C13.3464 11.8403 11.8539 13.3328 10.0131 13.3328C8.172 13.3328 6.67969 11.8403 6.67969 9.99948C6.67969 8.15841 8.172 6.66611 10.0131 6.66611Z",fill:"url(#paint0_linear_2)"}}),t._v(" "),r("defs",[r("linearGradient",{attrs:{id:"paint0_linear_2",x1:"16.5385",y1:"1.15386",x2:"5.76908",y2:"17.6924",gradientUnits:"userSpaceOnUse"}},[r("stop",{attrs:{"stop-color":"#536DE8"}}),t._v(" "),r("stop",{attrs:{offset:"0.366894","stop-color":"#A84CA7"}}),t._v(" "),r("stop",{attrs:{offset:"0.751381","stop-color":"#FC3436"}}),t._v(" "),r("stop",{attrs:{offset:"1","stop-color":"#FFA10D"}})],1)],1)])]):t._e(),t._v(" "),t.activeStore.vk?r("a",{staticClass:"s-active-shop__social-link",attrs:{href:t.activeStore.vk}},[r("svg",{attrs:{viewBox:"0 0 26 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.005 13.8163C14.005 13.8163 14.4477 13.768 14.6745 13.5289C14.8821 13.3098 14.8749 12.8964 14.8749 12.8964C14.8749 12.8964 14.8473 10.9659 15.7605 10.6809C16.6604 10.4006 17.8159 12.5478 19.0423 13.3735C19.9686 13.9977 20.6718 13.8611 20.6718 13.8611L23.9488 13.8163C23.9488 13.8163 25.6623 13.7127 24.8499 12.39C24.7827 12.2816 24.3759 11.4112 22.4141 9.6232C20.3586 7.7516 20.6346 8.05431 23.1088 4.81642C24.6159 2.8447 25.2183 1.64095 25.0299 1.12623C24.8511 0.63389 23.7424 0.764631 23.7424 0.764631L20.0538 0.78701C20.0538 0.78701 19.7802 0.750497 19.5774 0.869459C19.3794 0.986066 19.251 1.25815 19.251 1.25815C19.251 1.25815 18.6679 2.78346 17.8891 4.08144C16.2464 6.81875 15.5901 6.96363 15.3213 6.79402C14.6961 6.39708 14.8521 5.20157 14.8521 4.35234C14.8521 1.69866 15.2625 0.592666 14.0542 0.30645C13.6534 0.211044 13.3582 0.148618 12.3323 0.138018C11.016 0.125062 9.90242 0.142729 9.27126 0.445435C8.85129 0.646847 8.52731 1.09678 8.7253 1.1227C8.96888 1.1545 9.52085 1.26875 9.81363 1.65979C10.1916 2.16509 10.1784 3.29817 10.1784 3.29817C10.1784 3.29817 10.3956 6.42182 9.67084 6.80933C9.17407 7.07552 8.49251 6.53253 7.0274 4.04846C6.27745 2.77639 5.71108 1.37004 5.71108 1.37004C5.71108 1.37004 5.60189 1.10738 5.4063 0.966042C5.16992 0.795255 4.83994 0.742252 4.83994 0.742252L1.33495 0.764631C1.33495 0.764631 0.808185 0.778765 0.614997 1.00373C0.443408 1.20279 0.601798 1.61621 0.601798 1.61621C0.601798 1.61621 3.34603 7.91886 6.45384 11.0955C9.30366 14.0071 12.5387 13.8163 12.5387 13.8163H14.005Z",fill:"#4C6C91"}})])]):t._e()])])]):t._e(),t._v(" "),r("div",{staticClass:"s-map"},[r("div",{staticClass:"s-map__header",attrs:{role:"tablist"}},[r("a",{staticClass:"s-map__tab",class:{active:"map"===t.currentTab},attrs:{role:"tab",href:"#map","aria-controls":"map"},on:{click:function(e){e.preventDefault(),t.currentTab="map"}}},[t._v("Карта")]),t._v(" "),r("a",{directives:[{name:"show",rawName:"v-show",value:t.activeStore&&(t.activeStore.wayOnAuto||t.activeStore.wayOnFoot||t.activeStore.wayImage),expression:"activeStore && (activeStore.wayOnAuto || activeStore.wayOnFoot || activeStore.wayImage)"}],staticClass:"s-map__tab",class:{active:"way"===t.currentTab},attrs:{role:"tab",href:"#way","aria-controls":"way"},on:{click:function(e){e.preventDefault(),t.currentTab="way"}}},[t._v("Как добраться")]),t._v(" "),r("a",{directives:[{name:"show",rawName:"v-show",value:t.activeStore&&t.activeStore.gallery,expression:"activeStore && activeStore.gallery"}],staticClass:"s-map__tab",class:{active:"photo"===t.currentTab},attrs:{role:"tab",href:"#photo","aria-controls":"photo"},on:{click:function(e){e.preventDefault(),t.currentTab="photo"}}},[t._v("Фото")])]),t._v(" "),r("div",{staticClass:"s-map__content"},[r("ShopListMap",{directives:[{name:"show",rawName:"v-show",value:"map"===t.currentTab,expression:"currentTab === 'map'"}],staticClass:"s-map__map",attrs:{role:"tabpanel",id:"#map",currentStoreId:t.currentStoreId},on:{change:t.setPoint}}),t._v(" "),t.activeStore?r("div",{directives:[{name:"show",rawName:"v-show",value:"way"===t.currentTab,expression:"currentTab === 'way'"}],staticClass:"s-map__way",attrs:{role:"tabpanel",id:"#way"}},[t.activeStore.wayImage?r("div",[r("img",{attrs:{src:t.activeStore.wayImage,alt:""}})]):t._e(),t._v(" "),r("div",{staticClass:"s-map__way-text"},[t.activeStore.wayOnAuto?[r("div",[t._v("Добраться на машине:")]),t._v(" "),r("p",{staticClass:"gray",domProps:{innerHTML:t._s(t.activeStore.wayOnAuto)}})]:t._e(),t._v(" "),t.activeStore.wayOnFoot?[r("div",[t._v("Добраться пешком:")]),t._v(" "),r("p",{staticClass:"gray",domProps:{innerHTML:t._s(t.activeStore.wayOnFoot)}})]:t._e()],2)]):t._e(),t._v(" "),t.activeStore&&t.activeStore.gallery?r("div",{directives:[{name:"show",rawName:"v-show",value:"photo"===t.currentTab,expression:"currentTab === 'photo'"}],staticClass:"s-map__gallery",attrs:{role:"tabpanel",id:"#photo"}},[r("img",{attrs:{src:t.activeStore.gallery,alt:""}})]):t._e()],1)])])])}),[],!1,null,null,null).exports,y=r(3);a()((function(){new n.a({store:y.a,render:function(t){return t(v)}}).$mount(".s-shops")}))},33:function(t,e,r){"use strict";function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function s(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(t){return(t.icon.color||"blue")+(t.icon.glyph?c(t.icon.glyph):t.icon.content?"Stretchy":"")}function c(t){return t.charAt(0).toUpperCase()+t.slice(1)}function l(t){return t.map((function(t){return Array.isArray(t)?l(t):+t}))}function u(t,e){var r=[];return function t(e,a){if(e===a)return!0;if(e instanceof Date&&a instanceof Date)return+e==+a;if("object"!==o(e)||"object"!==o(a))return!1;if(function(t,e){for(var o=r.length;o--;)if(!(r[o][0]!==t&&r[o][0]!==e||r[o][1]!==e&&r[o][1]!==t))return!0;return!1}(e,a))return!0;r.push([e,a]);var n=Object.keys(e),s=n.length;if(Object.keys(a).length!==s)return!1;for(;s--;)if(!t(e[n[s]],a[n[s]]))return!1;return!0}(t,e)}function p(t,e,r){u(t,e)||(r.rerender&&clearTimeout(r.rerender),r.rerender=setTimeout((function(){return r.updateMap&&r.updateMap()}),10))}r.d(e,"a",(function(){return g})),r.d(e,"b",(function(){return _}));var d=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.events={},this.ymapReady=!1,this.scriptIsNotAttached=!0}var e,r;return e=t,(r=[{key:"$on",value:function(t,e){var r=this;return this.events[t]||(this.events[t]=[]),this.events[t].push(e),function(){r.events[t]=r.events[t].filter((function(t){return e!==t}))}}},{key:"$emit",value:function(t,e){var r=this.events[t];r&&r.forEach((function(t){return t(e)}))}}])&&a(e.prototype,r),t}()),m=["fullscreenControl","geolocationControl","routeEditor","rulerControl","searchControl","trafficControl","typeSelector","zoomControl","routePanelControl"];function h(t){return 0===t.filter((function(t){return![].concat(m,["default"]).includes(t)})).length}function f(t,e){var r=c(t);if(!e)return r;switch(r){case"Placemark":return"Point";case"Polyline":return"LineString";default:return r}}function C(t,e){var r=e?{type:"Feature",id:t.properties.markerId,geometry:{type:t.markerType,coordinates:t.coords},properties:t.properties,options:t.options}:new ymaps[t.markerType](t.coords,t.properties,t.options);return r.clusterName=t.clusterName,e||function(t,e){if(t&&"object"===o(t))for(var r in t)e.events.add(r,t[r])}(t.callbacks,r),r}var v={pluginOptions:{},data:function(){return{ymapEventBus:d,ymapId:"yandexMap"+Math.round(1e5*Math.random()),myMap:{},style:this.ymapClass?"":"width: 100%; height: 100%;"}},props:{coords:{type:Array,validator:function(t){return!t.filter((function(t){return isNaN(t)})).length},required:!0},zoom:{validator:function(t){return!isNaN(t)},default:18},clusterOptions:{type:Object,default:function(){return{}}},clusterCallbacks:{type:Object,default:function(){return{}}},behaviors:{type:Array,default:function(){return["default"]}},controls:{type:Array,default:function(){return["default"]},validator:function(t){return h(t)}},detailedControls:{type:Object,validator:function(t){return h(Object.keys(t))}},scrollZoom:{type:Boolean,default:!0},zoomControl:Object,mapType:{type:String,default:"map",validator:function(t){return["map","satellite","hybrid"].includes(t)}},placemarks:{type:Array,default:function(){return[]}},useObjectManager:{type:Boolean,default:!1},objectManagerClusterize:{type:Boolean,default:!0},ymapClass:String,initWithoutMarkers:{type:Boolean,default:!0},mapLink:String,debug:{type:Boolean,default:!1},settings:{type:Object,default:function(){return{}}},options:{type:Object,default:function(){return{}}}},computed:{coordinates:function(){return this.coords.map((function(t){return+t}))}},methods:{getMarkersFromSlots:function(){return this.$slots.default&&this.$slots.default.map((function(t){var e=t.componentOptions&&t.componentOptions.propsData;if(e){var r={};e.balloonTemplate&&(r={balloonContentLayout:ymaps.templateLayoutFactory.createClass(e.balloonTemplate)});var o={markerId:e.markerId,markerType:e.markerType||"placemark",coords:l(e.coords),hintContent:e.hintContent,markerFill:e.markerFill,circleRadius:+e.circleRadius,clusterName:e.clusterName,markerStroke:e.markerStroke,balloon:e.balloon,callbacks:e.callbacks,properties:e.properties,options:e.options,balloonOptions:r};return e.icon&&["default#image","default#imageWithContent"].includes(e.icon.layout)?(o.iconContent=e.icon.content,o.iconLayout=e.icon.layout,o.iconImageHref=e.icon.imageHref,o.iconImageSize=e.icon.imageSize,o.iconImageOffset=e.icon.imageOffset,o.iconContentOffset=e.icon.contentOffset,e.icon.contentLayout&&"string"==typeof e.icon.contentLayout&&(o.iconContentLayout=ymaps.templateLayoutFactory.createClass(e.icon.contentLayout))):o.icon=e.icon,o}})).filter((function(t){return t&&t.markerType}))||[]},createMarkers:function(){for(var t=this,e=[],r=this.getMarkersFromSlots(),o=0;o<r.length;o++){var a=r[o],n=f(a.markerType,this.useObjectManager),s={hintContent:a.hintContent,iconContent:a.icon&&a.icon.content||a.iconContent,markerId:a.markerId},c=a.balloon?{balloonContentHeader:a.balloon.header,balloonContentBody:a.balloon.body,balloonContentFooter:a.balloon.footer}:{},l=Object.assign(s,c,a.properties),u=a.iconLayout?{iconLayout:a.iconLayout,iconImageHref:a.iconImageHref,iconImageSize:a.iconImageSize,iconImageOffset:a.iconImageOffset,iconContentOffset:a.iconContentOffset,iconContentLayout:a.iconContentLayout}:{preset:a.icon&&"islands#".concat(i(a),"Icon")},p=a.markerStroke?{strokeColor:a.markerStroke.color||"0066ffff",strokeOpacity:parseFloat(a.markerStroke.opacity)>=0?parseFloat(a.markerStroke.opacity):1,strokeStyle:a.markerStroke.style,strokeWidth:parseFloat(a.markerStroke.width)>=0?parseFloat(a.markerStroke.width):1}:{},d=a.markerFill?{fill:a.markerFill.enabled||!0,fillColor:a.markerFill.color||"0066ff99",fillOpacity:parseFloat(a.markerFill.opacity)>=0?parseFloat(a.markerFill.opacity):1,fillImageHref:a.markerFill.imageHref||""}:{},m=Object.assign(u,p,d,a.balloonOptions,a.options);"Circle"===n&&(a.coords=[a.coords,a.circleRadius]);var h=C({properties:l,options:m,markerType:n,coords:a.coords,clusterName:a.clusterName,callbacks:a.callbacks},this.useObjectManager);e.push(h)}return this.placemarks&&this.placemarks.forEach((function(r){var o=r.markerType,a=void 0===o?"Placemark":o,n=r.properties,s=r.options,i=void 0===s?{}:s,c=r.coords,l=r.clusterName,u=r.callbacks,p=r.balloonTemplate,d=f(a,t.useObjectManager);if(p){var m=ymaps.templateLayoutFactory.createClass(p);i.balloonContentLayout=m}var h=C({properties:n,options:i,markerType:d,coords:c,clusterName:l,callbacks:u},t.useObjectManager);e.push(h)})),e},setMarkers:function(){var t={options:this.clusterOptions,callbacks:this.clusterCallbacks,map:this.myMap,useObjectManager:this.useObjectManager,objectManagerClusterize:this.objectManagerClusterize};!function(t,e){var r=e.options,o=e.callbacks,a=e.map,n=e.useObjectManager,i=e.objectManagerClusterize,c={},l=[],u=!0,p=!1,d=void 0;try{for(var m,h=t[Symbol.iterator]();!(u=(m=h.next()).done);u=!0){var f=m.value;f.clusterName?c[f.clusterName]=c[f.clusterName]?[].concat(s(c[f.clusterName]),[f]):[f]:l.push(f)}}catch(t){p=!0,d=t}finally{try{u||null==h.return||h.return()}finally{if(p)throw d}}for(var C in c){var v=r[C]||{},y=o[C]||{},b=v.layout||"\n      <div>{{ properties.balloonContentHeader }}</div>\n      <div>{{ properties.balloonContentBody }}</div>\n      <div>{{ properties.balloonContentFooter }}</div>\n    ";v.clusterBalloonItemContentLayout=ymaps.templateLayoutFactory.createClass(b);var g=v.clusterLayout?ymaps.templateLayoutFactory.createClass(v.clusterLayout):v.clusterBalloonContentLayout||"cluster#balloonTwoColumns";v.clusterBalloonContentLayout=g;var _=v.clusterIconContentLayout;if(v.clusterIconContentLayout=_&&ymaps.templateLayoutFactory.createClass(_),n){var w=new ymaps.ObjectManager(Object.assign({clusterize:i},v));for(var k in y)w.clusters.events.add(k,y[k]);w.add(c[C]),a.geoObjects.add(w)}else{var O=new ymaps.Clusterer(v);for(var S in y)O.events.add(S,y[S]);v.createCluster&&(O.createCluster=v.createCluster),O.add(c[C]),a.geoObjects.add(O)}}if(l.length){var M=n?new ymaps.ObjectManager({clusterize:!1}):new ymaps.GeoObjectCollection;l.forEach((function(t){return M.add(t)})),a.geoObjects.add(M)}}(this.createMarkers(),t)},init:function(){var t=this;window.ymaps&&ymaps.GeoObjectCollection&&(this.initWithoutMarkers||this.$slots.default||this.placemarks.length)&&(this.$emit("map-initialization-started"),this.myMap=new ymaps.Map(this.ymapId,{center:this.coordinates,zoom:+this.zoom,behaviors:this.behaviors,controls:this.controls,type:"yandex#".concat(this.mapType)},this.options),this.myMap.events.add("click",(function(e){return t.$emit("click",e)})),this.zoomControl&&(this.myMap.controls.remove("zoomControl"),this.myMap.controls.add(new ymaps.control.ZoomControl(this.zoomControl))),this.detailedControls&&Object.keys(this.detailedControls).forEach((function(e){t.myMap.controls.remove(e),t.myMap.controls.add(e,t.detailedControls[e])})),!1===this.scrollZoom&&this.myMap.behaviors.disable("scrollZoom"),this.setMarkers(),this.$emit("map-was-initialized",this.myMap))}},watch:{coordinates:function(t){this.myMap.panTo&&this.myMap.panTo(t)},placemarks:function(){window.ymaps&&(this.myMap.geoObjects&&this.myMap.geoObjects.removeAll(),this.setMarkers())},zoom:function(){this.myMap.setZoom(this.zoom)}},render:function(t){return t("section",{class:"ymap-container",ref:"mapContainer"},[t("div",{attrs:{id:this.ymapId,class:this.ymapClass,style:this.style}}),t("div",{ref:"markersContainer",attrs:{class:"ymap-markers"}},[this.$slots.default])])},mounted:function(){var t=this;this.markerObserver=new MutationObserver(function(){this.myMap.geoObjects&&this.myMap.geoObjects.removeAll(),this.setMarkers()}.bind(this)),this.mapObserver=new MutationObserver(function(){this.myMap.container.fitToViewport()}.bind(this));var e=this.$refs,r=e.markersContainer,o=e.mapContainer;if(this.markerObserver.observe(r,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),this.mapObserver.observe(o,{attributes:!0,childList:!0,characterData:!0,subtree:!1}),this.ymapEventBus.scriptIsNotAttached){var a=document.createElement("SCRIPT"),s=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})))),o.forEach((function(e){n(t,e,r[e])}))}return t}({},this.$options.pluginOptions,this.settings),i=s.apiKey,c=void 0===i?"":i,l=s.lang,u=void 0===l?"ru_RU":l,p=s.version,d=void 0===p?"2.1":p,m=s.coordorder,h=void 0===m?"latlong":m,f=this.debug?"debug":"release",C="lang=".concat(u).concat(c&&"&apikey=".concat(c),"&mode=").concat(f,"&coordorder=").concat(h),v=this.mapLink||"https://api-maps.yandex.ru/".concat(d,"/?").concat(C);a.setAttribute("src",v),a.setAttribute("async",""),a.setAttribute("defer",""),document.body.appendChild(a),this.ymapEventBus.scriptIsNotAttached=!1,a.onload=function(){t.ymapEventBus.ymapReady=!0,t.ymapEventBus.$emit("scriptIsLoaded")}}this.ymapEventBus.ymapReady?ymaps.ready(this.init):this.ymapEventBus.$on("scriptIsLoaded",(function(){t.ymapEventBus.updateMap=function(){t.myMap.geoObjects&&t.myMap.geoObjects.removeAll(),t.setMarkers()},ymaps.ready(t.init)}))},beforeDestroy:function(){this.myMap.geoObjects&&this.myMap.geoObjects.removeAll(),this.markerObserver.disconnect()}},y=["placemark","polyline","rectangle","polygon","circle"],b={data:function(){return{ymapEventBus:d,unwatchArr:[]}},props:{coords:{type:Array,required:!0,validator:function(t){return!t.filter((function(t){return isNaN(t)})).length}},hintContent:String,icon:Object,balloon:Object,markerType:{type:String,validator:function(t){return y.includes(t.toLowerCase())},default:"placemark"},markerFill:Object,markerStroke:Object,clusterName:String,circleRadius:{validator:function(t){return!isNaN(t)},default:1e3},callbacks:Object,balloonTemplate:String,markerId:{type:[String,Number],required:!0},properties:Object,options:Object},render:function(){},mounted:function(){var t=this;for(var e in this.$props)this.unwatchArr.push(this.$watch(e,(function(e,r){return p(e,r,t.ymapEventBus)})))},beforeDestroy:function(){this.unwatchArr.forEach((function(t){return t()}))}};v.install=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};v.pluginOptions=e,t.component("yandex-map",v),t.component("ymap-marker",b)},"undefined"!=typeof window&&window.Vue&&window.Vue.use(v);var g=v,_=b},48:function(t,e,r){"use strict";r(4);var o=r(33),a=r(50),n={name:"ShopListMap",components:{yandexMap:o.a,ymapMarker:o.b},model:{prop:"currentStoreId",event:"change"},props:{currentStoreId:{type:Number,requared:!1}},data:function(){return{coords:[55.74954,37.621587],zoom:17,options:{avoidFractionalZoom:!1}}},watch:{currentStoreId:function(t,e){console.log("сменилось c",e," на ",t),this.objectManager&&(t?this.openBalloon(t):this.objectManager.objects.balloon.close())}},methods:{mapInit:function(t){var e=this;console.log("init"),this.map=t,this.map.margin.setDefaultMargin(200),this.objectManager=a.a.createObjectManager(ymaps),this.objectManager.add({type:"FeatureCollection",features:this.$store.state.storeList.map((function(t){return{type:"Feature",id:t.id,geometry:{type:"Point",coordinates:t.coords},properties:{address:t.name,tel:t.phone[0],link:"Схема проезда",cityId:t.cityId}}}))}),this.objectManager.objects.options.set("openBalloonOnClick",!1),this.objectManager.objects.events.add("click",(function(t){e.objectManager.objects.balloon.isOpen(t.get("objectId"))?e.$emit("change",null):e.$emit("change",t.get("objectId"))})),this.map.geoObjects.add(this.objectManager);var r=this.map.container.getSize();if(0!==r[0]&&0!==r[1]){if(this.currentStoreId)return console.log("setCenter",this.currentStoreId),void this.openBalloon(this.currentStoreId);console.log("setBounds");var o=this.$store.state.storeList.filter((function(t){return t.cityId===e.$store.state.cityId})).map((function(t){return t.coords}));o.length?this.map.setBounds(ymaps.util.pixelBounds.fromPoints(o),{checkZoomRange:!0,preciseZoom:!0,useMapMargin:!0}):this.map.setBounds(this.map.geoObjects.getBounds(),{checkZoomRange:!0,preciseZoom:!0,useMapMargin:!0})}},openBalloon:function(t){var e=this;this.objectManager.objects.balloon.open(t).then((function(){var r=e.objectManager.objects.getById(t);console.log("Открываем балун"),e.map.setCenter(r.geometry.coordinates,16,{duration:1e3,timingFunction:"ease-in-out",useMapMargin:!0,checkZoomRange:!0})}))}},beforeDestroy:function(){this.objectManager.objects.balloon.close()}},s=r(1),i=Object(s.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("yandex-map",{attrs:{coords:this.coords,zoom:this.zoom,options:this.options,controls:[],debug:!0},on:{"map-was-initialized":this.mapInit}})}),[],!1,null,"217bb49e",null);e.a=i.exports}},[[278,1,0]]]);