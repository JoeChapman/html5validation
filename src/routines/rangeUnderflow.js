module.exports = function (input) {
  return !!input.getAttribute('min') && Number(input.value) < Number(input.getAttribute('min'))
}
