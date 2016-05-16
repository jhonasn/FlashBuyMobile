/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.testeConexao = {
    init: function () {
        document.addEventListener("online", FlashBuy.util.onInternet, false);
        document.addEventListener("offline", FlashBuy.util.onInternet, false);
    },
    ready: function () {
        jQuery("#btTestarTipoConexao").click(function () {
            alert(FlashBuy.util.tipoInternet());
        });

        jQuery("#btTestarConexao").click(function () {
            alert(FlashBuy.util.conectadoInternet());
        });
    }
};
