/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

//temporário



FlashBuy.listaAnuncios = {
    init: function () {
        console.log('listaAnuncios init');

       
    },
    ready: function () {
        console.log('listaAnuncios ready');

        //método de chamar a lista de anúncios
        FlashBuy.util.getListaAnuncios();
    }
};
