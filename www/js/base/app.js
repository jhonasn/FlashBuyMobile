//Modulo principal, podemos adicionar aqui regras de negócio que podem ser reutilizadas em outras telas
var FlashBuyMobile = {
  load: function(link) {
    $('#content').load(link);
    $('.button-collapse').sideNav('hide');
  }
};
