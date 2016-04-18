/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.descricaoAnuncioAdquirido = {
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
        $("#avaliarOferta").append("<h6>Nos diga o que achou da sua compra</h6>");
        $("#avaliarOferta").append("</div>");
        $("#avaliarOferta").append("<div class='input-field col s12'>");
        $("#avaliarOferta").append("<button class='btn-floating btn-large waves-effect waves-light red'><i class='material-icons'>thumb_down</i></button>");
        $("#avaliarOferta").append("<button class='btn-floating btn-large waves-effect waves-light green'><i class='material-icons'>thumb_up</i></button>");        

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