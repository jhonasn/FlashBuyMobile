/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (oferta) {
        oferta = JSON.parse(oferta);
        oferta.DataInicio = FlashBuy.util.formatarDataHora(new Date(oferta.DataInicio));
        oferta.DataFim = FlashBuy.util.formatarDataHora(new Date(oferta.DataFim));

        //iniciar carousel
        jQuery(document).ready(function () {
            jQuery('.carousel').carousel();
        });

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
            FlashBuy.descricaoAnuncio.mostrarDescricaoOferta(oferta);
        })
        .error(function (err) {
            FlashBuy.loading(false);
            console.error(err);
        });
    },
    mostrarDescricaoOferta: function (oferta) {
        // colocar imagem
        jQuery("#divImagem").append("<img src=" + oferta.imgMime + " />");

        //jogando as informações na tela, podemos implementar um template depois
        jQuery("#descricaoOferta").append("<div class='row'>");
        jQuery("#descricaoOferta").append("<div class='col s12 m7'>");
        jQuery("#descricaoOferta").append("<blockquote> produto: " + oferta.Produto + "</blockquote>");
        jQuery("#descricaoOferta").append("<blockquote> dataInicio: " + oferta.DataInicio + "</blockquote>");
        jQuery("#descricaoOferta").append("<blockquote> dataFim: " + oferta.DataFim + "</blockquote>");
        //jQuery("#descricaoOferta").append("<blockquote> idAnunciante: " + idAnunciante + "</blockquote>");
        jQuery("#descricaoOferta").append("</div>");
        jQuery("#descricaoOferta").append("</div>");

        //area dos botões
        jQuery("#descricaoOferta").append("<div class='row'>");
        jQuery("#descricaoOferta").append("<button type='button' class='waves-effect waves-light btn' data-controller='qrCodeAnuncio' data-idCompra='" + oferta.idCompra + "'>Eu quero</button>");
        jQuery("#descricaoOferta").append("</div>");

        FlashBuy.util.configurarRotasControllers();
    }
};
