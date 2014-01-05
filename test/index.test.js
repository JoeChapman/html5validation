'use strict';

describe('HTML5 Validation', function () {

    if (document.createElement('input').validity) {
        return;
    }

    var sinon = require('sinon'),
        expect = require('chai').expect;

    var telRegExp = new RegExp(/^\+*\d+[\d ]+$/),

        $el = $(
        '<div>' +
            '<input type="text">' +
            '<input type="text" required>' +
            '<input type="text" disabled>' +
            '<input type="checkbox">' +
            '<input type="checkbox" required>' +
            '<input type="radio">' +
            '<input type="radio" required>' +
            '<input type="tel">' +
            '<input type="tel" required>' +
            '<input type="tel" pattern="' + telRegExp.source + '">' +
            '<input type="number">' +
            '<input type="number" required>' +
            '<input type="number" step="5" min="20" max="500">' +
            '<input type="range">' +
            '<input type="email">' +
            '<input type="email" required>' +
            '<input type="url">' +
            '<input type="url" required>' +
            '<select>' +
                '<option value="1">value1</option>' +
                '<option value="2">value2</option>' +
                '<option value="3">value3</option>' +
                '<option value="4">value4</option>' +
            '</select>' +
            '<select required>' +
                '<option value>Select</option>' +
                '<option value="1">value1</option>' +
                '<option value="2">value2</option>' +
                '<option value="3">value3</option>' +
                '<option value="4">value4</option>' +
            '</select>' +
            '<textarea></textarea>' +
            '<textarea required></textarea>' +
        '</div>');

    require('../index');

    before(function () {
        $('#test-body').append($el);
    });

    describe('input[text]', function () {

        describe('not empty', function () {

            it('is valid', function () {

                $el.find('input[type="text"]').val('a string');

                expect($el.find('input[type="text"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('[required]', function () {

            describe('empty', function () {

                it('is invalid', function () {

                    $el.find('input[type="text"][required]').val('');

                    expect($el.find('input[type="text"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                    expect($el.find('input[type="text"][required]')[0].validity)
                        .to.have.property('valueMissing')
                        .and.equal(true);

                });

            });

            describe('not empty', function () {

                it('is valid', function () {

                    $el.find('input[type="text"][required]').val('a string');

                    expect($el.find('input[type="text"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(true);

                });

            });

        });

        describe('[disabled]', function () {

            it('will not validate', function () {

                $el.find('input[type="text"][disabled]').val('valid string');

                expect($el.find('input[type="text"][disabled]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

    });

    describe('input[checkbox]', function () {

        describe('checked', function () {

            it('is valid', function () {

                $el.find('input[type="checkbox"]').prop('checked', true);

                expect($el.find('input[type="checkbox"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('[required]', function () {

            describe('unchecked', function () {

                it('is invalid', function () {

                    $el.find('input[type="checkbox"][required]').prop('checked', false);

                    expect($el.find('input[type="checkbox"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                    expect($el.find('input[type="checkbox"][required]')[0].validity)
                        .to.have.property('valueMissing')
                        .and.equal(true);

                });

            });

            describe('checked', function () {

                it('is valid', function () {

                    $el.find('input[type="checkbox"]').prop('checked', true);

                    expect($el.find('input[type="checkbox"]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(true);

                });

            });

        });

    });

    describe('input[radio]', function () {

        describe('checked', function () {

            it('is valid', function () {

                $el.find('input[type="radio"]').prop('checked', true);

                expect($el.find('input[type="radio"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('[required]', function () {

            describe('unchecked', function () {

                it('is valid', function () {

                    $el.find('input[type="radio"][required]').prop('checked', false);

                    expect($el.find('input[type="radio"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(true);

                });

            });

        });


    });

    describe('input[tel]', function () {

        describe('with a number', function () {

            it('is valid', function () {

                $el.find('input[type="tel"]').val(123456789);

                expect($el.find('input[type="tel"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('with a string', function () {

            it('is valid', function () {

                $el.find('input[type="tel"]').val('a string');

                expect($el.find('input[type="tel"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('[required]', function () {

            describe('empty', function () {

                it('is invalid', function () {

                    $el.find('input[type="tel"][required]').val('');

                    expect($el.find('input[type="tel"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                });

            });

        });


        describe('[pattern]', function () {

            describe('with an invalid value', function () {

                it('is invalid', function () {

                    $el.find('input[type="tel"][pattern]').val(1);

                    expect($el.find('input[type="tel"][pattern]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                });

            });

            describe('with a valid value', function () {

                it('is valid', function () {

                    $el.find('input[type="tel"][pattern]').val(123321654);

                    expect($el.find('input[type="tel"][pattern]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(true);

                });

            });

        });

    });

    describe('input[number]', function () {

        describe('with a positive integer', function () {

            it('is valid', function () {

                $el.find('input[type="number"]').val(12);

                expect($el.find('input[type="number"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('with a decimal number', function () {

            it('is invalid', function () {

                $el.find('input[type="number"]').val(12.3456789);

                expect($el.find('input[type="number"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(false);

            });

        });

        describe('with a negative integer', function () {

            it('is valid', function () {

                $el.find('input[type="number"]').val(-12);

                expect($el.find('input[type="number"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('with a string', function () {

            it('is valid', function () {

                $el.find('input[type="number"]').val('12');

                expect($el.find('input[type="number"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('[required]', function () {

            describe('empty', function () {

                it('is invalid', function () {

                    $el.find('input[type="number"][required]').val('');

                    expect($el.find('input[type="number"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                });

            });

        });

        describe('with step, min and max', function () {

            describe('with a step lower than min', function () {

                it('is invalid', function () {

                    $el.find('input[type="number"][step]').val(15);

                    expect($el.find('input[type="number"][step]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                });

            });

            describe('with a step greater than max', function () {

                it('is invalid', function () {

                    $el.find('input[type="number"][step]').val(505);

                    expect($el.find('input[type="number"][step]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                });

            });

            describe('with a step between min and max', function () {

                it('is valid', function () {

                    $el.find('input[type="number"][step]').val(200);

                    expect($el.find('input[type="number"][step]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(true);

                });

            });

            describe('with a value out of step', function () {

                it('is invalid', function () {

                    $el.find('input[type="number"][step]').val(202);

                    expect($el.find('input[type="number"][step]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                });

            });

        });

    });

    describe('input[range]', function () {

        describe('with a number', function () {

            it('is valid', function () {

                $el.find('input[type="range"]').val(123456789);

                expect($el.find('input[type="range"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('with a string', function () {

            it('is valid', function () {

                $el.find('input[type="range"]').val('a string');

                expect($el.find('input[type="range"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('empty', function () {

            it('is invalid', function () {

                $el.find('input[type="range"]').val('');

                expect($el.find('input[type="range"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

    });

    describe('input[email]', function () {

        describe('an invalid email', function () {

            it('is invalid', function () {

                $el.find('input[type="email"]').val('not_an_email');

                expect($el.find('input[type="email"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(false);

                expect($el.find('input[type="email"]')[0].validity)
                    .to.have.property('typeMismatch')
                    .and.equal(true);

            });

        });

        describe('a valid email', function () {

            it('is valid', function () {

                $el.find('input[type="email"]').val('test@test.com');

                expect($el.find('input[type="email"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('[required]', function () {

            describe('empty', function () {

                it('is invalid', function () {

                    $el.find('input[type="email"][required]').val('');

                    expect($el.find('input[type="email"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                    expect($el.find('input[type="email"][required]')[0].validity)
                        .to.have.property('valueMissing')
                        .and.equal(true);

                });

            });

        });

    });

    describe('input[url]', function () {

        describe('an invalid url', function () {

            it('is invalid', function () {

                $el.find('input[type="url"]').val('not a url');

                expect($el.find('input[type="url"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(false);

                expect($el.find('input[type="url"]')[0].validity)
                    .to.have.property('typeMismatch')
                    .and.equal(true);

            });

        });

        describe('a valid url', function () {

            it('is valid', function () {

                $el.find('input[type="url"]').val('http://test.com');

                expect($el.find('input[type="url"]')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

        describe('[required]', function () {

            describe('empty', function () {

                it('is invalid', function () {

                    $el.find('input[type="url"][required]').val('');

                    expect($el.find('input[type="url"][required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                    expect($el.find('input[type="url"][required]')[0].validity)
                        .to.have.property('valueMissing')
                        .and.equal(true);

                });

            });

        });

    });

    describe('select', function () {

        describe('value selected', function () {

            it('is valid', function () {

                $el.find('select').val('1');

                expect($el.find('select')[0].validity)
                    .to.have.property('valid')
                    .and.equal(true);

            });

        });

    });

    describe('textarea', function () {

        describe('[required]', function () {

            describe('empty', function () {

                it('is invalid', function () {

                    expect($el.find('textarea[required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(false);

                    expect($el.find('textarea[required]')[0].validity)
                        .to.have.property('valueMissing')
                        .and.equal(true);

                });

            });

            describe('not empty', function () {

                it('is valid', function () {

                    $el.find('textarea[required]').val('some text');

                    expect($el.find('textarea[required]')[0].validity)
                        .to.have.property('valid')
                        .and.equal(true);

                });

            });

        });

    });

    describe('checkValidity', function () {

        describe('input[required]', function () {

            it('returns true if not empty (valid)', function () {

                $el.find('input[type="text"][required]').val('a string');

                expect($el.find('input[type="text"][required]')[0].checkValidity()).to.equal(true);

            });

            it('returns false if empty (invalid)', function () {

                $el.find('input[type="text"][required]').val('');

                expect($el.find('input[type="text"][required]')[0].checkValidity()).to.equal(false);

            });

            it('triggers "invalid" if empty (invalid)', function () {

                sinon.spy($el.find('input[type="text"][required]')[0], 'dispatchEvent');

                $el.find('input[type="text"][required]').val('');

                $el.find('input[type="text"][required]')[0].checkValidity();

                expect($el.find('input[type="text"][required]')[0].dispatchEvent)
                    .to.have.been.called;

            });

        });

        describe('textarea[required]', function () {

            it('returns true if not empty (valid)', function () {

                $el.find('textarea[required]').val('a string');

                expect($el.find('textarea[required]')[0].checkValidity()).to.equal(true);

            });

            it('returns false if empty (invalid)', function () {

                $el.find('textarea[required]').val('');

                expect($el.find('textarea[required]')[0].checkValidity()).to.equal(false);

            });

            it('triggers "invalid" if empty (invalid)', function () {

                sinon.spy($el.find('textarea[required]')[0], 'dispatchEvent');

                $el.find('textarea[required]').val('');

                $el.find('textarea[required]')[0].checkValidity();

                expect($el.find('textarea[required]')[0].dispatchEvent)
                    .to.have.been.called;

            });

        });

        describe('select[required]', function () {

            it('returns true if not empty (valid)', function () {

                $el.find('select[required]').val('1').change();

                expect($el.find('select[required]')[0].checkValidity()).to.equal(true);

            });

            it('returns false if empty (invalid)', function () {

                $el.find('select[required]').val('0').change();

                expect($el.find('select[required]')[0].checkValidity()).to.equal(false);

            });

            it('triggers "invalid" if empty (invalid)', function () {

                sinon.spy($el.find('select[required]')[0], 'dispatchEvent');

                $el.find('select[required]').change();

                $el.find('select[required]')[0].checkValidity();

                expect($el.find('select[required]')[0].dispatchEvent)
                    .to.have.been.called;

            });

        });

    });

    describe('setCustomValidity', function () {

        var message = 'Custom validation message';

        describe('input', function () {

            it('sets the message on input.validationMessage', function () {

                $el.find('input[required]')[0].setCustomValidity(message);

                expect($el.find('input[required]')[0].validationMessage).to.equal(message);

            });

        });

    });

});