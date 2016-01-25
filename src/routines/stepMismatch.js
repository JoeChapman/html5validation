module.exports = function (input) {
  return !!input.getAttribute('step') && (input.value % Number(input.getAttribute('step')) !== 0)
}
