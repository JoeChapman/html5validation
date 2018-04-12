module.exports = function (input) {
  if (!input.hasAttribute('max')) return false
  if (input.getAttribute('type') !== 'number') return false

  const value = Number(input.value)
  const max = Number(input.getAttribute('max'))

  return value > max
}
