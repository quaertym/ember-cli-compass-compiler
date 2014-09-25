## ember-cli-compass-compiler

This addon adds [compass](http://compass-style.org/) compiler for [Ember CLI](http://www.ember-cli.com/).

### Installation

In your Ember CLI app (>= v0.0.37) run the following:

```bash
npm install --save-dev ember-cli-compass-compiler
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

A file named `appname.scss` in your `app/styles` directory should be compiled into `appname.css` 
with `ember build` or `ember serve` commands.


To override default options of compass compiler, do the following in your Brocfile:

```javascript
var app = new EmberApp({
  compassOptions: {
    outputStyle: 'expanded',
    require: ['sass-css-importer', 'susy']
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

MIT
