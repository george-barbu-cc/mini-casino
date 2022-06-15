// Load Custom Variables
const $ = {
    path: {
        dest: {
            default: './public/',
            assets: {
                default: './public/web/assets/',
                js: './public/web/assets/js/',
                css: './public/web/assets/css/',
                fonts: './public/web/assets/fonts/',
            },
            excludeClear: ['!./public/web/data/'],
        },
        src: {
            php: './src/backend/php',
            scss: './src/frontend/scss',
            js: './src/frontend/js',
            excludedjs: ['./src/frontend/js/**/!(main)*.js', './src/frontend/js/main.js'],
            fonts: './src/frontend/fonts',
        }
    }
};

// Load gulp dependencies
const {
    src,
    dest,
    parallel,
    series,
    watch,
} = require('gulp');

// Load plugins
const uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    changed = require('gulp-changed'),
    babel = require('gulp-babel'),
    newer = require('gulp-newer'),
    phpConnect = require('gulp-connect-php'),
    ignore = require('gulp-ignore'),
    browsersync = require('browser-sync').create();

// Clean assets
function clear() {
    return src(`${$.path.dest.default}*`, {
            read: false
        })
        .pipe(ignore(`${$.path.dest.excludeClear}`))
        .pipe(clean());
}

// JS function 
function js() {
    const source = `${$.path.src.js}/**/*.js`;

    return src($.path.src.excludedjs)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(`${$.path.dest.assets.js}`))
        .pipe(browsersync.stream());
}

// CSS function 
function css() {
    const source = `${$.path.src.scss}/main.scss`;

    return src(source)
        .pipe(changed(source))
        .pipe(scss({
                outputStyle: 'compressed'
            })
            .on('error', scss.logError))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(`${$.path.dest.assets.css}`))
        .pipe(browsersync.stream());
}

// Fonts function 
function fonts() {
    const source = `${$.path.src.fonts}/**/*`;

    return src(source)
        .pipe(dest(`${$.path.dest.assets.fonts}`))
        .pipe(browsersync.stream());
}

// PHP function 
function php() {
    const source = `${$.path.src.php}/**/*`;

    return src(source)
        .pipe(newer(`${$.path.dest.default}/`))
        .pipe(dest(`${$.path.dest.default}/`))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    watch(`${$.path.src.scss}/**/*.scss`, css);
    watch(`${$.path.src.js}/**/*.js`, js);
    watch(`${$.path.src.fonts}/*`, fonts);
    watch(`${$.path.src.php}/**/*.php`, php);
}


//Php connect
function connectsync() {
    phpConnect.server({
        keepalive: true,
        base: `${$.path.dest.default}/`,
        hostname: '127.0.0.1'
    }, function () {
        browsersync.init({
            ui: false,
            open: true,
            notify: false,
            proxy: "127.0.0.1:8000"
        });
    });
}


// Tasks to define the execution of the functions simultaneously or in series
exports.watch = parallel(watchFiles, connectsync);
exports.default = series(clear, php, parallel(js, css, fonts));