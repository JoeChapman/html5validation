'use strict';

module.exports = function (config) {

    var browsers = ['Chrome'];

    if (process.platform === 'darwin') {
        browsers.push('Safari');
    }

    config.set({

        basePath: '../',

        frameworks: ['mocha', 'browserify'],

        preprocessors: {
            'index.js': ['browserify'],
            'test/index.test.js': ['browserify']
        },

        browserify: {
            extension: ['.js']
        },

        files: [
            'test/lib/jquery-1.10.1.js',
            'node_modules/chai/chai.js',
            'node_modules/chai-jquery/chai-jquery.js',
            'test/index.test.js'
        ],

        browsers: browsers,

        reporters: ['progress', 'junit'],

        junitReporter: {
            outputFile: 'feunit-results.xml'
        },

        port: 9876,

        colors: true,

        singleRun: true,

        captureTimeout: 6000

    });

};