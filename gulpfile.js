const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const SRC = 'src/*.js';
const DEST = 'dist';

gulp.task('clean_dist', () => {
    return del('dist/*');
});

gulp.task('concat_js', () => {
    gulp.src(SRC)
        .pipe(concat('helpers.js'))
        .pipe(gulp.dest(DEST))
        .pipe(uglify())
        .pipe(rename('helpers.min.js'))
        .pipe(gulp.dest(DEST));
});

gulp.task('build', [
    'clean_dist',
    'concat_js'
]);
