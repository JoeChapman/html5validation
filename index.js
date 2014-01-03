'use strict';

// http://stackoverflow.com/questions/13289810/javascript-limit-text-field-to-positive-and-negative-numbers
var numberRegExp = /^-?\d+$/;

// http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-(type=email)
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// http://regexlib.com/REDetails.aspx?regexp_id=1854
var urlRegExp = /(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/;

module.exports = (function () {

    var constructors = [
        HTMLInputElement,
        HTMLSelectElement,
        HTMLTextAreaElement
    ];

    var validityRoutines = {

        customError: function () {
            return false;
        },

        badInput: function () {
            return false;
        },

        typeMismatch: function (input, value) {
            var mismatch = false;
            if (validityRoutines.valueMissing(input, value) === true) {
                return mismatch;
            }
            switch (input.getAttribute('type')) {
            case 'number':
                mismatch = !numberRegExp.test(Number(value));
                break;
            case 'url':
                mismatch = !urlRegExp.test(value);
                break;
            case 'email':
                mismatch = !emailRegExp.test(value);
                break;
            }
            return mismatch;
        },

        rangeUnderflow: function (input, value) {
            return !!input.getAttribute('min') && Number(value) < Number(input.getAttribute('min'));
        },

        rangeOverflow: function (input, value) {
            return !!input.getAttribute('max') && Number(value) > Number(input.getAttribute('max'));
        },

        stepMismatch: function (input, value) {
            return !!input.getAttribute('step') && (value % Number(input.getAttribute('step')) !== 0);
        },

        tooLong: function (input, value) {
            return !!input.getAttribute('maxlength') && value.length > Number(input.getAttribute('maxlength'));
        },

        patternMismatch: function (input, value) {
            return input.getAttribute('pattern') && new RegExp(input.getAttribute('pattern')).test(value) === false;
        },

        valueMissing: function (input, value) {
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
                retVal = (value === '');
                break;
            }
            return retVal;
        }

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
            get: function getValidityState() {
                return updateValidityState(this);
            },
            configurable: true,
        },
        willValidate: true
    };

    function addProperties() {
        var i = -1,
            len = constructors.length,
            name;

        while (len > ++i) {
            for (name in properties) {
                if (properties.hasOwnProperty(name)) {
                    defineProperties();
                }
            }
        }

        function defineProperties() {
            if (typeof properties[name] === 'object') {
                Object.defineProperty(constructors[i].prototype, name, properties[name]);
            } else {
                constructors[i].prototype[name] = properties[name];
            }
        }

    }

    function updateValidityState(input) {
        var states = { valid: true },
            name;
        for (name in validityRoutines) {
            if (validityRoutines.hasOwnProperty(name)) {
                states[name] = validityRoutines[name](input, input.value);
                if (states[name]) {
                    states.valid = false;
                }

            }
        }
        return states;
    }

    addProperties();

}());

