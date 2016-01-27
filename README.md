# HTML5 Validation

HTML5 ValidityState shim

## Known Issues

1. setCustomValidity is a method that sets the value of input.validationMessage which is a read-only property.
As a lack of workaround, setCustomValidity is not implemented in this shim.
2. Do not rely on customError, setCustomValidity and badInput as they are not implemented.

## TODO

* [ ] Test each routines separately as PhantomJS supports the HTML5 Constraint Validation API
* [ ] Add missing tests
  * [ ] `input[type=number]`
    * [ ] maxlength
    * [ ] minlength
  * [ ] `input[type=email]`
    * [ ] required
    * [ ] maxlength
    * [ ] minlength
  * [ ] `input[type=url]`
    * [ ] required
    * [ ] maxlength
    * [ ] minlength
  * [ ] `[step]`
  * [ ] `<select>`
  * [x] `<textarea>`
  * [ ] `<checkValidity>`
* [ ] Read spec regarding willValidate
