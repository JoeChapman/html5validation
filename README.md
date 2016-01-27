# HTML5 Validation

HTML5 ValidityState shim

## Known Issues

1. The current implementation completely overwrite the browser's validation.
The problem is that some browsers do support ValidityState but miss some validation (e.g validity.tooShort).
A cleaner way would be to add a function instead of replacing the existing implementation.
So you'd have to call `<libraryName>.validity(input)` but cannot use `input.validity`.

## TODO

* [ ] Add missing tests
  * [ ] Add tests for `[step]`
* [ ] Add a non-overwriting alternative (e.g `html5validation.validity(input)`)
