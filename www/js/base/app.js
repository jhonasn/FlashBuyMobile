//Modulo principal, podemos adicionar aqui regras de negócio que podem ser reutilizadas em outras telas
var FlashBuyMobile = {
  init: function () {
    FlashBuyMobile.bindEvents();
  },
  bindEvents: function () {
    $('#teste').on('click', function () {
      FlashBuyMobile.load('/views/teste.html');
    });
  },
  load: function(link) {
    $('#content').load(link);
    $('.button-collapse').sideNav('hide');
  }
};

FlashBuyMobile.init();
