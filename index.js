var gulp = require('gulp'),
    myth = require('gulp-myth'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    _ = require('underscore'),
    elixir = require('laravel-elixir'),
    utilities = require('laravel-elixir/ingredients/commands/Utilities'),
    notification = require('laravel-elixir/ingredients/commands/Notification');

elixir.extend('myth', function (src, options) {
    var config = this;

    options = _.extend({
        debug: ! config.production,
        srcDir: config.assetsDir + 'css',
        output: config.cssOutput
    }, options);

    src = "./" + utilities.buildGulpSrc(src, options.srcDir);

    gulp.task('myth', function () {
        var onError = function(e) {
            new notification().error(e, 'Myth Compilation Failed!');
            this.emit('end');
        };

        return gulp.src(src)
            .pipe(myth(options)).on('error', onError)
            .pipe(gulpIf(! options.debug, uglify()))
            .pipe(gulp.dest(options.output))
            .pipe(new notification().message('Myth Compiled!'));
    });

    this.registerWatcher('myth', options.srcDir + '/**/*.css');

    return this.queueTask('myth');
});
