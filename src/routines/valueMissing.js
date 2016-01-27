module.exports = function (input) {
  const type = input.getAttribute('type') || input.tagName.toLowerCase()

  if (type === 'checkbox') return input.checked !== true
  if (type === 'select') return !input[input.selectedIndex + 1].getAttribute('value')
  if (type !== 'radio' && type !== 'range') return input.value.length === 0

  return false
}
