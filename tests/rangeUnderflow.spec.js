/* global describe, beforeEach, it, expect */

describe('rangeUnderflow', function () {
  const rangeUnderflow = require('../src/routines/rangeUnderflow')

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

      it('should be valid when filled with a number that is lower than min', function () {
        input.setAttribute('min', '2')
        input.value = '1'
        expect(rangeUnderflow(input)).toBe(false)
      })
    })
  })

  describe(`input[type=number]`, function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'number')
    })

    it('should be valid if value is greater than min', function () {
      input.setAttribute('min', '2')
      input.value = '5'
      expect(rangeUnderflow(input)).toBe(false)
    })

    it('should be invalid if value is lower than min', function () {
      input.setAttribute('min', '2')
      input.value = '1'
      expect(rangeUnderflow(input)).toBe(true)
    })
  })
})
