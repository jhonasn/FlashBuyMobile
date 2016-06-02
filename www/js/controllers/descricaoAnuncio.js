/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (oferta) {
        oferta = JSON.parse(oferta);
        var timerDataInicio = oferta.DataInicio;
        oferta.DataInicio = FlashBuy.util.tempo.formatarDataHora(new Date(oferta.DataInicio));
        oferta.DataFim = FlashBuy.util.tempo.formatarDataHora(new Date(oferta.DataFim));

        FlashBuy.loading(true);

        var usuario = FlashBuy.util.getUsuario();
        var dados = {
            idOferta: oferta.IdOferta,
            idCliente: usuario.IdCliente
        };
        dados = jQuery.param(dados);

        jQuery.post(
            'http://189.16.45.2/flashbuywebapi/api/Compras/PostGeraCompra?' +
            dados
        )
        .success(function (idCompra) {
            FlashBuy.loading(false);
            oferta.idCompra = idCompra;
            FlashBuy.descricaoAnuncio.mostrar(oferta);
            FlashBuy.util.tempo.contagemRegressiva(new Date(timerDataInicio), "timer", true);
        })
        .error(function (err) {
            FlashBuy.loading(false);
            Materialize.toast('Há algo de errado com sua conexão... 😔', 3000, 'rounded');
            FlashBuy.erroAjax();
            console.error(err);
        });
    },
    mostrar: function (oferta) {
        var templateHtml = FlashBuy.util.templateUrl(
            'views/descricaoAnuncio.html',
            oferta
        );

        jQuery('#content').empty();
        jQuery('#content').html(templateHtml);
        jQuery('.carousel').carousel();

        FlashBuy.util.configurarRotasControllers();
    }
};
