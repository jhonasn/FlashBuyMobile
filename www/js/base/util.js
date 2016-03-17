//utilidades variadas que podem ser reutilizadas em todo o projeto
FlashBuy.util = {
  isDevice: function () {
    return document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
  },
  onDeviceReady: function(callback) {
    if(FlashBuy.util.isDevice()) {
      $(document).on('deviceready', callback);
    } else {
      $(document).ready(callback);
    }
  },
  QRCode: {
    scan: function (callback) {
      var success = function(success) {
        callback(true, success);
      };
      var error = function(error) {
        callback(false, error);
      };

      cordova.plugins.barcodeScanner.scan(
        success,
        error
      );
    },
    generate: function (information, callback) {
      var success = function(success) {
        callback(true, success);
      };
      var error = function(error) {
        callback(false, error);
      };

      cordova.plugins.barcodeScanner.encode(
        cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,
        information,
        success,
        error
      );
    }
  },
  getDeviceId: function () {
    return device.uuid;
  },
  getDeviceInfo: function() {
    return device;
  }
};

$(document).trigger('FlashBuy.util.ready');
