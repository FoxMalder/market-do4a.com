(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{186:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_page_catalog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);\n/* harmony import */ var _js_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);\n\n\n // import ProductCard from '../components/ProductCard';\n\n\n\nif (false) {}\n\n$(function () {\n  var control = new _js_page_catalog__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"]({\n    sorting: document.querySelector('.sorting'),\n    quantity: document.querySelector('[data-total-find]'),\n    form: document.getElementById('catalog-filter')\n  }, {\n    ajax: false\n  });\n  console.log(control);\n  window.addEventListener('favorites', function (event) {\n    control.setNumber(event.detail.length);\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmF2b3JpdGVzLmpzPzUxZmUiXSwibmFtZXMiOlsicHJvY2VzcyIsIiQiLCJjb250cm9sIiwiQ2F0YWxvZ0NvbnRyb2wiLCJzb3J0aW5nIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicXVhbnRpdHkiLCJmb3JtIiwiZ2V0RWxlbWVudEJ5SWQiLCJhamF4IiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInNldE51bWJlciIsImRldGFpbCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtDQUdBOztBQUNBOztBQUVBLElBQUlBLEtBQUosRUFBMkMsRUFFMUM7O0FBR0RDLENBQUMsQ0FBQyxZQUFNO0FBQ04sTUFBTUMsT0FBTyxHQUFHLElBQUlDLGdFQUFKLENBQW1CO0FBQ2pDQyxXQUFPLEVBQUVDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUR3QjtBQUVqQ0MsWUFBUSxFQUFFRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsbUJBQXZCLENBRnVCO0FBR2pDRSxRQUFJLEVBQUVILFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QixnQkFBeEI7QUFIMkIsR0FBbkIsRUFJYjtBQUNEQyxRQUFJLEVBQUU7QUFETCxHQUphLENBQWhCO0FBUUFDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZVixPQUFaO0FBRUFXLFFBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUMsVUFBQ0MsS0FBRCxFQUFXO0FBQzlDYixXQUFPLENBQUNjLFNBQVIsQ0FBa0JELEtBQUssQ0FBQ0UsTUFBTixDQUFhQyxNQUEvQjtBQUNELEdBRkQ7QUFHRCxDQWRBLENBQUQiLCJmaWxlIjoiMTg2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2pzL2NvbW1vbic7XG5pbXBvcnQgJy4vc2Nzcy9tYWluLnNjc3MnO1xuXG5pbXBvcnQgQ2F0YWxvZ0NvbnRyb2wgZnJvbSAnLi9qcy9wYWdlL2NhdGFsb2cnO1xuLy8gaW1wb3J0IFByb2R1Y3RDYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvUHJvZHVjdENhcmQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vanMvdXRpbHMvdXRpbHMnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICByZXF1aXJlKCcuL2Zhdm9yaXRlcy5wdWcnKTtcbn1cblxuXG4kKCgpID0+IHtcbiAgY29uc3QgY29udHJvbCA9IG5ldyBDYXRhbG9nQ29udHJvbCh7XG4gICAgc29ydGluZzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvcnRpbmcnKSxcbiAgICBxdWFudGl0eTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdG90YWwtZmluZF0nKSxcbiAgICBmb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2F0YWxvZy1maWx0ZXInKSxcbiAgfSwge1xuICAgIGFqYXg6IGZhbHNlLFxuICB9KTtcblxuICBjb25zb2xlLmxvZyhjb250cm9sKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZmF2b3JpdGVzJywgKGV2ZW50KSA9PiB7XG4gICAgY29udHJvbC5zZXROdW1iZXIoZXZlbnQuZGV0YWlsLmxlbmd0aCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///186\n")},9:function(module,exports){eval("module.exports = jQuery;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIj9jZDBjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///9\n")}},[[186,1,0]]]);