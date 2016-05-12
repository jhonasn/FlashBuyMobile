/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.listaAnuncios = {
    init: function () {
        //método para fazer a listagem
        FlashBuy.listaAnuncios.carregarAnuncios();
    },
    ready: function () {
        console.log('listaAnuncios ready');.
    },
    //metodo para comunicar com o web service
    carregarAnuncios: function () {
        $.get('http://189.16.45.2/flashbuywebapi/api/Ofertas/GetOferta')
        .success(function (data) {
            console.info('proxy ok!');
            console.log(data);
            htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosTemplate.html');

            data.forEach(function (model) {
                //Valida se tem imagem
                if (model.imgMime === null) {
                    model.imgMime = "../img/semImagem.png";
                }

                var htmlRenderizado = FlashBuy.util.templateHtml(htmlTemplate, model);

                $('#divOferta').append(htmlRenderizado);
            });
            FlashBuy.util.configurarRotasControllers();
        })
        .error(function () {
            console.error(arguments);
        });
    }
};