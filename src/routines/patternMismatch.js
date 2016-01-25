module.exports = function (input, value) {
  return input.getAttribute('pattern') && new RegExp(input.getAttribute('pattern')).test(value) === false
}
