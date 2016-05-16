/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.listaAnunciosAdquiridos = {
    init: function () {
        //método para fazer a listagem, pegando id do usuário logado
        FlashBuy.listaAnunciosAdquiridos.carregarAnuncios(FlashBuy.util.getUsuario()[0].IdCliente);
    },
    //metodo para comunicar com o web service
    carregarAnuncios: function (cb, idCliente) {
        FlashBuy.loading(true);
        jQuery.get('http://189.16.45.2/flashbuywebapi/api/Compras/GetComprasCliente?idCliente=' + idCliente)
        .success(function (data) {
            FlashBuy.loading(false);
            var htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosAdquiridosTemplate.html');

            data.forEach(function (model) {
                //valida se tem imagem
                if (model.imgMime === null) {
                    model.imgMime = "../img/semImagem.png";
                }

                model.oferta = JSON.stringify(model);

                var htmlRenderizado = FlashBuy.util.templateHtml(htmlTemplate, model);
                jQuery('#divOferta').append(htmlRenderizado);
            });
            FlashBuy.util.configurarRotasControllers();
        })
        .error(function () {
            FlashBuy.loading(false);
            console.error(arguments);
        });
    }
};
