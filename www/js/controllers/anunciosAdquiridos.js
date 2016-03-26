/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.anunciosAdquiridos = {
    init: function () {
        console.log('anunciosAdquiridos init');
    },
    ready: function () {
        console.log('anunciosAdquiridos ready');

        //método de chamar a lista de anúncios fake
        FlashBuy.util.getListaAnuncios();
    }
};

