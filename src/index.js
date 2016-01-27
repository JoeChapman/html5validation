/* global HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement */

const isSupported = (function () {
  const input = document.createElement('input')

  return (
    input.willValidate === true &&
    typeof input.checkValidity === 'function' &&
    typeof input.validity === 'object'
  )
})()

if (isSupported === false) {
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
      Object.defineProperty(constructor.prototype, 'validity', {
        get () {
          const validity = { valid: true }
          console.log('hey there')
          for (let name in routines) {
            if (!routines.hasOwnProperty(name)) continue

            validity[name] = routines[name](this)
            if (validity[name] === true) validity.valid = false
          }

          return validity
        },
        configurable: true
      })

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

      constructor.prototype.willValidate = true
    })
}
