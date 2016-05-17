﻿/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.descricaoAnuncioAdquirido = {
    init: function (oferta) {
        oferta = JSON.parse(oferta);
        oferta.DataInicio = FlashBuy.util.tempo.formatarDataHora(new Date(oferta.DataInicio));
        oferta.DataFim = FlashBuy.util.tempo.formatarDataHora(new Date(oferta.DataFim));

        FlashBuy.descricaoAnuncioAdquirido.mostrar(oferta);
    },
    mostrar: function (oferta) {
        var templateHtml = FlashBuy.util.templateUrl(
            'views/descricaoAnuncioAdquirido.html',
            oferta
        );

        jQuery('#content').empty();
        jQuery('#content').html(templateHtml);
        jQuery('.carousel').carousel();
        FlashBuy.util.configurarRotasControllers();

        //coloca evento de votar caso ainda não votou
        if(!oferta.Votou) {
            jQuery('#like-compra').click(function (e) {
                FlashBuy.descricaoAnuncioAdquirido.votarCompra(oferta.IdCompra, true);
            });

            jQuery('#unlike-compra').click(function (e) {
                FlashBuy.descricaoAnuncioAdquirido.votarCompra(oferta.IdCompra, false);
            });
        } else {
            //bloqueia botões caso já votou
            // jQuery('#like-compra, #unlike-compra').prop('disabled', true);
            jQuery('#like-compra, #unlike-compra').addClass('disabled');
            //mostra mensaginha
            jQuery('#like-compra, #unlike-compra').click(function (e) {
                Materialize.toast(
                    'Voce ja fez sua votacao para essa compra',
                    3000,
                    'rounded'
                );
                FlashBuy.descricaoAnuncioAdquirido.voltarParaListagem();
            });
        }


    },
    votarCompra: function (idCompra, voto) {
        var dados = {
            idCompra: idCompra,
            voto: voto
        };
        dados = jQuery.param(dados);

        jQuery.post(
            'http://189.16.45.2/flashbuywebapi/api/Clientes/PostVotaAnunciante?' +
            dados
        )
        .success(function (ok) {
            FlashBuy.loading(false);

            if(ok) {
                Materialize.toast(
                    'Obrigado pela sua avaliação!',
                    3000,
                    'rounded'
                );
                FlashBuy.descricaoAnuncioAdquirido.voltarParaListagem();
            } else {
                Materialize.toast('Não foi possível completar sua requisição', 3000, 'rounded');
            }
        })
        .error(function (err) {
            FlashBuy.loading(false);
            FlashBuy.erroAjax();
            console.error(err);
        });
    },
    voltarParaListagem: function () {
        FlashBuy.load(
            'listaAnunciosAdquiridos',
            'views/listaAnunciosAdquiridos.html'
        );
    }
};
