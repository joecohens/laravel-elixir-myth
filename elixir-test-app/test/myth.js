var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Elixir = require('laravel-elixir');
var ElixirMyth = require('../../');

describe('Myth Task', function() {

    beforeEach(() => {
        Elixir.tasks = Elixir.config.tasks = [];
    });

    it('compiles Myth files to the public/css directory', done => {
        Elixir(mix => mix.myth('app.css'));

        runGulp(() => {
            shouldExist('./public/css/app.css');

            done();
        });
    });

    it('compiles Myth files to compressed script with `production` flag', done => {
        Elixir.config.production = true;

        Elixir(mix => mix.myth('app.css'));

        runGulp(() => {
            shouldExist('./public/css/app.css');
            shouldEqual('./public/css/app.css', './fixtures/css/app.css');

            done();
        });
    });
});

var shouldExist = (file) => {
    return fs.existsSync(file).should.be.true;
};

var shouldEqual = (expectFile, resultFile) => {
    return should.equal(
        fs.readFileSync(expectFile, {encoding: 'utf8'}),
        fs.readFileSync(resultFile, {encoding: 'utf8'})
    );
};

var runGulp = assertions => {
    gulp.start('default', () => {
        assertions();

        remove.sync('./public/css');
    });
};
