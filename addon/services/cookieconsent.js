import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { isPresent, isNone } from '@ember/utils';
import { set } from '@ember/object';

export default class CookieConsentService extends Service {
  _denyStatus = 'deny';
  isAccepted = true;

  constructor () {
    super (...arguments);

    let ENV = getOwner(this).resolveRegistration('config:environment');
    let { cookieconsent } = ENV;

    if (isPresent(cookieconsent)) {
      let { auto = true } = cookieconsent;
      let { type } = cookieconsent.options;

      if (type === 'opt-in') {
        set(this, 'isAccepted', false);
      }

      if (auto) {
        this._initialize(cookieconsent.options);
      }
    }
  }

  /**
   * Manually show the cookie consent.
   *
   * @param options
   */
  show(options) {
    if (isNone (options)) {
      let ENV = getOwner(this).resolveRegistration ('config:environment');
      let { cookieconsent } = ENV;

      if (isPresent (cookieconsent)) {
        options = cookieconsent.options;
      }
    }

    this._initialize(options);
  }

  _setStatus(status) {
    set(this, 'isAccepted', status !== this._denyStatus);
  }

  _initialize(options) {
    options.onInitialise = this._setStatus.bind(this);
    options.onStatusChange = this._setStatus.bind(this);

    window.cookieconsent.initialise(options || {});
  }
}
