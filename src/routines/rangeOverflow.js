module.exports = function (input) {
  return !!input.getAttribute('max') && Number(input.value) > Number(input.getAttribute('max'))
}
