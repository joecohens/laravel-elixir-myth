var gulp = require('gulp'),
    myth = require('gulp-myth'),
    _ = require('underscore'),
    Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('myth', function (src, options) {
    options = _.extend({
        debug:     ! config.production,
        srcDir:    config.get('assets.css.folder'),
        outputDir: config.get('public.css.outputFolder'),
    }, options);

    var paths = prepGulpPaths(src, options.srcDir, outputDir);

    this.log(paths.src, paths.output);

    new Elixir.Task('myth', function () {
        return (
            gulp.src(src)
                .pipe(myth(options))
                .on('error', function(e) {
                    new Elixir.Notification('Webpack Compilation Failed!');

                    this.emit('end');
                })
                .pipe($.if(! options.debug, $.uglify()))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('Webpack Compiled!'))
        );
    })
    .watch(config.get('assets.css.folder') + '/**/*.css');
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param {string|array} src
 * @param {string|null}  baseDir
 * @param {string|null}  output
 */
var prepGulpPaths = function(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir)
        .output(output, 'app.css');
};
