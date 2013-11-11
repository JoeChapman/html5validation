'use strict';

// http://stackoverflow.com/questions/13289810/javascript-limit-text-field-to-positive-and-negative-numbers
var numberRegExp = /^-?\d+$/;

// http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-(type=email)
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// http://regexlib.com/REDetails.aspx?regexp_id=1854
var urlRegExp = /(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/;

(function () {

    if (document.createElement('input').validity) {
        return;
    }

    var validityRoutines = {

        customError: function () {
            return false;
        },

        badInput: function () {
            return false;
        },

        typeMismatch: function ($input, value) {
            var mismatch = false;

            if (validityRoutines.valueMissing($input, value) === true) {
                return mismatch;
            }
            switch ($input.attr('type')) {
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

        rangeUnderflow: function ($input, value) {
            return Number(value) < Number($input.attr('min'));
        },

        rangeOverflow: function ($input, value) {
            return Number(value) > Number($input.attr('max'));
        },

        stepMismatch: function ($input, value) {
            return !!$input.attr('step') && (value % Number($input.attr('step')) !== 0);
        },

        tooLong: function ($input, value) {
            return value.length > Number($input.attr('maxlength'));
        },

        patternMismatch: function ($input, value) {
            var pattern = new RegExp($input.attr('pattern'));
            return pattern.test(value) === false;
        },

        valueMissing: function ($input, value) {
            var retVal = false;

            switch ($input.attr('type')) {
            case 'checkbox':
                retVal = !$input[0].checked;
                break;
            case 'radio':
            case 'range':
                break;
            default:
                retVal = (value === '');
                break;
            }

            return retVal;
        }

    };

    HTMLInputElement.prototype.checkValidity = function () {
        return updateValidityState(this).valid;
    };

    HTMLSelectElement.prototype.checkValidity = function () {
        return updateValidityState(this).valid;
    };

    HTMLTextAreaElement.prototype.checkValidity = function () {
        return updateValidityState(this).valid;
    };

    Object.defineProperty(HTMLInputElement.prototype, 'validity', {
        get: function () {
            return updateValidityState(this);
        },
        configurable: true,
    });

    Object.defineProperty(HTMLSelectElement.prototype, 'validity', {
        get: function () {
            return updateValidityState(this);
        },
        configurable: true,
    });

    Object.defineProperty(HTMLTextAreaElement.prototype, 'validity', {
        get: function () {
            return updateValidityState(this);
        },
        configurable: true,
    });

    function updateValidityState(input) {
        var states = { valid: true },
            $input = $(input),
            name;

        for (name in validityRoutines) {
            if (validityRoutines.hasOwnProperty(name)) {
                states[name] = validityRoutines[name]($input, $input.val());
                if (states[name]) {
                    states.valid = false;
                }

            }
        }

        return states;
    }

}());