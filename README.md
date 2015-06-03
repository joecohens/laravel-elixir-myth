# laravel-elixir-myth

Simple extension to *laravel elixir* to precompile with Myth.

## Install

```
npm install --save-dev laravel-elixir-myth
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require("laravel-elixir");

require("laravel-elixir-myth");

elixir(function(mix) {
    mix.myth("app.css");
});

```
#### Advanced example

```javascript
elixir(function(mix) {
    mix.myth("app.css", {
        sourcemap: false
    });
});
```
