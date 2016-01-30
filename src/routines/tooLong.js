module.exports = function (input) {
  if (!input.hasAttribute('maxlength')) return false
  if (input.getAttribute('type') === 'number') return false

  const maxlength = Number(input.getAttribute('maxlength'))

  return input.value.length > maxlength
}
