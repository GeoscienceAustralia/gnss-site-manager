import * as gulp from 'gulp';
import * as gulpdebug from 'gulp-debug';
import * as gulpif from 'gulp-if';
import { join } from 'path';
import { argv } from 'yargs';
import Config from '../../config';

/**
 * This sample task should come late in the build chain after the .ts are transpiled into .js under dist/tmp.  
 * It copies from there all JavaScript files under jslocal to the appropiate `dist/dev|prod|test/js` directory, 
 * where other .js artifacts are built.
 * 
 * 1. .js files are copied to the angular-2 built js/ directory.
 * 2. Service Worker .js files (ones that start with 'service-worker') are copied to the root since that
 * becomes the scope of the service-worker (putting the file(s) into 'js/' would limit its scope to only 
 * that directory).
 */
export = () => {
    let debug: boolean = argv.debug;
    let dir=join(Config.TMP_DIR, 'jslocal');
    let serviceWorkerFiles = join(dir, '**/service-worker*.js');
    let normalFiles=[join(dir, '**/*.js'),
                    '!' + serviceWorkerFiles];
    if (debug) {
        console.log('copy.js.local - normal files: ', normalFiles);
        console.log('copy.js.local - service worker files: ', serviceWorkerFiles);
    }
    gulp.src(normalFiles)
        .pipe(gulpif(debug, gulpdebug({title:'copy.js.local normal files'})))
        .pipe(gulp.dest(Config.JS_DEST));
    gulp.src(serviceWorkerFiles)
        .pipe(gulpif(debug, gulpdebug({title:'copy.js.local service worker files'})))
        .pipe(gulp.dest(Config.PROD_DEST));
};
