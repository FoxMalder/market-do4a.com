/*!
 * Front for marketdo4a.com 1.6.0 
 * By Roman Meshcheryakov, Riverstart, 2020
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{280:function(t,e,i){function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}
/**
 * Sticky.js
 * Library for sticky elements written in vanilla javascript. With this library you can easily set sticky elements on your website. It's also responsive.
 *
 * @version 1.2.2
 * @author Rafal Galus <biuro@rafalgalus.pl>
 * @website https://rgalus.github.io/sticky-js/
 * @repo https://github.com/rgalus/sticky-js
 * @license https://github.com/rgalus/sticky-js/blob/master/LICENSE
 */
var c;c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,t),this.selector=e,this.elements=[],this.version="1.2.2",this.vp=this.getViewportSize(),this.body=document.querySelector("body"),this.options={wrap:i.wrap||!1,marginTop:i.marginTop||0,stickyFor:i.stickyFor||0,stickyClass:i.stickyClass||null,stickyContainer:i.stickyContainer||"body"},this.updateScrollTopPosition=this.updateScrollTopPosition.bind(this),this.updateScrollTopPosition(),window.addEventListener("load",this.updateScrollTopPosition),window.addEventListener("scroll",this.updateScrollTopPosition),this.run()}var e,i,c;return e=t,(i=[{key:"run",value:function(){var t=this,e=setInterval((function(){if("complete"===document.readyState){clearInterval(e);var i=document.querySelectorAll(t.selector);t.forEach(i,(function(e){return t.renderElement(e)}))}}),10)}},{key:"renderElement",value:function(t){var e=this;t.sticky={},t.sticky.active=!1,t.sticky.marginTop=parseInt(t.getAttribute("data-margin-top"))||this.options.marginTop,t.sticky.stickyFor=parseInt(t.getAttribute("data-sticky-for"))||this.options.stickyFor,t.sticky.stickyClass=t.getAttribute("data-sticky-class")||this.options.stickyClass,t.sticky.wrap=!!t.hasAttribute("data-sticky-wrap")||this.options.wrap,t.sticky.stickyContainer=this.options.stickyContainer,t.sticky.container=this.getStickyContainer(t),t.sticky.container.rect=this.getRectangle(t.sticky.container),t.sticky.rect=this.getRectangle(t),"img"===t.tagName.toLowerCase()&&(t.onload=function(){return t.sticky.rect=e.getRectangle(t)}),t.sticky.wrap&&this.wrapElement(t),this.activate(t)}},{key:"wrapElement",value:function(t){t.insertAdjacentHTML("beforebegin","<span></span>"),t.previousSibling.appendChild(t)}},{key:"activate",value:function(t){t.sticky.rect.top+t.sticky.rect.height<t.sticky.container.rect.top+t.sticky.container.rect.height&&t.sticky.stickyFor<this.vp.width&&!t.sticky.active&&(t.sticky.active=!0),this.elements.indexOf(t)<0&&this.elements.push(t),t.sticky.resizeEvent||(this.initResizeEvents(t),t.sticky.resizeEvent=!0),t.sticky.scrollEvent||(this.initScrollEvents(t),t.sticky.scrollEvent=!0),this.setPosition(t)}},{key:"initResizeEvents",value:function(t){var e=this;t.sticky.resizeListener=function(){return e.onResizeEvents(t)},window.addEventListener("resize",t.sticky.resizeListener)}},{key:"destroyResizeEvents",value:function(t){window.removeEventListener("resize",t.sticky.resizeListener)}},{key:"onResizeEvents",value:function(t){this.vp=this.getViewportSize(),t.sticky.rect=this.getRectangle(t),t.sticky.container.rect=this.getRectangle(t.sticky.container),t.sticky.rect.top+t.sticky.rect.height<t.sticky.container.rect.top+t.sticky.container.rect.height&&t.sticky.stickyFor<this.vp.width&&!t.sticky.active?t.sticky.active=!0:(t.sticky.rect.top+t.sticky.rect.height>=t.sticky.container.rect.top+t.sticky.container.rect.height||t.sticky.stickyFor>=this.vp.width&&t.sticky.active)&&(t.sticky.active=!1),this.setPosition(t)}},{key:"initScrollEvents",value:function(t){var e=this;t.sticky.scrollListener=function(){return e.onScrollEvents(t)},window.addEventListener("scroll",t.sticky.scrollListener)}},{key:"destroyScrollEvents",value:function(t){window.removeEventListener("scroll",t.sticky.scrollListener)}},{key:"onScrollEvents",value:function(t){t.sticky.active&&this.setPosition(t)}},{key:"setPosition",value:function(t){this.css(t,{position:"",width:"",top:"",left:""}),this.vp.height<t.sticky.rect.height||!t.sticky.active||(t.sticky.rect.width||(t.sticky.rect=this.getRectangle(t)),t.sticky.wrap&&this.css(t.parentNode,{display:"block",width:t.sticky.rect.width+"px",height:t.sticky.rect.height+"px"}),0===t.sticky.rect.top&&t.sticky.container===this.body?this.css(t,{position:"fixed",top:t.sticky.rect.top+"px",left:t.sticky.rect.left+"px",width:t.sticky.rect.width+"px"}):this.scrollTop>t.sticky.rect.top-t.sticky.marginTop?(this.css(t,{position:"fixed",width:t.sticky.rect.width+"px",left:t.sticky.rect.left+"px"}),this.scrollTop+t.sticky.rect.height+t.sticky.marginTop>t.sticky.container.rect.top+t.sticky.container.offsetHeight?(t.sticky.stickyClass&&t.classList.remove(t.sticky.stickyClass),this.css(t,{top:t.sticky.container.rect.top+t.sticky.container.offsetHeight-(this.scrollTop+t.sticky.rect.height)+"px"})):(t.sticky.stickyClass&&t.classList.add(t.sticky.stickyClass),this.css(t,{top:t.sticky.marginTop+"px"}))):(t.sticky.stickyClass&&t.classList.remove(t.sticky.stickyClass),this.css(t,{position:"",width:"",top:"",left:""}),t.sticky.wrap&&this.css(t.parentNode,{display:"",width:"",height:""})))}},{key:"update",value:function(){var t=this;this.forEach(this.elements,(function(e){e.sticky.rect=t.getRectangle(e),e.sticky.container.rect=t.getRectangle(e.sticky.container),t.activate(e),t.setPosition(e)}))}},{key:"destroy",value:function(){var t=this;window.removeEventListener("load",this.updateScrollTopPosition),window.removeEventListener("scroll",this.updateScrollTopPosition),this.forEach(this.elements,(function(e){t.destroyResizeEvents(e),t.destroyScrollEvents(e),delete e.sticky}))}},{key:"getStickyContainer",value:function(t){for(var e=t.parentNode;!e.hasAttribute("data-sticky-container")&&!e.parentNode.querySelector(t.sticky.stickyContainer)&&e!==this.body;)e=e.parentNode;return e}},{key:"getRectangle",value:function(t){this.css(t,{position:"",width:"",top:"",left:""});var e=Math.max(t.offsetWidth,t.clientWidth,t.scrollWidth),i=Math.max(t.offsetHeight,t.clientHeight,t.scrollHeight),s=0,n=0;do{s+=t.offsetTop||0,n+=t.offsetLeft||0,t=t.offsetParent}while(t);return{top:s,left:n,width:e,height:i}}},{key:"getViewportSize",value:function(){return{width:Math.max(document.documentElement.clientWidth,window.innerWidth||0),height:Math.max(document.documentElement.clientHeight,window.innerHeight||0)}}},{key:"updateScrollTopPosition",value:function(){this.scrollTop=(window.pageYOffset||document.scrollTop)-(document.clientTop||0)||0}},{key:"forEach",value:function(t,e){for(var i=0,s=t.length;i<s;i++)e(t[i])}},{key:"css",value:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t.style[i]=e[i])}}])&&n(e.prototype,i),c&&n(e,c),t}(),t.exports=c},282:function(t,e,i){var s=i(280);t.exports=s}}]);