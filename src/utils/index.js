const moment = require('moment');

class Utils {
  static insertNow() {
    return moment.utc().format('DD-MM-YYYY HH:mm:ss');
  }
}

module.exports = Utils;
