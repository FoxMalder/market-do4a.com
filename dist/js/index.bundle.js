(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,i){"use strict";i.r(t);i(8),i(2),i(11),i(12),i(4),i(13);var s=i(5),l=i.n(s);function r(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var n=function(){function e(){var t,i,s,l=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),s=function(){l.el.classList.toggle("opened"),l.menuControlBtn.classList.toggle("active");var e=document.querySelector(".header-control__search"),t=document.querySelector(".header-control__button_search");e.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow?document.body.style.overflow="":document.body.style.overflow="hidden"},(i="toggleMenu")in(t=this)?Object.defineProperty(t,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[i]=s,this.el=document.querySelector(".mobile-menu"),this.menuControlBtn=document.querySelector(".header-control__menu-btn"),this.menuOverlayEl=document.querySelector(".mobile-menu__overlay"),this.init()}var t,i,s;return t=e,(i=[{key:"init",value:function(){this.el.MobileMenu=this,this.menuControlBtn.addEventListener("click",this.toggleMenu),this.menuOverlayEl.addEventListener("click",this.toggleMenu)}},{key:"destroy",value:function(){this.el.MobileMenu=null,this.menuControlBtn.removeEventListener("click",this.toggleMenu),this.menuOverlayEl.removeEventListener("click",this.toggleMenu)}}])&&r(t.prototype,i),s&&r(t,s),e}();var a,o,c,d=i(6),u=i.n(d);a=document.querySelector("#map"),o={center:[55.76,37.64],zoom:7,controls:[]},c={type:"Feature",id:0,geometry:{type:"Point",coordinates:[55.76,37.64]},properties:{address:"ул. Невзоровых, 64к2",tel:"8 (920) 028-20-44",link:"Схема проезда"}},a&&""!==a&&u.a.load("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(function(e){var t=new e.Map(a,o),i=new e.ObjectManager({clusterize:!0,gridSize:32,clusterDisableClickZoom:!0}),s=e.templateLayoutFactory.createClass('<div class="map-balloon ">\n        <div class="map-balloon__inner">\n          $[[options.contentLayout observeSize]]\n        </div>\n      </div>',{build:function(){this.constructor.superclass.build.call(this),this.$element=$(".map-balloon",this.getParentElement()),this.applyElementOffset()},clear:function(){this.constructor.superclass.clear.call(this)},onSublayoutSizeChange:function(){s.superclass.onSublayoutSizeChange.apply(this,arguments),this.isElement(this.$element)&&(this.applyElementOffset(),this.events.fire("shapechange"))},applyElementOffset:function(){this.$element.css({left:-this.$element[0].offsetWidth/2})},getShape:function(){if(!this.isElement(this.$element))return s.superclass.getShape.call(this);var t=this.$element.position();return new e.shape.Rectangle(new e.geometry.pixel.Rectangle([[t.left,t.top],[t.left+this.$element[0].offsetWidth,0]]))},isElement:function(e){return e&&e[0]}}),l=e.templateLayoutFactory.createClass('\n        <div class="map-balloon__address">{{ properties.address }}</div>\n        <div class="map-balloon__tel">{{ properties.tel }}</div>\n        <div class="map-balloon__scheme">{{ properties.link }}</div>');i.objects.options.set({iconLayout:"default#image",iconImageHref:"img/marker.svg",iconImageSize:[58,74],iconImageOffset:[-29,-74],balloonShadow:!1,balloonLayout:s,balloonContentLayout:l,balloonPanelMaxMapArea:0,hideIconOnBalloonOpen:!1,balloonOffset:[40,15]}),i.objects.events.add("balloonopen",function(e){e.get("target").options.set("iconImageHref","img/marker-selected.svg")}).add("balloonclose",function(e){e.get("target").options.set("iconImageHref","img/marker.svg")}),t.geoObjects.add(i),i.add(c)}).catch(function(e){return console.log("Failed to load Yandex Maps",e)});var p=i(7),h=i.n(p),v=i(0),_=i(3);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var m={isObject:function(e){return"object"===f(e)&&null!==e&&e.constructor&&e.constructor===Object},extend:function(){for(var e=Object(arguments.length<=0?void 0:arguments[0]),t=1;t<arguments.length;t+=1){var i=t<0||arguments.length<=t?void 0:arguments[t];if(null!=i)for(var s=Object.keys(Object(i)),l=0,r=s.length;l<r;l+=1){var n=s[l],a=Object.getOwnPropertyDescriptor(i,n);void 0!==a&&a.enumerable&&(m.isObject(e[n])&&m.isObject(i[n])?m.extend(e[n],i[n]):!m.isObject(e[n])&&m.isObject(i[n])?(e[n]={},m.extend(e[n],i[n])):e[n]=i[n])}}return e}},g=m;function b(e,t){var i=e.querySelector(".hero-slider__left-line"),s=e.querySelector(".hero-slider__right-line"),l=e.querySelector(".hero-slider__img"),r=e.querySelector(".hero-slider__inner"),n=window.getComputedStyle(i).transform;i.style.transform=n,s.style.transform=n;var a=_.a.timeline({autoplay:!1,complete:t});return a.add({targets:e,translateX:{value:["-100%",0],easing:"spring(1, 100, 20, 0)"},opacity:{value:[0,1],easing:"cubicBezier(.25, .1, .25, 1)",duration:400}}).add({targets:r,translateX:[-160,0],scale:[1.3,1],easing:"spring(1, 100, 20, 0)"},200).add({targets:s,translateX:{value:[-670,0],easing:"spring(1, 100, 20, 0)"},opacity:{value:[0,1],easing:"cubicBezier(.25, .1, .25, 1)",duration:300}},300).add({targets:i,translateX:{value:[-670,0],easing:"spring(1, 100, 20, 0)"},opacity:{value:[0,1],easing:"cubicBezier(.25, .1, .25, 1)",duration:300}},400).add({targets:l,translateX:{value:[-110,0],easing:"spring(1, 100, 20, 0)"},opacity:{value:[0,1],easing:"cubicBezier(.25, .1, .25, 1)",duration:300}},800),a}var y={init:function(){var e=this,t=e.slides;e.heroSliderEffect.animationsArray=Array.from(t).map(function(t){return{start:b(t,function(){return e.emit("transitionEnd")}),second:Object(_.a)({autoplay:!1,duration:e.params.heroSliderEffect.duration,easing:"easeInOutQuad",targets:t.querySelector(".hero-slider__img"),translateX:[0,"5%"],complete:function(){e.slideNext()}})}}),e.heroSliderEffect.animationsArray[0].start.play()},setTranslate:function(e){console.log("setTranslate, active:".concat(this.activeIndex,", prev: ").concat(this.previousIndex,", translate: ").concat(e));for(var t=this.slides,i=0;i<t.length;i+=1){var s=this.slides.eq(i),l=-s[0].swiperSlideOffset;this.params.virtualTranslate||(l-=this.translate);this.isHorizontal()||(l,l=0);Math.min(Math.max(s[0].progress,-1),0)}},setTransition:function(e){console.log("setTransition, active:".concat(this.activeIndex,", prev: ").concat(this.previousIndex))},setTransitionStart:function(){for(var e=this.slides,t=this.pagination.bullets,i=0;i<e.length;i+=1){var s=t.eq(i).find(".hero-slider-control__loader-line");s.transition(300),s.removeClass("active");var l=this.heroSliderEffect.animationsArray[i];l.start.seek(0),l.second.pause(),i===this.activeIndex?l.start.play():i===this.previousIndex&&l.start.seek(l.start.duration)}},setTransitionEnd:function(){for(var e=this.slides,t=this.pagination.bullets,i=0;i<e.length;i+=1){var s=t.eq(i).find(".hero-slider-control__loader-line");s.transition(this.params.heroSliderEffect.duration);var l=this.heroSliderEffect.animationsArray[i];l.second.pause(),l.second.seek(0),i===this.activeIndex?(l.second.play(),s.addClass("active")):this.previousIndex}}},C={name:"effect-hero-slider",params:{heroSliderEffect:{duration:1e4,animationsArray:[]}},create:function(){g.extend(this,{heroSliderEffect:{init:y.init.bind(this),setTranslate:y.setTranslate.bind(this),setTransition:y.setTransition.bind(this),setTransitionStart:y.setTransitionStart.bind(this),setTransitionEnd:y.setTransitionEnd.bind(this)}})},on:{beforeInit:function(){if("hero-slider"===this.params.effect){this.heroSliderEffect.animationsArray=[],this.classNames.push("".concat(this.params.containerModifierClass,"fade"));var e={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};g.extend(this.params,e),g.extend(this.originalParams,e)}},init:function(){"hero-slider"===this.params.effect&&this.heroSliderEffect.init()},transitionStart:function(){"hero-slider"===this.params.effect&&this.heroSliderEffect.setTransitionStart()},transitionEnd:function(){"hero-slider"===this.params.effect&&this.heroSliderEffect.setTransitionEnd()}}};v.g.use([v.d,v.e,v.f,v.b,v.a,v.c,v.h]),v.g.use([C]);var S=document.querySelector(".hero-slider"),w=document.querySelector("#stars-slider"),x=document.querySelector(".best-articles__slider"),E=$(".set-block__slider");new h.a("#stars-slider .slider__controls");if(E.owlCarousel({loop:!0,items:1,center:!0,autoWidth:!0,nav:!1,dots:!1,margin:10,navContainerClass:"slider-nav",navText:['<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 5.96968L7.5 5.96968L7.5 9.5498L0 5.21968L7.5 0.88955L7.5 4.46968L16.5 4.46968L16.5 5.96968Z"/>\n      </svg>','<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3.96978L9.5 3.96978L9.5 0.389649L17 4.71978L9.5 9.0499L9.5 5.46978L0.5 5.46978L0.5 3.96978Z"/>\n      </svg>'],navClass:["btn slider-nav__button slider-nav__button_left","btn slider-nav__button slider-nav__button_right"],responsive:{768:{autoWidth:!1,center:!1,margin:0,nav:!0}}}),S)new v.g(S,{touchEventsTarget:"wrapper",effect:"hero-slider",containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",wrapperClass:"slider__wrapper",pagination:{el:".hero-slider-control",clickable:!0,bulletClass:"hero-slider-control__item",bulletActiveClass:"active",renderBullet:function(e,t){return'\n            <div class="'.concat(t,'">\n              <div class="hero-slider-control__title">').concat(this.slides[e].querySelector(".hero-slider__title").innerHTML,'</div>\n              <div class="hero-slider-control__loader">\n                <div class="hero-slider-control__loader-line"></div>\n              </div>\n            </div>')}}});if(document.documentElement.clientWidth>=768){if(w)new v.g(w,{slidesPerView:"auto",freeMode:!0,touchEventsTarget:"wrapper",containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",wrapperClass:"slider__wrapper",mousewheel:{forceToAxis:!0,invert:!0,releaseOnEdges:!0},scrollbar:{el:".slider__scrollbar",hide:!1,draggable:!0,dragSize:80,dragClass:"slider__track",snapOnRelease:!1},on:{setTranslate:function(e){(e=e/90+1)<0&&(e=0),e>1&&(e=1),document.querySelector(".stars__info").style.opacity=e,this.el.querySelector(".slider__explanation_tablet").style.opacity=e,this.el.querySelector(".slider__explanation_desktop").style.opacity=e},touchStart:function(){this.scrollbar.el.classList.add("active")},scrollbarDragStart:function(){this.scrollbar.el.classList.add("active")},touchEnd:function(){this.scrollbar.el.classList.remove("active")},scrollbarDragEnd:function(){this.scrollbar.el.classList.remove("active")}}});if(x)new v.g(x,{slidesPerView:"auto",freeMode:!0,touchEventsTarget:"wrapper",containerModifierClass:"slider_",slideClass:"slider__slide",slideBlankClass:"slider__slide_invisible-blank",slideActiveClass:"slider__slide_active",slideDuplicateActiveClass:"slider__slide_duplicate-active",slideVisibleClass:"slider__slide_visible",slideDuplicateClass:"slider__slide_duplicate",slideNextClass:"slider__slide_next",slideDuplicateNextClass:"slider__slide_duplicate-next",slidePrevClass:"slider__slide_prev",slideDuplicatePrevClass:"slider__slide_duplicate-prev",wrapperClass:"slider__wrapper",mousewheel:{forceToAxis:!0,invert:!0,releaseOnEdges:!0},scrollbar:{el:".slider__scrollbar",hide:!1,draggable:!0,dragSize:80,dragClass:"slider__track",snapOnRelease:!1},breakpointsInverse:!0,breakpoints:{on:{setTranslate:function(e){(e=e/90+1)<0&&(e=0),e>1&&(e=1),this.el.querySelector(".slider__explanation_tablet").style.opacity=e,this.el.querySelector(".slider__explanation_desktop").style.opacity=e},touchStart:function(){this.scrollbar.el.classList.add("active")},scrollbarDragStart:function(){this.scrollbar.el.classList.add("active")},touchEnd:function(){this.scrollbar.el.classList.remove("active")},scrollbarDragEnd:function(){this.scrollbar.el.classList.remove("active")}}}})}l()(),$(document).ready(function(){var e;$("[data-fancybox]").fancybox({closeExisting:!0}),function(){var e=document.querySelector(".header"),t=document.querySelector(".wrapper"),i=document.querySelector(".mobile-menu"),s=e.querySelector(".header__fixed-block"),l=e.querySelector(".header-control__search"),r=e.querySelector(".header-control__button_search"),a=!1,o=e.getBoundingClientRect().bottom+300;function c(){o=e.getBoundingClientRect().bottom+300,window.pageYOffset>=o&&!a?(s.classList.add("fixed"),a=!0):window.pageYOffset<o&&a&&(s.classList.remove("fixed"),a=!1)}document.documentElement.clientWidth<1240?(new n,t.style.paddingTop="".concat(e.getBoundingClientRect().height,"px"),i.style.top="".concat(e.getBoundingClientRect().height,"px"),r.addEventListener("click",function(e){e.preventDefault(),l.classList.toggle("active"),r.classList.toggle("active")})):(c(),document.addEventListener("scroll",c))}(),(e=$(".input-field__input")).on("focus",function(){$(this).parent().addClass("active")}),e.on("blur",function(){""===$(this).val()&&$(this).parent().removeClass("active")})})},8:function(e,t,i){}},[[16,1,2]]]);