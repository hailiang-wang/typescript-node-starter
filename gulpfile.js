const gulp = require('gulp'),
    exec = require('child_process').exec,
    nodemon = require('gulp-nodemon'),
    ava = require('gulp-ava');

gulp.task('copyJSON', function() {
    return gulp.src('./src/**/*.json')
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile', ['copyJSON'] ,function(done) {
    exec('tsc', function(err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});

gulp.task('test', ['compile'], function() {
    gulp.src('dist/test')
        // gulp-ava needs filepaths so you can't have any plugins before it
        .pipe(ava({verbose: true}));
});

gulp.task('watch:test', function() {
    gulp.watch(['./src/**/*'], ['test']);
});

gulp.task('watch:compile', function() {
    gulp.watch(['./src/**/*'], ['compile']);
});

gulp.task('serve', ['compile'] ,function(done) {
    nodemon({
        script: 'dist/app.js',
        ext: 'js json',
        ignore: [
            'src/',
            'dist/logs',
            'node_modules/'
        ],
        watch: ['dist'],
        stdout: true,
        readable: false
    });
});

gulp.task('default', ['watch:compile','serve']);