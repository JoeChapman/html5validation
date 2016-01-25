module.exports = function (input, value) {
  return !!input.getAttribute('maxlength') && value.length > Number(input.getAttribute('maxlength'))
}
