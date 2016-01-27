/* global describe, beforeEach, it, expect */

require('../src/index')

function isValid (validity) {
  for (let key in validity) {
    const value = validity[key]

    if (key === 'valid' && value === false) return false
    if (key !== 'valid' && value === true) return false
  }

  return true
}

describe('HTML5 validation', function () {
  describe('input[type=text]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'text')
    })

    it('should be valid if empty and not required', function () {
      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and not required', function () {
      input.value = 'foo'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and required', function () {
      input.setAttribute('required', '')
      input.value = 'foo'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if empty and required', function () {
      input.setAttribute('required', '')

      expect(input.validity.valueMissing).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if disabled', function () {
      input.setAttribute('required', '')
      input.setAttribute('disabled', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if value matches [pattern]', function () {
      input.setAttribute('pattern', '[a-z]{1,3}%')
      input.value = 'abc%'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if value doesn\'t match [pattern]', function () {
      input.setAttribute('pattern', '[a-z]{1,3}%')
      input.value = '123456'

      expect(input.validity.patternMismatch).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if value length is lower than maxlength', function () {
      input.setAttribute('maxlength', '2')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if value length is greater than maxlength', function () {
      input.setAttribute('maxlength', '2')
      input.value = 'abc'

      expect(input.validity.tooLong).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid when filled with a number that is greater than max', function () {
      input.setAttribute('max', '2')
      input.value = '10'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid when filled with a number that is lower than minlength', function () {
      input.setAttribute('min', '2')
      input.value = '0'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })
  })

  describe('input[type=checkbox]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'checkbox')
    })

    it('should be valid if not checked and not required', function () {
      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if checked and not required', function () {
      input.setAttribute('checked', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if checked and required', function () {
      input.setAttribute('required', '')
      input.setAttribute('checked', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if not checked and required', function () {
      input.setAttribute('required', '')

      expect(input.validity.valueMissing).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })
  })

  describe('input[type=radio]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'radio')
    })

    it('should be valid if not checked and not required', function () {
      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if checked and not required', function () {
      input.setAttribute('checked', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if checked and required', function () {
      input.setAttribute('required', '')
      input.setAttribute('checked', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not checked and required', function () {
      input.setAttribute('required', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })
  })

  describe('input[type=tel]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'tel')
    })

    it('should be valid if filled with a number', function () {
      input.value = '123'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if filled with a string', function () {
      input.value = 'abc'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if empty and not required', function () {
      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and not required', function () {
      input.value = 'foo'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and required', function () {
      input.setAttribute('required', '')
      input.value = 'foo'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if empty and required', function () {
      input.setAttribute('required', '')

      expect(input.validity.valueMissing).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if disabled', function () {
      input.setAttribute('required', '')
      input.setAttribute('disabled', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if value matches [pattern]', function () {
      input.setAttribute('pattern', '[a-z]{1,3}%')
      input.value = 'abc%'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if value doesn\'t match [pattern]', function () {
      input.setAttribute('pattern', '[a-z]{1,3}%')
      input.value = '123456'

      expect(input.validity.patternMismatch).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if value length is lower than maxlength', function () {
      input.setAttribute('maxlength', '2')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if value length is greater than maxlength', function () {
      input.setAttribute('maxlength', '2')
      input.value = 'abc'

      expect(input.validity.tooLong).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid when filled with a number that is greater than max', function () {
      input.setAttribute('max', '2')
      input.value = '10'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid when filled with a number that is lower than minlength', function () {
      input.setAttribute('min', '2')
      input.value = '0'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })
  })

  describe('input[type=number]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'number')
    })

    it('should be valid if filled with a positive number', function () {
      input.value = '123'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if filled with a negative number', function () {
      input.value = '-123'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if filled with a decimal number', function () {
      input.value = '1.23'

      expect(input.validity.stepMismatch).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if empty and not required', function () {
      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and not required', function () {
      input.value = '123'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and required', function () {
      input.setAttribute('required', '')
      input.value = '123'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if empty and required', function () {
      input.setAttribute('required', '')

      expect(input.validity.valueMissing).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if value is greater than min', function () {
      input.setAttribute('min', '10')
      input.value = '15'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if value is lower than min', function () {
      input.setAttribute('min', '10')
      input.value = '5'

      expect(input.validity.rangeUnderflow).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if value is lower than max', function () {
      input.setAttribute('max', '10')
      input.value = '5'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if value is greater than max', function () {
      input.setAttribute('max', '10')
      input.value = '15'

      expect(input.validity.rangeOverflow).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })
  })

  describe('input[type=range]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'number')
    })

    it('should be valid if filled with a number', function () {
      input.value = '123'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if filled with a string', function () {
      input.value = 'abc'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })
  })

  describe('input[type=email]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'email')
    })

    it('should be valid if filled with a correct email address', function () {
      input.value = 'email@domain.com'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if filled with an incorrect email address', function () {
      input.value = 'foo'

      expect(input.validity.typeMismatch).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })
  })

  describe('input[type=url]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'url')
    })

    it('should be valid if filled with a correct url', function () {
      input.value = 'https://site.com'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if filled with an incorrect url', function () {
      input.value = 'foo'

      expect(input.validity.typeMismatch).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })
  })

  describe('select', function () {
    it('should be valid if not empty')
  })

  describe('textarea', function () {
    let input

    beforeEach(function () {
      input = document.createElement('textarea')
    })

    it('should be valid if empty and not required', function () {
      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and not required', function () {
      input.value = 'foo'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if not empty and required', function () {
      input.setAttribute('required', '')
      input.value = 'foo123'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if empty and required', function () {
      input.setAttribute('required', '')

      expect(input.validity.valueMissing).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid if disabled', function () {
      input.setAttribute('required', '')
      input.setAttribute('disabled', '')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if value matches [pattern]', function () {
      input.setAttribute('pattern', '[a-z]{1,3}%')
      input.value = 'abc%'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if value doesn\'t match [pattern]', function () {
      input.setAttribute('pattern', '[a-z]{1,3}%')
      input.value = '123456'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid if value length is lower than maxlength', function () {
      input.setAttribute('maxlength', '2')

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be invalid if value length is greater than maxlength', function () {
      input.setAttribute('maxlength', '2')
      input.value = 'abc'

      expect(input.validity.tooLong).toBe(true)
      expect(input.validity.valid).toBe(false)
      expect(input.checkValidity()).toBe(false)
    })

    it('should be valid when filled with a number that is greater than max', function () {
      input.setAttribute('max', '2')
      input.value = '10'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })

    it('should be valid when filled with a number that is lower than minlength', function () {
      input.setAttribute('min', '2')
      input.value = '0'

      expect(isValid(input.validity)).toBe(true)
      expect(input.checkValidity()).toBe(true)
    })
  })

  describe('checkValidity', function () {
    it('should emit an event when called')
  })

  describe('setCustomValidity', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
    })

    it('should set input.validationMessage property', function () {
      const customMessage = 'This is a custom validation message'

      expect(input.validationMessage).not.toBe(customMessage)
      input.setCustomValidity(customMessage)
      expect(input.validationMessage).toBe(customMessage)
    })
  })
})
