/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (idOferta) {
        console.log('idOferta: ' + idOferta);
        //chamada do método
        FlashBuy.descricaoAnuncio.getListaAnuncios(idOferta);
        console.log('descricaoAnuncio init');
    },
    ready: function () {
        console.log('descricaoAnuncio ready');
    },
    //metodo para carregar a oferta através do id,
    //para fim de testes apenas, logo implementaremos via web service.
    getListaAnuncios: function (idOferta) {
        $.getJSON('data/listaAnunciosFake.json', function (listaDeAnuncios) {
            $.each(listaDeAnuncios.anunciosFake, function (index, oferta) {
                if (idOferta === oferta.IdOferta) {
                    $("#descricaoOferta").append("<p> id: " + oferta.IdOferta + "</p>");
                    $("#descricaoOferta").append("<p> descricao: " + oferta.Descricao + "</p>");
                    $("#descricaoOferta").append("<p> local: " + oferta.LocalOferta + "</p>");

                    //chamada do qrCode
                    FlashBuy.descricaoAnuncio.gerarQrCode(oferta.Produto, 'qrcode');
                }
            });
        });
    },
    gerarQrCode: function (string, divId) {
        FlashBuy.util.gerarQRCode(string, divId);
    }
};
