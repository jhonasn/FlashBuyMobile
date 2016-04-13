/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.testeConexao = {
    init: function () {
        console.log('testeConexao init');
        document.addEventListener("online", FlashBuy.util.onInternet, false);
        document.addEventListener("offline", FlashBuy.util.onInternet, false);
    },
    ready: function () {
        console.log('testeConexao ready');

        $("#btTestarTipoConexao").click(function () {
            alert(FlashBuy.util.tipoInternet());
        });

        $("#btTestarConexao").click(function () {
            alert(FlashBuy.util.conectadoInternet());
        });
    }
};