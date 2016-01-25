/* global HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement */

const customError = require('./routines/customError')
const badInput = require('./routines/badInput')
const typeMismatch = require('./routines/typeMismatch')
const rangeUnderflow = require('./routines/rangeUnderflow')
const rangeOverflow = require('./routines/rangeOverflow')
const stepMismatch = require('./routines/stepMismatch')
const tooLong = require('./routines/tooLong')
const patternMismatch = require('./routines/patternMismatch')
const valueMissing = require('./routines/valueMissing')

const constructors = [
  HTMLInputElement,
  HTMLSelectElement,
  HTMLTextAreaElement
]

const validityState = (function validityState () {
  const routines = {
    customError,
    badInput,
    typeMismatch,
    rangeUnderflow,
    rangeOverflow,
    stepMismatch,
    tooLong,
    patternMismatch,
    valueMissing
  }

  const properties = {
    checkValidity () {
      const valid = updateValidityState(this).valid

      if (!valid) {
        // Old-fashioned way to create events
        const event = document.createEvent('Event')
        event.initEvent('invalid', true, true)

        this.dispatchEvent(event)
      }

      return valid
    },

    setCustomValidity (message) {
      // validationMessage is readonly, by deleting it first
      // it can be re-defined.
      delete this.validationMessage
      this.validationMessage = message
    },

    validity: {
      get () {
        return updateValidityState(this)
      },

      configurable: true
    },

    willValidate: true
  }

  function addProperties () {
    for (let i = 0; i < constructors.length; i++) {
      for (let name in properties) {
        if (!properties.hasOwnProperty(name)) continue

        if (typeof properties[name] === 'object') {
          Object.defineProperty(constructors[i].prototype, name, properties[name])
        } else {
          constructors[i].prototype[name] = properties[name]
        }
      }
    }
  }

  function updateValidityState (input) {
    const states = { valid: true }

    for (let name in routines) {
      if (!routines.hasOwnProperty(name)) continue

      states[name] = routines[name](input, input.value)
      if (states[name]) states.valid = false
    }

    return states
  }

  addProperties()
})()

module.exports = validityState
