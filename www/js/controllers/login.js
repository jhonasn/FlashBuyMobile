/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.login = {
    init: function () {
        console.log('login init');
    },
    ready: function () { 
        if (true) {
            Materialize.toast('Você está conectado.', 3000, 'rounded');
            //simulando um device ID
            var deviceId = FlashBuy.util.criptografarMD5('escrevi_e_saí_correndo');
            $.post('http://189.16.45.2/flashbuywebapi/api/Clientes/PostLogin?IMEI='+ deviceId + '?nome=' + 'joão')
                .success(function (data) {
                    console.log(data);
                })
                .error(function () {
                    console.error(arguments);
                });
        }
        // O código abaixo é para devices. Como ainda estou testando no navegador, deixarei comentado.
        //if (FlashBuy.util.conectadoInternet()) {
        //    Materialize.toast('Você está conectado.', 3000, 'rounded');
        //    var deviceId = FlashBuy.util.criptografarMD5(FlashBuy.util.getDeviceId());
        //    $.get('http://189.16.45.2/flashbuywebapi/api/Clientes/PostLogin?IMEI=' + deviceId)
        //    .success(function (data) {
        //        console.info('proxy ok!');
        //    })
        //    .error(function () {
        //        console.error(arguments);
        //    });

        //}
        else
        {
            Materialize.toast('Você está desconectado.', 3000, 'rounded');
        }
        //console.log('login ready ' + deviceId );
        console.log('login ready');
    }
};