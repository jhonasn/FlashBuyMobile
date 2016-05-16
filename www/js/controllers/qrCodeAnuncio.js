/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.qrCodeAnuncio = {
    init: function (idCompra) {
        jQuery("#qrcode").empty();

        FlashBuy.util.gerarQRCode(idCompra, "qrcode");
        jQuery('#codigoLegivel').append(idCompra);
    }
};
