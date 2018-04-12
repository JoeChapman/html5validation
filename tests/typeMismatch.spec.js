/* global describe, beforeEach, it, expect */

describe('typeMismatch', function () {
  const typeMismatch = require('../src/routines/typeMismatch')

  describe('input[type=tel]', function () {
    let input

    beforeEach(function () {
      input = document.createElement('input')
      input.setAttribute('type', 'tel')
    })

    it('should be valid if filled with a number', function () {
      input.value = '123'
      expect(typeMismatch(input)).toBe(false)
    })

    it('should be valid if filled with a string', function () {
      input.value = 'abc'
      expect(typeMismatch(input)).toBe(false)
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
      expect(typeMismatch(input)).toBe(false)
    })

    it('should be valid if filled with a negative number', function () {
      input.value = '-123'
      expect(typeMismatch(input)).toBe(false)
    })

    it('should be invalid if filled with a decimal number', function () {
      input.value = '1.23'
      expect(typeMismatch(input)).toBe(true)
    })

    it('should be invalid if filled with a string', function () {
      input.value = 'abc'
      expect(typeMismatch(input)).toBe(true)
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
      expect(typeMismatch(input)).toBe(false)
    })

    it('should be invalid if filled with an incorrect email address', function () {
      input.value = 'foo'
      expect(typeMismatch(input)).toBe(true)
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
      expect(typeMismatch(input)).toBe(false)
    })

    it('should be invalid if filled with an incorrect url', function () {
      input.value = 'foo'
      expect(typeMismatch(input)).toBe(true)
    })
  })
})
