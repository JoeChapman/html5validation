module.exports = function (input) {
  if (!input.hasAttribute('min')) return false

  const value = Number(input.value)
  const min = Number(input.getAttribute('min'))

  return value < min
}
