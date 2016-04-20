/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.login = {
    init: function () {
        console.log('login init');
    },
    ready: function () {
        var deviceId = FlashBuy.util.criptografarMD5(FlashBuy.util.getDeviceId());
        if (FlashBuy.util.conectadoInternet()) {
            alert(deviceId);
        }
        else
        {
            Materialize.toast('Você está desconectado.', 3000, 'rounded');
        }
        console.log('login ready');
    }
};