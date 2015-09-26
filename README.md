## ember-cli-compass-compiler

This addon adds [Compass](http://compass-style.org/) compiler for [Ember CLI](http://www.ember-cli.com/).

### Installation

In your Ember CLI app, run the following:

```bash
ember install ember-cli-compass-compiler
```

> **Note:** This addon will compile your `.scss` files, in addition to making Compass's
  libraries available to your project. This means you **do not** need additional broccoli libraries
  for compiling sass, such as `broccoli-sass`.
  
> Be sure to remove all such libraries from your project when using `ember-cli-compass-compiler`.

### Requirements

`compass` should be installed on your machine in order for this addon to work.

To install `compass`, run:

```bash
gem install compass
```

### Usage

After installation everything should work automatically.

`app.scss` in your `app/styles` directory is compiled into `assets/appname.css` 
with `ember build` or `ember serve` commands. Other `.scss` files in `app/styles` 
are compiled as well.

> **Note:** Previous versions of this addon(< 0.1.0) was requiring the main `.scss` file to be named as `appname.scss`.

To override default options of compass compiler, do the following in your Brocfile:

```javascript
var app = new EmberApp({
  compassOptions: {
    outputStyle: 'expanded',
    require: ['sass-css-importer', 'susy']
  }
});
```

To use compass, import it in your `app.scss`:

```scss
@import "compass";

.round-rect-button {
  @include border-radius(4px, 4px); 
}
```

To include other files, import them using the relative path:

```scss
@import "compass";
@import "../../bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap";

.badge-success {
  @extend .badge;
  background-color: $brand-success !important;
}
```

or use `importPath` option:

```javascript
var app = new EmberApp({
  compassOptions: {
    importPath: ['bower_components/bootstrap-sass-official/assets/stylesheets']
  }
});
```
```scss
@import "compass";
@import "bootstrap";

.badge-success {
  @extend .badge;
  background-color: $brand-success !important;
}
```

### Import paths

You can add additional scss import paths in your `compassOptions`. These paths will also be watched by broccoli and reload live.

```javascript
var app = new EmberApp({
  compassOptions: {
    importPath: ['/relative/path/to/vendor/scss/dir', '/other/full/path/to/css/dir']
  }
});
```

### References

* [compass](http://compass-style.org/)
* [broccoli](https://github.com/broccolijs/broccoli)

This work is built based on the [gist](https://gist.github.com/wagenet/79b804eb943b9f3d7594) by [@wagenet](https://github.com/wagenet).

### Other

Still a work in progress, use at your own risk.

### LICENSE

The MIT License (MIT)

Copyright (c) 2015 Emre Unal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
