module.exports = function (input, value) {
  var retVal = false
  switch (input.getAttribute('type') || input.nodeName.toLowerCase()) {
    case 'checkbox':
      retVal = !input.checked
      break
    case 'radio':
    case 'range':
      break
    case 'select':
      retVal = !input[input.selectedIndex + 1].getAttribute('value')
      break
    default:
      retVal = (value === '')
      break
  }
  return retVal
}
