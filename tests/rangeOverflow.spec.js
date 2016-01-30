/* global describe, beforeEach, it, expect */

describe('rangeOverflow', function () {
  const rangeOverflow = require('../src/routines/rangeOverflow')

  ;['text', 'tel', 'textarea'].forEach(function (type) {
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

      it('should be valid when filled with a number that is greater than max', function () {
        input.setAttribute('max', '2')
        input.value = '10'
        expect(rangeOverflow(input)).toBe(false)
      })
    })
  })

  describe(`input[type=number]`, function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'number')
    })

    it('should be valid if value is lower than max', function () {
      input.setAttribute('max', '10')
      input.value = '5'
      expect(rangeOverflow(input)).toBe(false)
    })

    it('should be invalid if value is greater than max', function () {
      input.setAttribute('max', '10')
      input.value = '15'
      expect(rangeOverflow(input)).toBe(true)
    })
  })
})
