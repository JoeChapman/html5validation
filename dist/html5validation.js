/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* global HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement */

	var routines = {
	  customError: __webpack_require__(1),
	  badInput: __webpack_require__(2),
	  typeMismatch: __webpack_require__(3),
	  rangeUnderflow: __webpack_require__(5),
	  rangeOverflow: __webpack_require__(6),
	  stepMismatch: __webpack_require__(7),
	  tooLong: __webpack_require__(8),
	  patternMismatch: __webpack_require__(9),
	  valueMissing: __webpack_require__(4)
	};[HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement].forEach(function (constructor) {
	  Object.defineProperty(constructor.prototype, 'validity', {
	    get: function get() {
	      var validity = { valid: true };

	      for (var name in routines) {
	        if (!routines.hasOwnProperty(name)) continue;

	        validity[name] = routines[name](this);
	        if (validity[name] === true) validity.valid = false;
	      }

	      return validity;
	    },

	    configurable: true
	  });

	  constructor.prototype.checkValidity = function () {
	    var isValid = this.validity.valid;

	    if (!isValid) {
	      // Old-fashioned way to create events
	      // the new way is still not supported by IE
	      var event = document.createEvent('Event');
	      event.initEvent('invalid', true, true);
	      this.dispatchEvent(event);
	    }

	    return isValid;
	  };

	  constructor.prototype.setCustomValidity = function (message) {
	    // validationMessage is readonly
	    // by deleting it first it can be re-defined.
	    delete this.validationMessage;
	    this.validationMessage = message;
	  };

	  constructor.prototype.willValidate = true;
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
	  return false;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
	  return false;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var valueMissing = __webpack_require__(4);

	// http://stackoverflow.com/questions/13289810/javascript-limit-text-field-to-positive-and-negative-numbers
	var numberRegExp = /^-?\d+$/;

	// http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-(type=email)
	var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	// http://regexlib.com/REDetails.aspx?regexp_id=1854
	var urlRegExp = /(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/;

	module.exports = function (input) {
	  if (valueMissing(input) === true) return true;

	  var value = input.value;
	  var type = input.getAttribute('type');

	  if (type === 'number') return !numberRegExp.test(Number(value));else if (type === 'url') return !urlRegExp.test(value);else if (type === 'email') return !emailRegExp.test(value);

	  return false;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input) {
	  var retVal = false;
	  switch (input.getAttribute('type') || input.nodeName.toLowerCase()) {
	    case 'checkbox':
	      retVal = !input.checked;
	      break;
	    case 'radio':
	    case 'range':
	      break;
	    case 'select':
	      retVal = !input[input.selectedIndex + 1].getAttribute('value');
	      break;
	    default:
	      retVal = input.value === '';
	      break;
	  }
	  return retVal;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input) {
	  return !!input.getAttribute('min') && Number(input.value) < Number(input.getAttribute('min'));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input) {
	  return !!input.getAttribute('max') && Number(input.value) > Number(input.getAttribute('max'));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input) {
	  return !!input.getAttribute('step') && input.value % Number(input.getAttribute('step')) !== 0;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input) {
	  return !!input.getAttribute('maxlength') && input.value.length > Number(input.getAttribute('maxlength'));
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input) {
	  return input.getAttribute('pattern') && new RegExp(input.getAttribute('pattern')).test(input.value) === false;
	};

/***/ }
/******/ ]);