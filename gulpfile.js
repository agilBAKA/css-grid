const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const purgeCSS = require('gulp-purgecss')

// compile sass
function style() {
    return gulp.src('./src/sass/**/*.sass')
    .pipe(sass({
        outputStyle: "compressed"
    }))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
}

function views() {
    return gulp.src('./src/views/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public/'))
}

function cleanCSS() {
    return gulp.src('./public/css/**/*.css')
    .pipe(purgeCSS({
        content:['public/*.html']
    }))
    .pipe(gulp.dest('./public/css'))
}

// watch 
function watch() {
    browserSync.init({
        server: {
            baseDir: './public/'
        }
    });
    gulp.watch('./src/sass/**/*.sass', style);
    gulp.watch('./src/views/**/**/*.pug', views);
    gulp.watch('./public/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.views = views;
exports.cleanCSS = cleanCSS;
exports.watch = watch;
