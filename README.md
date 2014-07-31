## ember-cli-compass-compiler

This addon adds [compass](http://compass-style.org/) compiler for [Ember CLI](http://www.ember-cli.com/).

### Installation

In your Ember CLI app (>= v0.0.37) run the following:

```bash
npm install --save-dev ember-cli-compass-compiler
```

### Requirements

`compass` should be installed on your machine in order for this addon to work.

Install `sass-css-importer` Ruby gem also that allows import of css files 
into your main sass file.

To install `compass`, run:

```bash
gem install compass
```

To install `sass-css-importer`, run:

```bash
gem install --pre sass-css-importer
```

### Usage

After installation everything should work automatically.

A file named `appname.scss` in your `app/styles` directory should be compiled into `appname.css` 
with `ember build` or `ember serve` commands.

### References

* [compass](http://compass-style.org/)
* [sass-css-importer](https://github.com/chriseppstein/sass-css-importer)
* [broccoli-compass](https://github.com/g13013/broccoli-compass)
* [broccoli](https://github.com/broccolijs/broccoli)

This work is built based on the [gist](https://gist.github.com/wagenet/79b804eb943b9f3d7594) by [@wagenet](https://github.com/wagenet).

### Other

Still a work in progress, use at your own risk.

### LICENSE

MIT
