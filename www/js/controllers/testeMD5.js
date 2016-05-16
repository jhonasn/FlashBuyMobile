/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.testeMD5 = {
    init: function () {
        var $txtString = jQuery("#txtString");
        var $txtResultado = jQuery("#txtResultado");
        var $textoMD5;

        //apenas um teste com a biblioteca
        jQuery("#btnCalcular").click(function () {
            $textoMD5 = FlashBuy.util.criptografarMD5($txtString.val());
            $txtResultado.val($textoMD5);
        });

    },
    ready: function () {
        //teste 1
        var model = {
            titulo: 'Teste de Template',
            descricao: 'Descrição de teste que se repete'
        };

        var htmlTemplate = FlashBuy.util.templateUrl('views/testeMD5template.html', model);

        jQuery('#teste-template-1').append(htmlTemplate);

        //teste 2
        var models = [
            {
                titulo: 'Teste de Template 2, titulo 1',
                descricao: 'Descrição de teste que se repete do teste 2/1'
            },
            {
                titulo: 'Teste de Template, titulo 2',
                descricao: 'Descrição de teste que se repete do teste 2/2'
            },
            {
                titulo: 'Teste de Template, titulo 3',
                descricao: 'Descrição de teste que se repete do teste 2/3'
            }
        ];

        htmlTemplate = FlashBuy.util.getHtml('views/testeMD5template.html');

        models.forEach(function (model) {
            var htmlRenderizado = FlashBuy.util.templateHtml(htmlTemplate, model);
            jQuery('#teste-template-2').append(htmlRenderizado);
        });

        //teste proxy
        jQuery.get('http://189.16.45.2/flashbuywebapi/api/Ofertas/GetOferta')
        .success(function (data) {
            console.info('proxy ok!');
            console.log(data);
        })
        .error(function () {
            console.error(arguments);
        });

    }
};
