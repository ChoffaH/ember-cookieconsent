import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { isPresent, isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class CookieConsentService extends Service {
  @tracked isAccepted = true;
  _denyStatus = 'deny';

  constructor () {
    super (...arguments);

    let ENV = getOwner(this).resolveRegistration('config:environment');
    let { cookieconsent } = ENV;

    if (isPresent(cookieconsent)) {
      let { auto = true } = cookieconsent;
      let { type } = cookieconsent.options;

      if (type === 'opt-in') {
        this.isAccepted = false;
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
    this.isAccepted = status !== this._denyStatus;
  }

  _initialize(options) {
    options.onInitialise = this._setStatus.bind(this);
    options.onStatusChange = this._setStatus.bind(this);

    window.cookieconsent.initialise(options || {});
  }
}
