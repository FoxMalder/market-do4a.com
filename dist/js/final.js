/*!
 * Front for marketdo4a.com 1.5.0 
 * By Roman Meshcheryakov, Riverstart, 2020
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[6,12],{14:function(t,e){t.exports=jQuery},274:function(t,e,o){"use strict";o.r(e);var r=o(13),n=o.n(r),a=o(5),i=(o(40),o(88)),s=o(64),c=o(48),l=o(3);a.a.use(i.b),n()((function(){new a.a({store:l.a,render:function(t){return t(c.a)}}).$mount("#map"),[].forEach.call(document.querySelectorAll("[data-marker-id]"),(function(t){t.addEventListener("click",(function(t){t.preventDefault();var e=parseInt(t.target.dataset.markerId,10);a.a.$modal.open(s.a,{props:{storeId:e}})}))}))}))},33:function(t,e,o){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function i(t){return function(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(t){return(t.icon.color||"blue")+(t.icon.glyph?c(t.icon.glyph):t.icon.content?"Stretchy":"")}function c(t){return t.charAt(0).toUpperCase()+t.slice(1)}function l(t){return t.map((function(t){return Array.isArray(t)?l(t):+t}))}function u(t,e){var o=[];return function t(e,n){if(e===n)return!0;if(e instanceof Date&&n instanceof Date)return+e==+n;if("object"!==r(e)||"object"!==r(n))return!1;if(function(t,e){for(var r=o.length;r--;)if(!(o[r][0]!==t&&o[r][0]!==e||o[r][1]!==e&&o[r][1]!==t))return!0;return!1}(e,n))return!0;o.push([e,n]);var a=Object.keys(e),i=a.length;if(Object.keys(n).length!==i)return!1;for(;i--;)if(!t(e[a[i]],n[a[i]]))return!1;return!0}(t,e)}function p(t,e,o){u(t,e)||(o.rerender&&clearTimeout(o.rerender),o.rerender=setTimeout((function(){return o.updateMap&&o.updateMap()}),10))}o.d(e,"a",(function(){return k})),o.d(e,"b",(function(){return C}));var m=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.events={},this.ymapReady=!1,this.scriptIsNotAttached=!0}var e,o;return e=t,(o=[{key:"$on",value:function(t,e){var o=this;return this.events[t]||(this.events[t]=[]),this.events[t].push(e),function(){o.events[t]=o.events[t].filter((function(t){return e!==t}))}}},{key:"$emit",value:function(t,e){var o=this.events[t];o&&o.forEach((function(t){return t(e)}))}}])&&n(e.prototype,o),t}()),d=["fullscreenControl","geolocationControl","routeEditor","rulerControl","searchControl","trafficControl","typeSelector","zoomControl","routePanelControl"];function f(t){return 0===t.filter((function(t){return![].concat(d,["default"]).includes(t)})).length}function y(t,e){var o=c(t);if(!e)return o;switch(o){case"Placemark":return"Point";case"Polyline":return"LineString";default:return o}}function h(t,e){var o=e?{type:"Feature",id:t.properties.markerId,geometry:{type:t.markerType,coordinates:t.coords},properties:t.properties,options:t.options}:new ymaps[t.markerType](t.coords,t.properties,t.options);return o.clusterName=t.clusterName,e||function(t,e){if(t&&"object"===r(t))for(var o in t)e.events.add(o,t[o])}(t.callbacks,o),o}var b={pluginOptions:{},data:function(){return{ymapEventBus:m,ymapId:"yandexMap"+Math.round(1e5*Math.random()),myMap:{},style:this.ymapClass?"":"width: 100%; height: 100%;"}},props:{coords:{type:Array,validator:function(t){return!t.filter((function(t){return isNaN(t)})).length},required:!0},zoom:{validator:function(t){return!isNaN(t)},default:18},clusterOptions:{type:Object,default:function(){return{}}},clusterCallbacks:{type:Object,default:function(){return{}}},behaviors:{type:Array,default:function(){return["default"]}},controls:{type:Array,default:function(){return["default"]},validator:function(t){return f(t)}},detailedControls:{type:Object,validator:function(t){return f(Object.keys(t))}},scrollZoom:{type:Boolean,default:!0},zoomControl:Object,mapType:{type:String,default:"map",validator:function(t){return["map","satellite","hybrid"].includes(t)}},placemarks:{type:Array,default:function(){return[]}},useObjectManager:{type:Boolean,default:!1},objectManagerClusterize:{type:Boolean,default:!0},ymapClass:String,initWithoutMarkers:{type:Boolean,default:!0},mapLink:String,debug:{type:Boolean,default:!1},settings:{type:Object,default:function(){return{}}},options:{type:Object,default:function(){return{}}}},computed:{coordinates:function(){return this.coords.map((function(t){return+t}))}},methods:{getMarkersFromSlots:function(){return this.$slots.default&&this.$slots.default.map((function(t){var e=t.componentOptions&&t.componentOptions.propsData;if(e){var o={};e.balloonTemplate&&(o={balloonContentLayout:ymaps.templateLayoutFactory.createClass(e.balloonTemplate)});var r={markerId:e.markerId,markerType:e.markerType||"placemark",coords:l(e.coords),hintContent:e.hintContent,markerFill:e.markerFill,circleRadius:+e.circleRadius,clusterName:e.clusterName,markerStroke:e.markerStroke,balloon:e.balloon,callbacks:e.callbacks,properties:e.properties,options:e.options,balloonOptions:o};return e.icon&&["default#image","default#imageWithContent"].includes(e.icon.layout)?(r.iconContent=e.icon.content,r.iconLayout=e.icon.layout,r.iconImageHref=e.icon.imageHref,r.iconImageSize=e.icon.imageSize,r.iconImageOffset=e.icon.imageOffset,r.iconContentOffset=e.icon.contentOffset,e.icon.contentLayout&&"string"==typeof e.icon.contentLayout&&(r.iconContentLayout=ymaps.templateLayoutFactory.createClass(e.icon.contentLayout))):r.icon=e.icon,r}})).filter((function(t){return t&&t.markerType}))||[]},createMarkers:function(){for(var t=this,e=[],o=this.getMarkersFromSlots(),r=0;r<o.length;r++){var n=o[r],a=y(n.markerType,this.useObjectManager),i={hintContent:n.hintContent,iconContent:n.icon&&n.icon.content||n.iconContent,markerId:n.markerId},c=n.balloon?{balloonContentHeader:n.balloon.header,balloonContentBody:n.balloon.body,balloonContentFooter:n.balloon.footer}:{},l=Object.assign(i,c,n.properties),u=n.iconLayout?{iconLayout:n.iconLayout,iconImageHref:n.iconImageHref,iconImageSize:n.iconImageSize,iconImageOffset:n.iconImageOffset,iconContentOffset:n.iconContentOffset,iconContentLayout:n.iconContentLayout}:{preset:n.icon&&"islands#".concat(s(n),"Icon")},p=n.markerStroke?{strokeColor:n.markerStroke.color||"0066ffff",strokeOpacity:parseFloat(n.markerStroke.opacity)>=0?parseFloat(n.markerStroke.opacity):1,strokeStyle:n.markerStroke.style,strokeWidth:parseFloat(n.markerStroke.width)>=0?parseFloat(n.markerStroke.width):1}:{},m=n.markerFill?{fill:n.markerFill.enabled||!0,fillColor:n.markerFill.color||"0066ff99",fillOpacity:parseFloat(n.markerFill.opacity)>=0?parseFloat(n.markerFill.opacity):1,fillImageHref:n.markerFill.imageHref||""}:{},d=Object.assign(u,p,m,n.balloonOptions,n.options);"Circle"===a&&(n.coords=[n.coords,n.circleRadius]);var f=h({properties:l,options:d,markerType:a,coords:n.coords,clusterName:n.clusterName,callbacks:n.callbacks},this.useObjectManager);e.push(f)}return this.placemarks&&this.placemarks.forEach((function(o){var r=o.markerType,n=void 0===r?"Placemark":r,a=o.properties,i=o.options,s=void 0===i?{}:i,c=o.coords,l=o.clusterName,u=o.callbacks,p=o.balloonTemplate,m=y(n,t.useObjectManager);if(p){var d=ymaps.templateLayoutFactory.createClass(p);s.balloonContentLayout=d}var f=h({properties:a,options:s,markerType:m,coords:c,clusterName:l,callbacks:u},t.useObjectManager);e.push(f)})),e},setMarkers:function(){var t={options:this.clusterOptions,callbacks:this.clusterCallbacks,map:this.myMap,useObjectManager:this.useObjectManager,objectManagerClusterize:this.objectManagerClusterize};!function(t,e){var o=e.options,r=e.callbacks,n=e.map,a=e.useObjectManager,s=e.objectManagerClusterize,c={},l=[],u=!0,p=!1,m=void 0;try{for(var d,f=t[Symbol.iterator]();!(u=(d=f.next()).done);u=!0){var y=d.value;y.clusterName?c[y.clusterName]=c[y.clusterName]?[].concat(i(c[y.clusterName]),[y]):[y]:l.push(y)}}catch(t){p=!0,m=t}finally{try{u||null==f.return||f.return()}finally{if(p)throw m}}for(var h in c){var b=o[h]||{},v=r[h]||{},g=b.layout||"\n      <div>{{ properties.balloonContentHeader }}</div>\n      <div>{{ properties.balloonContentBody }}</div>\n      <div>{{ properties.balloonContentFooter }}</div>\n    ";b.clusterBalloonItemContentLayout=ymaps.templateLayoutFactory.createClass(g);var k=b.clusterLayout?ymaps.templateLayoutFactory.createClass(b.clusterLayout):b.clusterBalloonContentLayout||"cluster#balloonTwoColumns";b.clusterBalloonContentLayout=k;var C=b.clusterIconContentLayout;if(b.clusterIconContentLayout=C&&ymaps.templateLayoutFactory.createClass(C),a){var O=new ymaps.ObjectManager(Object.assign({clusterize:s},b));for(var j in v)O.clusters.events.add(j,v[j]);O.add(c[h]),n.geoObjects.add(O)}else{var M=new ymaps.Clusterer(b);for(var S in v)M.events.add(S,v[S]);b.createCluster&&(M.createCluster=b.createCluster),M.add(c[h]),n.geoObjects.add(M)}}if(l.length){var w=a?new ymaps.ObjectManager({clusterize:!1}):new ymaps.GeoObjectCollection;l.forEach((function(t){return w.add(t)})),n.geoObjects.add(w)}}(this.createMarkers(),t)},init:function(){var t=this;window.ymaps&&ymaps.GeoObjectCollection&&(this.initWithoutMarkers||this.$slots.default||this.placemarks.length)&&(this.$emit("map-initialization-started"),this.myMap=new ymaps.Map(this.ymapId,{center:this.coordinates,zoom:+this.zoom,behaviors:this.behaviors,controls:this.controls,type:"yandex#".concat(this.mapType)},this.options),this.myMap.events.add("click",(function(e){return t.$emit("click",e)})),this.zoomControl&&(this.myMap.controls.remove("zoomControl"),this.myMap.controls.add(new ymaps.control.ZoomControl(this.zoomControl))),this.detailedControls&&Object.keys(this.detailedControls).forEach((function(e){t.myMap.controls.remove(e),t.myMap.controls.add(e,t.detailedControls[e])})),!1===this.scrollZoom&&this.myMap.behaviors.disable("scrollZoom"),this.setMarkers(),this.$emit("map-was-initialized",this.myMap))}},watch:{coordinates:function(t){this.myMap.panTo&&this.myMap.panTo(t)},placemarks:function(){window.ymaps&&(this.myMap.geoObjects&&this.myMap.geoObjects.removeAll(),this.setMarkers())},zoom:function(){this.myMap.setZoom(this.zoom)}},render:function(t){return t("section",{class:"ymap-container",ref:"mapContainer"},[t("div",{attrs:{id:this.ymapId,class:this.ymapClass,style:this.style}}),t("div",{ref:"markersContainer",attrs:{class:"ymap-markers"}},[this.$slots.default])])},mounted:function(){var t=this;this.markerObserver=new MutationObserver(function(){this.myMap.geoObjects&&this.myMap.geoObjects.removeAll(),this.setMarkers()}.bind(this)),this.mapObserver=new MutationObserver(function(){this.myMap.container.fitToViewport()}.bind(this));var e=this.$refs,o=e.markersContainer,r=e.mapContainer;if(this.markerObserver.observe(o,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),this.mapObserver.observe(r,{attributes:!0,childList:!0,characterData:!0,subtree:!1}),this.ymapEventBus.scriptIsNotAttached){var n=document.createElement("SCRIPT"),i=function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},r=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(o).filter((function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable})))),r.forEach((function(e){a(t,e,o[e])}))}return t}({},this.$options.pluginOptions,this.settings),s=i.apiKey,c=void 0===s?"":s,l=i.lang,u=void 0===l?"ru_RU":l,p=i.version,m=void 0===p?"2.1":p,d=i.coordorder,f=void 0===d?"latlong":d,y=this.debug?"debug":"release",h="lang=".concat(u).concat(c&&"&apikey=".concat(c),"&mode=").concat(y,"&coordorder=").concat(f),b=this.mapLink||"https://api-maps.yandex.ru/".concat(m,"/?").concat(h);n.setAttribute("src",b),n.setAttribute("async",""),n.setAttribute("defer",""),document.body.appendChild(n),this.ymapEventBus.scriptIsNotAttached=!1,n.onload=function(){t.ymapEventBus.ymapReady=!0,t.ymapEventBus.$emit("scriptIsLoaded")}}this.ymapEventBus.ymapReady?ymaps.ready(this.init):this.ymapEventBus.$on("scriptIsLoaded",(function(){t.ymapEventBus.updateMap=function(){t.myMap.geoObjects&&t.myMap.geoObjects.removeAll(),t.setMarkers()},ymaps.ready(t.init)}))},beforeDestroy:function(){this.myMap.geoObjects&&this.myMap.geoObjects.removeAll(),this.markerObserver.disconnect()}},v=["placemark","polyline","rectangle","polygon","circle"],g={data:function(){return{ymapEventBus:m,unwatchArr:[]}},props:{coords:{type:Array,required:!0,validator:function(t){return!t.filter((function(t){return isNaN(t)})).length}},hintContent:String,icon:Object,balloon:Object,markerType:{type:String,validator:function(t){return v.includes(t.toLowerCase())},default:"placemark"},markerFill:Object,markerStroke:Object,clusterName:String,circleRadius:{validator:function(t){return!isNaN(t)},default:1e3},callbacks:Object,balloonTemplate:String,markerId:{type:[String,Number],required:!0},properties:Object,options:Object},render:function(){},mounted:function(){var t=this;for(var e in this.$props)this.unwatchArr.push(this.$watch(e,(function(e,o){return p(e,o,t.ymapEventBus)})))},beforeDestroy:function(){this.unwatchArr.forEach((function(t){return t()}))}};b.install=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};b.pluginOptions=e,t.component("yandex-map",b),t.component("ymap-marker",g)},"undefined"!=typeof window&&window.Vue&&window.Vue.use(b);var k=b,C=g},48:function(t,e,o){"use strict";var r=function(){var t=this.$createElement;return(this._self._c||t)("yandex-map",{attrs:{coords:this.coords,zoom:this.zoom,options:this.options,controls:[],debug:!0},on:{"map-was-initialized":this.mapInit}})};r._withStripped=!0;o(4);var n=o(33),a=o(50),i={name:"ShopListMap",components:{yandexMap:n.a,ymapMarker:n.b},model:{prop:"currentStoreId",event:"change"},props:{currentStoreId:{type:Number,requared:!1}},data:function(){return{coords:[55.74954,37.621587],zoom:17,options:{avoidFractionalZoom:!1}}},watch:{currentStoreId:function(t,e){console.log("сменилось c",e," на ",t),this.objectManager&&(t?this.openBalloon(t):this.objectManager.objects.balloon.close())}},methods:{mapInit:function(t){var e=this;console.log("init"),this.map=t,this.map.margin.setDefaultMargin(200),this.objectManager=a.a.createObjectManager(ymaps),this.objectManager.add({type:"FeatureCollection",features:this.$store.state.storeList.map((function(t){return{type:"Feature",id:t.id,geometry:{type:"Point",coordinates:t.coords},properties:{address:t.name,tel:t.phone[0],link:"Схема проезда",cityId:t.cityId}}}))}),this.objectManager.objects.options.set("openBalloonOnClick",!1),this.objectManager.objects.events.add("click",(function(t){e.objectManager.objects.balloon.isOpen(t.get("objectId"))?e.$emit("change",null):e.$emit("change",t.get("objectId"))})),this.map.geoObjects.add(this.objectManager);var o=this.map.container.getSize();if(0!==o[0]&&0!==o[1]){if(this.currentStoreId)return console.log("setCenter",this.currentStoreId),void this.openBalloon(this.currentStoreId);console.log("setBounds");var r=this.$store.state.storeList.filter((function(t){return t.cityId===e.$store.state.cityId})).map((function(t){return t.coords}));r.length?this.map.setBounds(ymaps.util.pixelBounds.fromPoints(r),{checkZoomRange:!0,preciseZoom:!0,useMapMargin:!0}):this.map.setBounds(this.map.geoObjects.getBounds(),{checkZoomRange:!0,preciseZoom:!0,useMapMargin:!0})}},openBalloon:function(t){var e=this;this.objectManager.objects.balloon.open(t).then((function(){var o=e.objectManager.objects.getById(t);console.log("Открываем балун"),e.map.setCenter(o.geometry.coordinates,16,{duration:1e3,timingFunction:"ease-in-out",useMapMargin:!0,checkZoomRange:!0})}))}},beforeDestroy:function(){this.objectManager.objects.balloon.close()}},s=o(1),c=Object(s.a)(i,r,[],!1,null,"55ff89ec",null);c.options.__file="src/js/components/ShopListMap.vue";e.a=c.exports},64:function(t,e,o){"use strict";var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"m-store-on-map"},[t._m(0),t._v(" "),o("div",{staticClass:"m-store-on-map__mask"},[o("ShopListMap",{staticClass:"m-store-on-map__map",model:{value:t.currentStoreId,callback:function(e){t.currentStoreId=e},expression:"currentStoreId"}})],1),t._v(" "),o("div",{staticClass:"m-store-on-map__footer"},[t.activeStore?o("div",{staticClass:"m-store-on-map__way row"},[t.activeStore.wayOnAuto?o("div",{staticClass:"col-xl-6"},[o("div",[t._v("Добраться на машине:")]),t._v(" "),o("p",{staticClass:"gray",domProps:{innerHTML:t._s(t.activeStore.wayOnAuto)}})]):t._e(),t._v(" "),t.activeStore.wayOnFoot?o("div",{staticClass:"col-xl-6"},[o("div",[t._v("Добраться пешком:")]),t._v(" "),o("p",{staticClass:"gray",domProps:{innerHTML:t._s(t.activeStore.wayOnFoot)}})]):t._e()]):t._e()])])};r._withStripped=!0;var n={name:"AppModalMap",components:{ShopListMap:o(48).a},props:{storeId:{type:Number,default:null}},data:function(){return{currentStoreId:this.storeId}},computed:{activeStore:function(){return this.$store.getters.getStoreById(this.currentStoreId)}},methods:{setPoint:function(t){console.log("setPoint",t),this.currentStoreId=t}}},a=o(1),i=Object(a.a)(n,r,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"m-store-on-map__header"},[e("div",{staticClass:"m-store-on-map__title"},[this._v("Магазины на карте")])])}],!1,null,"429462d8",null);i.options.__file="src/js/components/AppModalMap.vue";e.a=i.exports}},[[274,1,0]]]);