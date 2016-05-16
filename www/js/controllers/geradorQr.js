/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.geradorQr = {
    init: function (teste, outro) {
        console.log('teste: ' + teste + ', outro: ' + outro);
    },
    ready: function () {
        jQuery("#btGerar").click(function () {
            var string = jQuery("#txtString").val();
            var divId = "qrcode";

            jQuery("#qrcode").empty();
            //new QRCode(document.getElementById("qrcode"), string);
            FlashBuy.util.gerarQRCode(string, divId);
        });
    }
};
