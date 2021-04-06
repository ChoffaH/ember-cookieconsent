ember-cookieconsent
==============================================================================

An ember-cli addon for using [CookieConsent](https://github.com/osano/cookieconsent) in Ember.js applications.

Largly inspired by [ember-cli-cookieconsent](https://www.npmjs.com/package/ember-cli-cookieconsent).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cookieconsent
```


Usage
------------------------------------------------------------------------------

Use the online [CookieConsent editor](https://www.osano.com/cookieconsent/download/) to get some help generating your first configuration.

Then just add your CookieConsent configuration to config/environment.js.

```
let ENV = {
  // ...
  cookieconsent: {
    auto: true, // Automatically show cookie consent; default is true
    options: {
                // CookieConsent configuration goes here
    }
  }
}
```

This addon sets up a "cookieconsent" service:
* `cookieconsent.isAccepted` contains the current consent state. Since 1.0.1 this property is @tracked.

* `cookieconsent.show()` can be called to manually show the CookieConsent if auto is set to false.


FastBoot
------------------------------------------------------------------------------

As of 1.0.2 ember-cookieconsent works with FastBoot out of the box by not loading the cookieconsent library in FastBoot at all. This is done because the library uses `document` and `window` which is not available in Node.js.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
