| [![Build Status][travis-image]][travis-url] | [![Coverage Status][coverage-image]][coverage-url] |
| ------- | ------- |

# Kade

## What is it?

A boilerplate utilizing Sails.js and Angular. It's currently in the very early
stages of development.

## Dependency Setup

Run 'npm install' followed by 'bower install'

## Libraries

- [jQuery](http://jquery.com/)
- [Lo-Dash](https://lodash.com/)
- [Angular](https://angularjs.org/)
- [toastr](https://github.com/CodeSeven/toastr)
- [Moment](http://momentjs.com/)

## Tasks

- [grunt-ng-annotate](https://www.npmjs.org/package/grunt-ng-annotate) Safeguards your code from any dependencies that may not be using minification-safe practices.
- [grunt-libsass](https://github.com/project-collins/grunt-libsass) LibSASS Support

## Testing

Tests are run through the wonderful mocha so just clone the library run `npm install` then `npm test`

### Add libraries

    $ bower install --save {{library}}

Then add it to your asset pipeline. (tasks/pipeline.js)

## Task triggers

    $ npm start

Watch your dev code for changes and automatically reboot Sails. Requires [node-dev](https://github.com/fgnass/node-dev).

    $ sails lift

Launch app for development. Runs the *default* task (tasks/register/default.js).

    $ sails lift --prod

Launch app for production. CSS and JS are concatenated and minified. Runs the *prod* task (tasks/register/prod.js).

    $ sails www

Will build a concatenated and minified dev version of the app and place it in the **www** folder. Runs the *build* task (tasks/register/build.js).

    $ sails www --prod (production)

Will build a concatenated and minified production version of the app and place it in the **www** folder. Runs the *buildProd* task (tasks/register/buildProd.js).

## Resources

- [Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide)

[travis-url]: https://travis-ci.org/JaceRider/Kade
[travis-image]: https://travis-ci.org/JaceRider/Kade.svg?branch=develop&style=flat

[coverage-image]: https://coveralls.io/repos/JaceRider/Kade/badge.svg?branch=develop&style=flat
[coverage-url]: https://coveralls.io/r/JaceRider/Kade?branch=develop
