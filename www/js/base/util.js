//utilidades variadas que podem ser reutilizadas em todo o projeto
FlashBuyMobile.util = {
  isDevice: function () {
    return document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
  },
  onDeviceReady: function(callback) {
    if(FlashBuyMobile.util.isDevice()) {
      $(document).on('deviceready', callback);
    } else {
      $(document).ready(callback);
    }
  }
};
