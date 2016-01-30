/* global describe, beforeEach, it, expect */

describe('valueMissing', function () {
  const valueMissing = require('../src/routines/valueMissing')

  ;['text', 'tel', 'number', 'textarea'].forEach(function (type) {
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

      it('should be valid if empty and not required', function () {
        expect(valueMissing(input)).toBe(false)
      })

      it('should be valid if not empty and not required', function () {
        input.value = '123'
        expect(valueMissing(input)).toBe(false)
      })

      it('should be valid if not empty and required', function () {
        input.setAttribute('required', '')
        input.value = '123'
        expect(valueMissing(input)).toBe(false)
      })

      it('should be invalid if empty and required', function () {
        input.setAttribute('required', '')
        expect(valueMissing(input)).toBe(true)
      })
    })
  })

  describe('input[type=checkbox]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'checkbox')
    })

    it('should be valid if not checked and not required', function () {
      expect(valueMissing(input)).toBe(false)
    })

    it('should be valid if checked and not required', function () {
      input.setAttribute('checked', '')
      expect(valueMissing(input)).toBe(false)
    })

    it('should be valid if checked and required', function () {
      input.setAttribute('required', '')
      input.setAttribute('checked', '')
      expect(valueMissing(input)).toBe(false)
    })

    it('should be invalid if not checked and required', function () {
      input.setAttribute('required', '')
      expect(valueMissing(input)).toBe(true)
    })
  })

  describe('input[type=radio]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'radio')
    })

    it('should be valid if not checked and not required', function () {
      expect(valueMissing(input)).toBe(false)
    })

    it('should be valid if checked and not required', function () {
      input.setAttribute('checked', '')
      expect(valueMissing(input)).toBe(false)
    })

    it('should be valid if checked and required', function () {
      input.setAttribute('required', '')
      input.setAttribute('checked', '')
      expect(valueMissing(input)).toBe(false)
    })

    it('should be valid if not checked and required', function () {
      input.setAttribute('required', '')
      expect(valueMissing(input)).toBe(false)
    })
  })
})
