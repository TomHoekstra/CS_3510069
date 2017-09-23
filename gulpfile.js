var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var typescript = require('gulp-typescript');

var tsProject = typescript.createProject('tsconfig.json', {
    declaration: false
});

gulp.task('backendSrc', function () {
    var tsResult = gulp.src(['server/**/*.ts', 'server/**/**/*.ts']).pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./dist/server'));
});

gulp.task('serverAssets', function () {
    return gulp.src(['./server/**/*.json', './server/**/**/*.json']).pipe(gulp.dest('./dist/server'));
});

gulp.task('watch', function () {
    nodemon({
        script: './dist/server/server.js',
        tasks: ['backendSrc'],
        ext: 'ts json',
        ignore: ['assets/', 'dist/', 'src/app/']
    }).on('restart', function () {
        console.log('Changes found, restarting');
    });
});

gulp.task('serve', ['backendSrc', 'serverAssets', 'watch']);

gulp.task('build', ['backendSrc', 'serverAssets']);