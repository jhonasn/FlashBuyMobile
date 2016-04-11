/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.qrCodeAnuncio = {
    init: function (qrcode) {
        console.log('qrCode: ' + qrcode);

        $("#qrcode").empty();
        FlashBuy.util.gerarQRCode(qrcode, "qrcode");

        console.log('qrCodeAnuncio init');
    },
    ready: function () {
        console.log('qrCodeAnuncio ready');
    }
};
