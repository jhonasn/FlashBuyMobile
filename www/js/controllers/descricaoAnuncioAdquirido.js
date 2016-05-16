/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.descricaoAnuncioAdquirido = {
    init: function (oferta) {
        oferta = JSON.parse(oferta);
        oferta.DataInicio = FlashBuy.util.formatarDataHora(new Date(oferta.DataInicio));
        oferta.DataFim = FlashBuy.util.formatarDataHora(new Date(oferta.DataFim));

        //iniciar carousel
        jQuery(document).ready(function () {
            jQuery('.carousel').carousel();
        });

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
        jQuery("#avaliarOferta").append("<h6>Nos diga o que achou da sua compra</h6>");
        jQuery("#avaliarOferta").append("</div>");
        jQuery("#avaliarOferta").append("<div class='input-field col s12'>");
        jQuery("#avaliarOferta").append("<button class='btn-floating btn-large waves-effect waves-light red'><i class='material-icons'>thumb_down</i></button>");
        jQuery("#avaliarOferta").append("<button class='btn-floating btn-large waves-effect waves-light green'><i class='material-icons'>thumb_up</i></button>");

        FlashBuy.util.configurarRotasControllers();
    }
};
