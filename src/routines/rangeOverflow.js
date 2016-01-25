module.exports = function (input, value) {
  return !!input.getAttribute('max') && Number(value) > Number(input.getAttribute('max'))
}
