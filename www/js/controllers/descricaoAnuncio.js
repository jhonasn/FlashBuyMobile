/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (idOferta, DataInicio, DataFim, produto, idAnunciante, imgMime) {
        //iniciar carousel
        $(document).ready(function () {
            $('.carousel').carousel();
        });

        // colocar imagem
        $("#divImagem").append("<img src=" + imgMime + " />");
        
        //jogando as informações na tela, podemos implementar um template depois
        $("#descricaoOferta").append("<div class='row'>");
        $("#descricaoOferta").append("<div class='col s12 m7'>");
        $("#descricaoOferta").append("<blockquote> produto: " + produto + "</blockquote>");
        $("#descricaoOferta").append("<blockquote> dataInicio: " + DataInicio + "</blockquote>");
        $("#descricaoOferta").append("<blockquote> dataFim: " + DataFim + "</blockquote>");
        //$("#descricaoOferta").append("<blockquote> idAnunciante: " + idAnunciante + "</blockquote>");
        $("#descricaoOferta").append("</div>");
        $("#descricaoOferta").append("</div>");

        //area dos botões
        $("#descricaoOferta").append("<div class='row'>");
        $("#descricaoOferta").append("<button type='button' class='waves-effect waves-light btn' data-controller='qrCodeAnuncio' data-qrcode='" + idOferta + "'>Eu quero</button>");
        $("#descricaoOferta").append("</div>");

        FlashBuy.util.configurarRotasControllers();

        console.log('descricaoAnuncio init');
    },
    ready: function () {
        console.log('descricaoAnuncio ready');
    },
    gerarQrCode: function (string, divId) {
        //configuração das rotas do controller

    }
};