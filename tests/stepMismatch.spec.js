/* global describe, beforeEach, it, expect */

describe('stepMismatch', function () {
  const stepMismatch = require('../src/routines/stepMismatch')

  ;['text', 'tel', 'email', 'url', 'textarea'].forEach(function (type) {
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

      it('should be valid if value is a multiple of step', function () {
        input.setAttribute('step', '2')
        input.value = '8'
        expect(stepMismatch(input)).toBe(false)
      })

      it('should be valid if value is not a multiple of step', function () {
        input.setAttribute('step', '2')
        input.value = '5'
        expect(stepMismatch(input)).toBe(false)
      })
    })
  })

  // <range>'s value seems to jump to the right step
  // so setting value to 5 ends up to 6 with step = 2
  ;['number'].forEach(function (type) {
    describe(`input[type=${type}]`, function () {
      let input

      beforeEach(function () {
        input = document.createElement('input')
        input.setAttribute('type', type)
      })

      it('should be valid if value is a multiple of step', function () {
        input.setAttribute('step', '2')
        input.value = '8'
        expect(stepMismatch(input)).toBe(false)
      })

      it('should be invalid if value is not a multiple of step', function () {
        input.setAttribute('step', '2')
        input.value = '5'
        expect(stepMismatch(input)).toBe(true)
      })
    })
  })
})
