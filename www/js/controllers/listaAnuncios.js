/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.listaAnuncios = {
    init: function () {
        //método de chamar a lista de anúncios fake
        FlashBuy.listaAnuncios.carregarAnuncios(function () {
            FlashBuy.util.configurarRotasControllers();
        });
        console.log('listaAnuncios init');
    },
    ready: function () {
        console.log('listaAnuncios ready');
    },    
    //metodo para carregar o json listaAnunciosFake
    carregarAnuncios: function (cb) {       
        $.get('http://189.16.45.2/flashbuywebapi/api/Ofertas/GetOferta')
        .success(function (data) {
            console.info('proxy ok!');
            //console.log(data);
            htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosTemplate.html');

            data.forEach(function (model) {
                var htmlRenderizado = FlashBuy.util.templateHtml(htmlTemplate, model);
                $('#divOferta').append(htmlRenderizado);
            });

            if (cb) {
                cb();
            }
        })
        .error(function () {
            console.error(arguments);
        });
    }
};
