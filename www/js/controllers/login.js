﻿ /// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.login = {
    deviceKey: null,

    ready: function() {
        FlashBuy.loading(true);
        //pega o deviceKey
        FlashBuy.login.pushRegistrarDispositivoFake();
        //Tenta buscar login salvo
        if (FlashBuy.util.getUsuario()) {
            //Caso esteja logado, redireciona para a HOME
            FlashBuy.load('home', 'views/home.html');
        } else {
            //Caso não esteja logado, mostra tela de login
            Materialize.toast('Nos informe seu nome para completar o cadastro', 3000);
            //Cria evento para quando clicar no botão de login
            jQuery("#btNome").click(FlashBuy.login.logar);
        }
        FlashBuy.loading(false);
    },

    pushRegistrarDispositivoFake: function() {
        var preposicao = null;
        if (FlashBuy.util.isDevice()) {
            preposicao = 'mobile-';
        } else {
            preposicao = 'pc-';
        }

        FlashBuy.login.deviceKey = md5(
            preposicao +
            Math.random().toString().split('.')[1]
        );
    },

    pushRegistrarDispositivo: function() {
        var pushOptions = {
            android: {
                senderID: "12345679"
            },
            ios: {
                alert: "true",
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        var push = PushNotification.init(pushOptions);

        push.on('registration', function(data) {
            FlashBuy.login.deviceKey = data.registrationId;
        });

        push.on('notification', function(data) {
            // console.log(data.message);
            // console.log(data.title);
            // console.log(data.count);
            // console.log(data.sound);
            // console.log(data.image);
            // console.log(data.additionalData);

            alert('Notificação recebida - '
                .concat(data.title)
                .concat('\n\n')
                .concat(data.message)
            );
        });

        push.on('error', function(e) {
            console.error('erro: ' + e.message);
            Materialize.toast('Há algo de errado com sua conexão... 😔', 3000, 'rounded');
        });
    },

    logar: function(e) {
        FlashBuy.loading(true);
        //SETA O VALOR DA VARIAVEL 'NOME' COM O CONTEÚDO DO INPUT
        var nome = jQuery("#inputNome").val();
        var imei;
        //VERIFICA SE ESTAMOS UTILIZANDO UM SMARTPHONE OU ESTAMOS SIMULANDO NO NAVEGADOR
        if (FlashBuy.util.isDevice()) {
            //CASO ESTEJA SENDO USADO EM UM DEVICE, PEGA O IMEI E CRIPTOGRAFA
            imei = FlashBuy.util.criptografarMD5(
                FlashBuy.util.getDeviceId()
            );
        } else {
            //SENÃO SIMULAMOS UM VALOR QUALQUER
            imei = FlashBuy.util.criptografarMD5(
                'pc-' +
                Math.random().toString().split('.')[1]
            );
        }

        //prepara dados para login no servidor
        var dados = {
            IMEI: imei,
            nome: nome,
            deviceKey: FlashBuy.login.deviceKey
        };

        dados = jQuery.param(dados);

        //TENTA CADASTRAR O CLIENTE
        jQuery.post(
            'http://189.16.45.2/flashbuywebapi/api/Clientes/PostLogin?' +
            dados
        )
            .success(function(data) {
                FlashBuy.loading(false);
                //SE CONSEGUIR, SALVA O CLIENTE NA LOCALSTORAGE E REDIRECIONA PARA A HOME
                if(Array.isArray(data) && data.length > 0) {
                    data = data[0];
                }
                localStorage.setItem(FlashBuy.Cliente, JSON.stringify(data));
                console.log('Usuário cadastrado com sucesso. Redirecionando para home');
                FlashBuy.load('home', 'views/home.html');
            }).error(function(erro) {
                FlashBuy.loading(false);
                //CASO CONTRÁRIO, MOSTRA TOAST REDONDO E CRIA UM LOG DE ERRO
                console.error('Ocorreu algum erro: ' + erro);
                if (FlashBuy.util.isDevice()) {
                    if (!FlashBuy.util.conectadoInternet()) {
                        Materialize.toast('Há algo de errado com sua conexão... 😔', 3000, 'rounded');
                    } else {
                        Materialize.toast('Que estranho.. algo sobrenatural aconteceu aqui, é melhor chamar o agente Mulder.', 3000, 'rounded');
                    }
                }
                Materialize.toast('Que feio servidor você não pode fazer isso, tente novamente mais tarde 😔', 3000, 'rounded');
            });
    }
};
