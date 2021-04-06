'use strict';

module.exports = {
  name: require('./package').name,

  treeForVendor(defaultTree) {        
    const map = require("broccoli-stew").map,
      Funnel = require("broccoli-funnel"),
      mergeTrees = require('broccoli-merge-trees');
 
    let browserVendorLib = new Funnel('node_modules/cookieconsent/build', {
      files: ['cookieconsent.min.js'],
      destDir: 'cookieconsent'
    });
    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
  
    let nodes = [browserVendorLib];
    if (defaultTree) {
      nodes.unshift(defaultTree);
    }

    return new mergeTrees(nodes);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    // import the above library into vendor.js that was merged with the vendor trees. In browser the library will be eval'd and run
    // In fastboot, the library will not be eval'd
    app.import('vendor/cookieconsent/cookieconsent.min.js');

    app.import('node_modules/cookieconsent/build/cookieconsent.min.css');
  }
};
