'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super (...arguments);

    app.import('node_modules/cookieconsent/build/cookieconsent.min.js');
    app.import('node_modules/cookieconsent/build/cookieconsent.min.css');
  }
};
