/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (idOferta, descricaoOferta) {
        console.log('idOferta: ' + idOferta + ', descricaoOferta: ' + descricaoOferta);

        //testando os valores capturados do controller listaAnuncios
        $("#txtId").text(idOferta);
        $("#txtdescricaoOferta").text(descricaoOferta);

        console.log('descricaoAnuncio init');
    },
    ready: function () {
        console.log('descricaoAnuncio ready');
    }
};
