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
    //faz a comunicação com o web service
    getListaAnuncios: function () {
        $.get('http://189.16.45.2/flashbuywebapi/api/Ofertas/GetOferta')
        .success(function (data) {
            console.info('proxy ok!');
            console.log(data);
        })
        .error(function () {
            console.error(arguments);
        });
    },
    //metodo para carregar o json listaAnunciosFake
    carregarAnuncios: function (cb) {
        //COMO CARREGAR DENTRO DA VARIAVEL models O OBJETO data DA FUNCAO getListaAnuncios???
        var models = [
           {
               produto: 'Teste de produto 2, titulo 1',
               idOferta: '001',
               //descricao: 'Descrição de teste que se repete do teste 2/1'
           },
            {
                produto: 'Teste de produto, titulo 2',
                idOferta: '002',
                //descricao: 'Descrição de teste que se repete do teste 2/2'
            },
            {
                produto: 'Teste de produto, titulo 3',
                idOferta: '003',
                //descricao: 'Descrição de teste que se repete do teste 2/3'
            }
        ];

        htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosTemplate.html');

        models.forEach(function (model) {
            var htmlRenderizado = FlashBuy.util.templateHtml(htmlTemplate, model);
            $('#divOferta').append(htmlRenderizado);
        });

        if (cb) {
            cb();
        }
    }
};
