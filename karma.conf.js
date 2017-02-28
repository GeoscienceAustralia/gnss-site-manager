// Karma configuration
// Generated on Wed Jul 15 2015 09:44:02 GMT+0200 (Romance Daylight Time)
'use strict';

var argv = require('yargs').argv;
var minimatch = require("minimatch");


module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Polyfills.
      'node_modules/core-js/client/shim.min.js',
      'node_modules/intl/dist/Intl.min.js',

      'node_modules/traceur/bin/traceur.js',

      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Zone.js dependencies
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/jasmine-patch.js',

      'node_modules/jsonix/jsonix.js',
      'node_modules/w3c-schemas/lib/XLink_1_0.js',
      'node_modules/ogc-schemas/lib/GML_3_2_1.js',
      'node_modules/ogc-schemas/lib/ISO19139_GMD_20070417.js',
      'node_modules/ogc-schemas/lib/ISO19139_GCO_20070417.js',
      'node_modules/ogc-schemas/lib/ISO19139_GSR_20070417.js',
      'node_modules/ogc-schemas/lib/ISO19139_GTS_20070417.js',
      'node_modules/ogc-schemas/lib/OWS_1_1_0.js',
      // 'node_modules/ogc-schemas/lib/Filter_1_1_0.js',
      'node_modules/ogc-schemas/lib/Filter_2_0.js',
      'node_modules/ogc-schemas/lib/ISO19139_GSS_20070417.js',
      'node_modules/ogc-schemas/lib/OM_2_0.js',
      'node_modules/ogc-schemas/lib/WFS_2_0.js',
      'node_modules/ogc-schemas/lib/GEODESYML_0_3.js',

      'node_modules/alertify.js/dist/js/alertify.js',
      'node_modules/lodash/lodash.js',

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // paths loaded via module imports
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      { pattern: 'dist/dev/**/*.js', included: false, watched: true },
      { pattern: 'dist/dev/**/*.html', included: false, watched: true, served: true },
      { pattern: 'dist/dev/**/*.css', included: false, watched: true, served: true },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false }, // PhantomJS2 (and possibly others) might require it

      // suppress annoying 404 warnings for resources, images, etc.
      { pattern: 'dist/dev/assets/**/*', watched: false, included: false, served: true },

      { pattern: 'node_modules/ng2-bootstrap/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/moment/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/foreach/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/json-pointer/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/scroll-into-view/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/raf/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/performance-now/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/deep-diff/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/oidc-client/**/*.js', included: false, watched: false },

      'test-config.js',
      'dist/dev/app/system-config.js',
      'test-main.js',
    ],

    // must go along with above, suppress annoying 404 warnings.
    proxies: {
      '/assets/': '/base/dist/dev/assets/'
    },

    // list of files to exclude
    exclude: [
      'node_modules/**/*spec.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //   'Chrome', Firefox
    browsers: [
      'Chrome'
    ],


    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Passing command line arguments to tests
    client: {
      files:  argv.files ? minimatch.makeRe(argv.files).source : null
    }
  });

  if (process.env.APPVEYOR) {
    config.browsers = ['IE'];
    config.singleRun = true;
    config.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
  }

  if (process.env.TRAVIS || process.env.CIRCLECI) {
    config.browsers = ['Chrome_travis_ci'];
    config.singleRun = true;
    config.browserNoActivityTimeout = 90000;
  }
};
