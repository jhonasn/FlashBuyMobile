//Modulo principal, podemos adicionar aqui regras de negócio que podem ser reutilizadas em outras telas
var FlashBuy = {
  //construtor
  init: function() {
    FlashBuy.bindEvents();
  },
  // faz ligação de escutadores de eventos 'Event Listeners'
  // Liga quaisquer eventos requeridos na inicialização. Exemplos de eventos comuns são:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    //espera carregar util
    $(document).on('FlashBuy.util.ready', function () {
      //executa o deviceReady de FlashBuy
      FlashBuy.util.onDeviceReady(FlashBuy.deviceReady);
    });
    //executa o ready de FlashBuy
    $(document).ready(FlashBuy.ready);
  },
  //executa ações que necessitam ser executadas após o celular terminar de carregar o aplicativo
  deviceReady: function() {
  },
  //executa ações que necessitam ser executadas após os elementos html da pagina serem carregados
  ready: function () {
    $('.button-collapse').sideNav();
    FlashBuy.bindEventsRedirections();
    //carrega primeira tela: home
    FlashBuy.load('home', 'views/home.html');
  },
  load: function(controller, link) {
    if(!controller || !link) {
      throw new Error('Erro de redirecionamento, controller ou link nao foram passados para FlashBuy.load().');
    }

    $('#content').load(link, function() {
      if(FlashBuy[controller].init) {
        FlashBuy[controller].init();
      }
      $('#content').ready(function() {
        if(FlashBuy[controller].ready) {
          FlashBuy[controller].ready();
        }
      });
    });
    $('.button-collapse').sideNav('hide');
  },
  bindEventsRedirections: function() {
    $('#home').on('click', function() {
      FlashBuy.load('home', 'views/home.html');
    });
    $('#teste').on('click', function() {
      FlashBuy.load('teste', 'views/teste.html');
    });
  }
};

FlashBuy.init();
