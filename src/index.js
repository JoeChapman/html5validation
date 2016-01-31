/* global HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLFormElement */

const routines = {
  customError: require('./routines/customError'),
  badInput: require('./routines/badInput'),
  typeMismatch: require('./routines/typeMismatch'),
  rangeUnderflow: require('./routines/rangeUnderflow'),
  rangeOverflow: require('./routines/rangeOverflow'),
  stepMismatch: require('./routines/stepMismatch'),
  tooLong: require('./routines/tooLong'),
  patternMismatch: require('./routines/patternMismatch'),
  valueMissing: require('./routines/valueMissing')
}

;[HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement]
  .forEach(function (constructor) {
    if (!('validity' in constructor.prototype)) {
      Object.defineProperty(constructor.prototype, 'validity', {
        get () {
          const validity = { valid: true }

          for (let name in routines) {
            if (!routines.hasOwnProperty(name)) continue

            validity[name] = routines[name](this)
            if (validity[name] === true) validity.valid = false
          }

          return validity
        },
        configurable: true
      })
    }

    if (!('checkValidity' in constructor.prototype)) {
      constructor.prototype.checkValidity = function () {
        const isValid = this.validity.valid

        if (!isValid) {
          // Old-fashioned way to create events
          // the new way is still not supported by IE
          const event = document.createEvent('Event')
          event.initEvent('invalid', true, true)
          this.dispatchEvent(event)
        }

        return isValid
      }
    }

    if (!('willValidate' in constructor.prototype)) {
      constructor.prototype.willValidate = true
    }

    if (!('setCustomValidity' in constructor.prototype)) {
      constructor.prototype.setCustomValidity = function (message) {
        // validationMessage is supposed to be a read-only prop
        // it won't be an issue if it's not implemented but might throw an error otherwise
        try {
          this.validationMessage = message
        } catch (e) {}
      }
    }
  })

if (!('checkValidity' in HTMLFormElement)) {
  HTMLFormElement.prototype.checkValidity = function () {
    const form = this

    function $$ (selector) {
      return [].slice.call(form.querySelectorAll(selector))
    }

    return $$('input')
      .filter((input) => ['button', 'submit', 'reset'].indexOf(input.getAttribute('type')) === -1)
      .concat($$('textarea, select'))
      .every((input) => input.validity.valid === true)
  }
}
