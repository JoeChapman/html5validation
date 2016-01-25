(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["html5validation"] = factory();
	else
		root["html5validation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* global HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement */

	var customError = __webpack_require__(1);
	var badInput = __webpack_require__(2);
	var typeMismatch = __webpack_require__(3);
	var rangeUnderflow = __webpack_require__(5);
	var rangeOverflow = __webpack_require__(6);
	var stepMismatch = __webpack_require__(7);
	var tooLong = __webpack_require__(8);
	var patternMismatch = __webpack_require__(9);
	var valueMissing = __webpack_require__(4);

	var constructors = [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement];

	var validityState = function validityState() {
	  var routines = {
	    customError: customError,
	    badInput: badInput,
	    typeMismatch: typeMismatch,
	    rangeUnderflow: rangeUnderflow,
	    rangeOverflow: rangeOverflow,
	    stepMismatch: stepMismatch,
	    tooLong: tooLong,
	    patternMismatch: patternMismatch,
	    valueMissing: valueMissing
	  };

	  var properties = {
	    checkValidity: function checkValidity() {
	      var valid = updateValidityState(this).valid;

	      if (!valid) {
	        // Old-fashioned way to create events
	        var event = document.createEvent('Event');
	        event.initEvent('invalid', true, true);

	        this.dispatchEvent(event);
	      }

	      return valid;
	    },
	    setCustomValidity: function setCustomValidity(message) {
	      // validationMessage is readonly, by deleting it first
	      // it can be re-defined.
	      delete this.validationMessage;
	      this.validationMessage = message;
	    },

	    validity: {
	      get: function get() {
	        return updateValidityState(this);
	      },

	      configurable: true
	    },

	    willValidate: true
	  };

	  function addProperties() {
	    for (var i = 0; i < constructors.length; i++) {
	      for (var name in properties) {
	        if (!properties.hasOwnProperty(name)) continue;

	        if (_typeof(properties[name]) === 'object') {
	          Object.defineProperty(constructors[i].prototype, name, properties[name]);
	        } else {
	          constructors[i].prototype[name] = properties[name];
	        }
	      }
	    }
	  }

	  function updateValidityState(input) {
	    var states = { valid: true };

	    for (var name in routines) {
	      if (!routines.hasOwnProperty(name)) continue;

	      states[name] = routines[name](input, input.value);
	      if (states[name]) states.valid = false;
	    }

	    return states;
	  }

	  addProperties();
	}();

	module.exports = validityState;

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

	module.exports = function (input, value) {
	  if (valueMissing(input, value) === true) return true;

	  var type = input.getAttribute('type');

	  if (type === 'number') return !numberRegExp.test(Number(value));else if (type === 'url') return !urlRegExp.test(value);else if (type === 'email') return !emailRegExp.test(value);

	  return false;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input, value) {
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
	      retVal = value === '';
	      break;
	  }
	  return retVal;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input, value) {
	  return !!input.getAttribute('min') && Number(value) < Number(input.getAttribute('min'));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input, value) {
	  return !!input.getAttribute('max') && Number(value) > Number(input.getAttribute('max'));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input, value) {
	  return !!input.getAttribute('step') && value % Number(input.getAttribute('step')) !== 0;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input, value) {
	  return !!input.getAttribute('maxlength') && value.length > Number(input.getAttribute('maxlength'));
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (input, value) {
	  return input.getAttribute('pattern') && new RegExp(input.getAttribute('pattern')).test(value) === false;
	};

/***/ }
/******/ ])
});
;