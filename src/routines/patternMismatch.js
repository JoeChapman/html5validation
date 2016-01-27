module.exports = function (input) {
  if (!input.hasAttribute('pattern')) return false

  const pattern = input.getAttribute('pattern')
  const regexp = new RegExp(pattern)

  return regexp.test(input.value) === false
}
