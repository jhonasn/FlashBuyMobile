/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.listaAnunciosAdquiridos = {
    init: function () {
        //método para fazer a listagem, pegando id do usuário logado
        FlashBuy.listaAnunciosAdquiridos.carregarAnuncios();
    },
    //metodo para comunicar com o web service
    carregarAnuncios: function () {
        var compras = JSON.parse(localStorage.getItem(FlashBuy.Compras));
        if (!compras) {
            FlashBuy.util.storeAnunciosAdquiridos();
            compras = JSON.parse(localStorage.getItem(FlashBuy.Compras));
        }
        FlashBuy.listaAnunciosAdquiridos.montarHTMLAnuncios(compras);
    },
    montarHTMLAnuncios: function (compras) {
        FlashBuy.loading(false);
        var htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosAdquiridosTemplate.html');
        //Verifica se há compras antes de aplicar os tratamentos
        if (compras) {
            compras.forEach(function (model) {
                //mapeia oferta na compra
                for (var chave in model.Oferta) {
                    var valor = model.Oferta[chave];
                    model[chave] = valor;
                }
                delete model.Oferta;

                //valida se tem imagem
                if (model.imgMime === null) {
                    model.imgMime = "img/semImagem.png";
                }

                model.oferta = JSON.stringify(model);

                var htmlRenderizado = FlashBuy.util.templateHtml(htmlTemplate, model);
                jQuery('#divOferta').append(htmlRenderizado);
            });
        }
        FlashBuy.util.configurarRotasControllers();
    }
};
