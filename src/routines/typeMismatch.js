// http://stackoverflow.com/questions/13289810/javascript-limit-text-field-to-positive-and-negative-numbers
const numberRegExp = /^-?\d+$/

// http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-(type=email)
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// http://regexlib.com/REDetails.aspx?regexp_id=1854
const urlRegExp = /(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/

module.exports = function (input) {
  const value = input.value
  const type = input.getAttribute('type')

  if (type === 'number') return !numberRegExp.test(value)
  if (type === 'url') return !urlRegExp.test(value)
  if (type === 'email') return !emailRegExp.test(value)

  return false
}
