FlashBuyMobile.index = {
  init: function() {
    FlashBuyMobile.index.bindEvents();
  },
  bindEvents: function() {
    FlashBuyMobile.util.onDeviceReady(FlashBuyMobile.index.ready);
  },
  ready: function() {
    $('.button-collapse').sideNav();
    FlashBuyMobile.index.bindEventsRedirections();
  },
  bindEventsRedirections: function () {
    $('#teste').on('click', function () {
      FlashBuyMobile.load('/views/teste.html');
    });
  }
};

FlashBuyMobile.index.init();
