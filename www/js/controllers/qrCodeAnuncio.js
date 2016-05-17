/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.qrCodeAnuncio = {
    init: function (idCompra) {
        jQuery("#qrcode").empty();

        var dados = {
            idCompra: idCompra
        };
        dados = jQuery.param(dados);

        FlashBuy.loading(true);
        jQuery.post(
            'http://189.16.45.2/flashbuywebapi/api/Compras/PostCheckarCompra?' +
            dados
        )
        .success(function (ok) {
            FlashBuy.loading(false);

            if(ok) {
                FlashBuy.util.gerarQRCode(idCompra, "qrcode");
                jQuery('#codigoLegivel').append(idCompra);
            } else {
                Materialize.toast('Não foi possível completar sua compra', 3000, 'rounded');
            }
        })
        .error(function (err) {
            FlashBuy.loading(false);
            FlashBuy.erroAjax();
            console.error(err);
        });
    }
};
