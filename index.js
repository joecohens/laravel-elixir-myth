var gulp    = require('gulp');
var Elixir  = require('laravel-elixir');
var compile = require('laravel-elixir/tasks/shared/Css');

var config = Elixir.config;

/*
 |----------------------------------------------------------------
 | Myth Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Myth, including minification and
 | and auto-prefixing. Additionally it supports any gulp myth
 | options that you want to include with your compilation.
 |
 */

Elixir.extend('myth', function(src, output, options) {
    config.css.myth = {
        folder: 'css'
    };

    new Elixir.Task('myth', function() {
        var paths = prepGulpPaths(src, output);

        return compile({
            name: 'Myth',
            compiler: require('gulp-myth'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.myth.pluginOptions
        });
    })
    .watch(config.get('assets.css.myth.folder') + '/**/*.css');
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.css.myth.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
