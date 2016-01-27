module.exports = function (input) {
  if (!input.hasAttribute('maxlength')) return false

  const maxlength = Number(input.getAttribute('maxlength'))

  return input.value.length > maxlength
}
