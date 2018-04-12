module.exports = function (input) {
  if (!input.hasAttribute('min')) return false
  if (input.getAttribute('type') !== 'number') return false

  const value = Number(input.value)
  const min = Number(input.getAttribute('min'))

  return value < min
}
