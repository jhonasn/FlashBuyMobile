/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.listaAnunciosAdquiridos = {
    init: function () {

        //método para fazer a listagem, pegando id do usuário logado
        FlashBuy.listaAnunciosAdquiridos.carregarAnuncios(function () {
            FlashBuy.util.configurarRotasControllers();
        }, FlashBuy.util.getUsuario()[0].IdCliente);

        console.log('listaAnunciosAdquiridos init');
    },
    ready: function () {
        console.log('listaAnunciosAdquiridos ready');

    },
    //metodo para comunicar com o web service
    carregarAnuncios: function (cb, idCliente) {      
        $.get('http://189.16.45.2/flashbuywebapi/api/Compras/GetComprasCliente?idCliente=' + idCliente)
        .success(function (data) {
            console.info('proxy ok!');
            console.log(data);
            htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosAdquiridosTemplate.html');

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

