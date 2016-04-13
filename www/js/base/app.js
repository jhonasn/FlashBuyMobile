/// <reference path="../base/base.js" />
/// <reference path="../base/util.js" />

//Modulo principal, podemos adicionar aqui regras de negócio que podem ser reutilizadas em outras telas
var FlashBuy = {
    controllers: null,
    //construtor
    init: function () {
        FlashBuy.bindEvents();
    },
    // faz ligação de escutadores de eventos 'Event Listeners'
    // Liga quaisquer eventos requeridos na inicialização. Exemplos de eventos comuns são:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        //espera carregar util
        $(document).on('FlashBuy.util.ready', function () {
            //executa o deviceReady de FlashBuy
            FlashBuy.util.onDeviceReady(FlashBuy.deviceReady);
        });
        //executa o ready de FlashBuy
        $(document).ready(FlashBuy.ready);
    },
    //executa ações que necessitam ser executadas após o celular terminar de carregar o aplicativo
    deviceReady: function () {
    },
    //executa ações que necessitam ser executadas após os elementos html da pagina serem carregados
    ready: function () {
        //inicializa o menu
        $('.button-collapse').sideNav();
        //liga os botões de menu as rotas das controllers/telas
        FlashBuy.bindEventsRedirections();
        //carrega primeira tela: login se existir, se não carrega a home
        if(FlashBuy.login) {
            FlashBuy.load('login', 'views/login.html');
        } else {
            FlashBuy.load('home', 'views/home.html');
        }
    },
    //carrega telas no elemento principal do app -> #content
    load: function (controller, link, params) {
        //verifica se foi passado o link e controller
        if (!controller || !link) {
            throw new Error('Erro de redirecionamento, controller ou link nao foram passados para FlashBuy.load().');
        } else if (link.indexOf(controller) == -1) {
            throw new Error('Erro de redirecionamento, controller e link não correspondem.');
        }

        var $content = $('#content');

        //carrega tela e dispara metodos da controller
        $content.load(link, function () {
            if (FlashBuy[controller].init) {
                if (params && Array.isArray(params) && params.length > 0) {
                    FlashBuy[controller].init.apply(FlashBuy[controller], params);
                } else {
                    FlashBuy[controller].init();
                }
            }

            $('#content').ready(function () {
                //chama a função ready da controller
                if (FlashBuy[controller].ready) {
                    FlashBuy[controller].ready();
                }
            });
        });

        //esconde o menu
        $('.button-collapse').sideNav('hide');
    },
    //configura a chamada de telas / rotas
    bindEventsRedirections: function () {
        $.getJSON('data/configuration.json')
        .success(function (configuration) {
            if (!configuration) {
                throw new Error("Erro ao iniciar aplicação. Configuração da aplicação inválida.");
            } else if (!configuration.controllers) {
                throw new Error("Erro ao iniciar aplicação. Não foi possível encontrar as configurações de controllers.");
            }

            FlashBuy.controllers = configuration.controllers;

            for (var i = 0; i < configuration.controllers.length; i++) {
                var controllerName = configuration.controllers[i];

                $('[data-controller="' + controllerName + '"]').on('click', function () {
                    controllerName = $(this).data('controller');                    
                    FlashBuy.load(controllerName, 'views/' + controllerName + '.html');
                });
            }
        })
        .error(function (err) {
            throw new Error("Erro ao iniciar aplicação. Não foi possível encontrar o arquivo de configuração.");
        });
    },
    loading: function (show) {
        if (show) {
            $('#main-loading').show();
        } else {
            $('#main-loading').hide();
        }
    }
};

//inicializa aplicação
FlashBuy.init();
