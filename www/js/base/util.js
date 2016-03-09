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
  }
};

$(document).trigger('FlashBuy.util.ready');
