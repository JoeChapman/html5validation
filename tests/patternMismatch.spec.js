/* global describe, beforeEach, it, expect */

describe('patternMismatch', function () {
  const patternMismatch = require('../src/routines/patternMismatch')

  ;['text', 'tel', 'email', 'textarea'].forEach(function (type) {
    describe(`input[type=${type}]`, function () {
      let input

      beforeEach(function () {
        if (type !== 'textarea') {
          input = document.createElement('input')
          input.setAttribute('type', type)
        } else {
          input = document.createElement(type)
        }
      })

      it('should be valid if value matches pattern', function () {
        input.setAttribute('pattern', '[a-z]{1,3}%')
        input.value = 'abc%'

        expect(patternMismatch(input)).toBe(false)
      })

      it('should be invalid if value doesn\'t match pattern', function () {
        input.setAttribute('pattern', '[a-z]{1,3}%')
        input.value = '123456'

        expect(patternMismatch(input)).toBe(true)
      })
    })
  })
})
