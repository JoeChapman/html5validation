module.exports = function (input) {
  if (!input.hasAttribute('required')) return false

  const type = input.getAttribute('type') || input.tagName.toLowerCase()

  if (type === 'checkbox') return input.checked !== true
  if (type !== 'radio' && type !== 'range') return input.value.length === 0

  return false
}
