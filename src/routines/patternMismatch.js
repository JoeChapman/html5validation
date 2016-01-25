module.exports = function (input) {
  return input.getAttribute('pattern') && new RegExp(input.getAttribute('pattern')).test(input.value) === false
}
