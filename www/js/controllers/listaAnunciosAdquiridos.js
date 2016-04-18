/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.listaAnunciosAdquiridos = {
    init: function () {

        //método para fazer a listagem, por enquanto passando direto o idCliente =1
        FlashBuy.listaAnunciosAdquiridos.carregarAnuncios(function () {
            FlashBuy.util.configurarRotasControllers();
        }, 1);

        console.log('listaAnunciosAdquiridos init');
    },
    ready: function () {
        console.log('listaAnunciosAdquiridos ready');

    },
    //metodo para comunicar com o web service
    carregarAnuncios: function (cb, idCliente) {
        idCliente = 1001;
        $.get('http://189.16.45.2/flashbuywebapi/api/Compras/GetComprasCliente?idCliente=' + idCliente)
        .success(function (data) {
            console.info('proxy ok!');
            console.log(data);
            htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosTemplate.html');

            data.forEach(function (model) {
                //valida se tem imagem
                if (model.imgMime === null) {
                    model.imgMime = "../img/semImagem.png";
                }
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

