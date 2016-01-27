# HTML5 Validation

HTML5 ValidityState shim

## Known Issues

1. The current implementation completely overwrite the browser's validation.
The problem is that some browsers do support ValidityState but miss some validation (e.g validity.tooShort).
A cleaner way would be to add a function instead of replacing the existing implementation.
So you'd have to call `<libraryName>.validity(input)` but cannot use `input.validity`.
2. setCustomValidity is a method that sets the value of input.validationMessage which is a read-only property.
As a lack of workaround, setCustomValidity is not implemented in this shim.
3. Do not rely on customError, setCustomValidity and badInput as they are not implemented.

## TODO

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
* [ ] Add a non-overwriting alternative (e.g `html5validation.validity(input)`)
* [ ] Read spec regarding willValidate
