/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.listaAnuncios = {
    init: function () {
        //método para fazer a listagem
        FlashBuy.listaAnuncios.carregarAnuncios();
    },
    //metodo para comunicar com o web service.
    carregarAnuncios: function () {
        FlashBuy.loading(true);
        jQuery.get('http://189.16.45.2/flashbuywebapi/api/Ofertas/GetOferta')
        .success(function (data) {
            FlashBuy.loading(false);
            var htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosTemplate.html');

            data.forEach(function (model) {
                //Valida se tem imagem
                if (model.imgMime === null) {
                    model.imgMime = "img/semImagem.png";
                }

                model.oferta = JSON.stringify(model);

                var htmlRenderizado = FlashBuy.util.templateHtml(htmlTemplate, model);

                jQuery('#divOferta').append(htmlRenderizado);
            });
            FlashBuy.util.configurarRotasControllers();
        })
        .error(function () {
            FlashBuy.loading(false);
            FlashBuy.erroAjax();
            console.error(arguments);
        });
    }
};
