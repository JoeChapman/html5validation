module.exports = function (input, value) {
  return !!input.getAttribute('min') && Number(value) < Number(input.getAttribute('min'))
}
