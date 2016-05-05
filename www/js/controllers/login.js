/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.login = {
    init: function () {
        console.log('login init');
    },
    ready: function () {

        //Tenta buscar login salvo
        if (FlashBuy.util.getUsuario()) {
            //Caso esteja logado, redireciona para a HOME
            console.log('Usuário logado, redirecionando para a home.');
            FlashBuy.load('home', 'views/home.html');
        } else {
            //Caso não esteja logado, mostra tela de login
            Materialize.toast('Nos informe seu nome para completar o cadastro', 3000);
            //Cria evento para quando clicar no botão de login
            $("#btNome").click(function () {
                var deviceId;
                //VERIFICA SE ESTAMOS UTILIZANDO UM SMARTPHONE OU ESTAMOS SIMULANDO NO NAVEGADOR
                if (FlashBuy.util.isDevice()) {
                    //CASO ESTEJA SENDO USADO EM UM DEVICE, PEGA O IMEI E CRIPTOGRAFA
                    deviceId = FlashBuy.util.criptografarMD5(FlashBuy.util.getDeviceId());
                } else {
                    //SENÃO SIMULAMOS UM VALOR QUALQUER
                    deviceId = FlashBuy.util.criptografarMD5('JANEIRO');
                }
                //SETA O VALOR DA VARIAVEL 'NOME' COM O CONTEÚDO DO INPUT 
                var nome = $("#inputNome").val();
                //TENTA CADASTRAR O CLIENTE
                $.post('http://189.16.45.2/flashbuywebapi/api/Clientes/PostLogin?IMEI=' + deviceId + '&nome=' + nome)
                    .success(function (data) {
                        //SE CONSEGUIR, SALVA O CLIENTE NA LOCALSTORAGE E REDIRECIONA PARA A HOME
                        localStorage.setItem(FlashBuy.Cliente, JSON.stringify(data));
                        console.log('Usuário cadastrado com sucesso. Redirecionando para home');
                        FlashBuy.load('home', 'views/home.html');
                    }).error(function (erro) {
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
            });
        }
    }
}