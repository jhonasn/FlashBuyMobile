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
        jQuery(document).on('FlashBuy.util.ready', function () {
            //executa o deviceReady de FlashBuy
            FlashBuy.util.onDeviceReady(FlashBuy.deviceReady);
        });
        //executa o ready de FlashBuy
        jQuery(document).ready(FlashBuy.ready);
    },

    //executa ações que necessitam ser executadas após o celular terminar de carregar o aplicativo
    deviceReady: function () {
    },

    //executa ações que necessitam ser executadas após os elementos html da pagina serem carregados
    ready: function () {
        //inicializa o menu
        jQuery('.button-collapse').sideNav();
        //liga os botões de menu as rotas das controllers/telas
        FlashBuy.bindEventsRedirections();
        //carrega primeira tela: login se existir, se não carrega a home
        //Estou negando a expressão abaixo para que eu possa trabalhar no login sem atrapalhar vocês :3
        if (FlashBuy.login) {
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
        } else if (link.indexOf(controller) === -1) {
            throw new Error('Erro de redirecionamento, controller e link não correspondem.');
        }

        var $content = jQuery('#content');

        //carrega tela e dispara metodos da controller
        $content.load(link, function () {
            if (FlashBuy[controller].init) {
                if (params && Array.isArray(params) && params.length > 0) {
                    FlashBuy[controller].init.apply(FlashBuy[controller], params);
                } else {
                    FlashBuy[controller].init();
                }
            }

            jQuery('#content').ready(function () {
                //chama a função ready da controller
                if (FlashBuy[controller].ready) {
                    FlashBuy[controller].ready();
                }
            });
        });

        //esconde o menu
        jQuery('.button-collapse').sideNav('hide');
    },

    //configura a chamada de telas / rotas
    bindEventsRedirections: function () {
        jQuery.getJSON('data/configuration.json')
        .success(function (configuration) {
            if (!configuration) {
                throw new Error("Erro ao iniciar aplicação. Configuração da aplicação inválida.");
            } else if (!configuration.controllers) {
                throw new Error("Erro ao iniciar aplicação. Não foi possível encontrar as configurações de controllers.");
            }

            FlashBuy.controllers = configuration.controllers;

            for (var i = 0; i < configuration.controllers.length; i++) {
                var controllerName = configuration.controllers[i];

                jQuery('[data-controller="' + controllerName + '"]').on('click', function () {
                    controllerName = jQuery(this).data('controller');
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
            jQuery('#main-loading').show();
        } else {
            jQuery('#main-loading').hide();
        }
    },

    erroAjax: function (err) {
        //Analisa o erro de Ajax e informa o devido tratamento
        switch (err.status) {
            case 404: {
           //     Materialize.toast('Não encontramos registros na nossa base 💩',3000,'rounded');
                break;
            }
            default: {
             //em   Materialize.toast('Há algo de errado com sua conexão... 😔', 3000, 'rounded');
                break;
            }
        }
    },

    //DEFINIÇÃO DE KEYS PARA LOCALSTORAGE
    //Representa a Key utilizada para buscar o cliente logado
    Cliente: 'flashBuyCliente',
    //Representa a Key utilizada para buscar as compras do Cliente
    Compras: 'flashBuyCompras',
    //Representa a Key utilizada para buscar as notificações agendadas do cliente
    Notificacoes: 'flashBuyNotificacoesAgendadas-',
    //Serve para guardar ID da última notificação agendada
    idUltimaNotificacao: 'flashBuyIdUltimaNotificacao'
};

//inicializa aplicação
var jQuery = jQuery.noConflict();
FlashBuy.init();
