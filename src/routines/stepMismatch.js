module.exports = function (input) {
  if (!input.hasAttribute('step')) return false

  const value = Number(input.value)
  const step = Number(input.getAttribute('step'))

  return value % step !== 0
}
