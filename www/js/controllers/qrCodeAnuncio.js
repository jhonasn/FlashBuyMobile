/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.qrCodeAnuncio = {
    init: function (idCompra, adquirido) {
        jQuery("#qrcode").empty();

        if(adquirido) {
            FlashBuy.qrCodeAnuncio.gerar(idCompra, adquirido);
            jQuery('#qr-titulo').text('QR-Code para compra:');
            //encerra
            return;
        }

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
                FlashBuy.qrCodeAnuncio.gerar(idCompra);
                //Salva na store os anuncios adquiridos
                FlashBuy.util.storeAnunciosAdquiridos();
            } else {
                Materialize.toast('Não foi possível completar sua compra.', 3000, 'rounded');
            }
        })
        .error(function (err) {
            FlashBuy.loading(false);
            FlashBuy.erroAjax();
            console.error(err);
        });
    },

    gerar: function (idCompra) {
        FlashBuy.util.gerarQRCode(idCompra, "qrcode");
        jQuery('#codigoLegivel').append(idCompra);
    }
};
