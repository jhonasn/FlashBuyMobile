/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (idOferta, DataInicio, DataFim, produto, idAnunciante) {
        console.log('descricaoAnuncio init');

        var stringQrCode = String(idOferta);
        //chamada do qrCode
        FlashBuy.descricaoAnuncio.gerarQrCode(stringQrCode, 'qrcode');

        //jogando as informações na tela, podemos implementar um template depois
        $("#descricaoOferta").append("<p> idOferta: " + idOferta + "</p>");
        $("#descricaoOferta").append("<p> produto: " + produto + "</p>");
        $("#descricaoOferta").append("<p> dataInicio: " + DataInicio + "</p>");
        $("#descricaoOferta").append("<p> dataFim: " + DataFim + "</p>");
        $("#descricaoOferta").append("<p> idAnunciante: " + idAnunciante + "</p>");
    },
    ready: function () {
        console.log('descricaoAnuncio ready');
    },
    gerarQrCode: function (string, divId) {
        FlashBuy.util.gerarQRCode(string, divId);
    }
};