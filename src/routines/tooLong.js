module.exports = function (input) {
  return !!input.getAttribute('maxlength') && input.value.length > Number(input.getAttribute('maxlength'))
}
