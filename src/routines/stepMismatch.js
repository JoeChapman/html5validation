module.exports = function (input, value) {
  return !!input.getAttribute('step') && (value % Number(input.getAttribute('step')) !== 0)
}
