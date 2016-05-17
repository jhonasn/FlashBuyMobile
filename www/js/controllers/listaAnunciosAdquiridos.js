/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.listaAnunciosAdquiridos = {
    init: function () {
        //método para fazer a listagem, pegando id do usuário logado
        var usuario = FlashBuy.util.getUsuario();
        FlashBuy.listaAnunciosAdquiridos.carregarAnuncios(usuario.IdCliente);
    },
    //metodo para comunicar com o web service
    carregarAnuncios: function (idCliente) {
        var dados = {
            idCliente: idCliente
        };
        dados = jQuery.param(dados);
        FlashBuy.loading(true);
        jQuery.get(
            'http://189.16.45.2/flashbuywebapi/api/Compras/GetComprasCliente?' +
            dados
        )
        .success(function (data) {
            FlashBuy.loading(false);
            var htmlTemplate = FlashBuy.util.getHtml('views/listaAnunciosAdquiridosTemplate.html');

            data.forEach(function (model) {
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
            FlashBuy.util.configurarRotasControllers();
        })
        .error(function () {
            FlashBuy.loading(false);
            FlashBuy.erroAjax();
            console.error(arguments);
        });
    }
};
