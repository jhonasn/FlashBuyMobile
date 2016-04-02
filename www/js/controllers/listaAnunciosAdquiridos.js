﻿/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

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
        $.get('http://www.flashbuy.com.br/api/Compras/GetComprasCliente?idCliente=' + idCliente)
        .success(function (data) {
            console.info('proxy ok!');
            console.log(data);
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
