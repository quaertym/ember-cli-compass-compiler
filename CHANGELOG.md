## v0.2.0

* Add support for `outputPaths`
* **[BREAKING CHANGE]** Main `.scss` file should be named `app.scss` instead of `appname.scss`

## v0.1.2

* Use `setupPreprocessorRegistry` hook
* Watch `importPath` directories
* Move dependencies into separate modules: [broccoli-compass-compiler](https://github.com/quaertym/broccoli-compass-compiler) & [compass-compile](https://github.com/quaertym/compass-compile)

## v0.0.18

* Allow paths with whitespace

## v0.0.17

* Avoid unnecessary compilation by compiling only when app/styles contents change

## v0.0.16

* Cleanup code

## v0.0.15

* Display compass errors if present [#19](https://github.com/quaertym/ember-cli-compass-compiler/pull/19)

## v0.0.14

* Fixed EMFILE error. See below.
* Great speed improvements. See below.
* Dropped `broccoli-compass` dependency. Some of the things may not work because of this. Please
open an issue if that is the case. If you prefer `broccoli-compass` dependency please continue
using `ember-cli-compass-compiler` v0.0.13. 
