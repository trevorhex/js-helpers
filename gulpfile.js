const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const SRC = 'src/helpers.js';
const DEST = 'dist';

gulp.task('clean_dist', () => {
    return del('dist/*');
});

gulp.task('uglify_js', () => {
    gulp.src(SRC)
        .pipe(uglify())
        .pipe(rename('helpers.min.js'))
        .pipe(gulp.dest(DEST));
});

gulp.task('build', [
    'clean_dist',
    'uglify_js'
]);
