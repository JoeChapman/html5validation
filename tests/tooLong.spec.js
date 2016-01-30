/* global describe, beforeEach, it, expect */

describe('tooLong', function () {
  const tooLong = require('../src/routines/tooLong')

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

      it('should be valid if value length is lower than maxlength', function () {
        input.setAttribute('maxlength', '2')
        expect(tooLong(input)).toBe(false)
      })

      it('should be invalid if value length is greater than maxlength', function () {
        input.setAttribute('maxlength', '2')
        input.value = 'abc'
        expect(tooLong(input)).toBe(true)
      })
    })
  })

  describe('input[type=number]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'number')
    })

    it('should be valid if value length is greater than maxlength', function () {
      input.value = '123456'
      input.setAttribute('maxlength', '2')
      expect(tooLong(input)).toBe(false)
    })
  })
})
