HTML5 Validation
================

Adds support for HTML5 validation in IE9 browser

Read <pre>input.validity.valid</pre> or execute <pre>input.checkValidity()</pre>
to get the validity state.

### To test

A simple Express server has been added to enable tests.
You'll need to <a href='http://nodejs.org/'>install NodeJS</a>, 
then run <pre>npm install</pre> to install the dependencies.
Once you're set up, run <pre>npm test</pre> and browse to <a href='http://localhost:3003/'>http://localhost:3003/</a>