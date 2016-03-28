/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />

//utilidades variadas que podem ser reutilizadas em todo o projeto
FlashBuy.util = {
    isDevice: function () {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    },
    onDeviceReady: function (callback) {
        if (FlashBuy.util.isDevice()) {
            $(document).on('deviceready', callback);
        } else {
            $(document).ready(callback);
        }
    },
    gerarQRCode: function (string, divId) {
        var qrcode = new QRCode(divId, {
                text: string,
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
    },
    getDeviceId: function () {
        return device.uuid;
    },
    getDeviceInfo: function () {
        return device;
    },
    //criptografa o texto em MD5
    criptografarMD5: function (texto) {
        return md5(texto);
    },

    getListaAnuncios: function (cb) {
        //metodo para carregar o json listaAnunciosFake
        $.getJSON('data/listaAnunciosFake.json', function (listaDeAnuncios) {
            $.each(listaDeAnuncios.anunciosFake, function (index, oferta) {
                $("#divOfertas").append(
                    "<div class='oferta'>"+
                        "<div class='col s12 m7'>" +
                            "<div class='card small'>" +
                            "<!-- Imagem do card, por enquanto vou deixar sem -->" +
                                "<div class='card-image'>" +
                                    "<img src='../img/semImagem.png'>" +
                                    "<span class='card-title'>" + oferta.Produto + "</span>" +
                                "</div>" +
                                "<div class='card-content'>" +
                                    "<p>" + oferta.Descricao + "</p>" +
                                "</div>" +
                                "<div class='card-action'>" +
                                    "<button type='button' data-controller='descricaoAnuncio' data-teste='1' data-outro='outro'>Abrir Oferta</button>" +                                
                                    "<a href='#'>Recusar</a>" +
                                "</div>" +
                            "</div>" +
                        "</div>"+
                    '</div>');
            });

            if (cb) {
                cb();
            }
        });
    },

    getHtml: function (url) {
        var html;
        var err;
        $.ajax({
            url: url,
            async: false
        })
        .success(function (data) {
            html = data;
        })
        .error(function (err, code) {
            err = err;
        });

        if (err) {
            throw new Error('Não foi possivel encontrar a página ' + url + '. Dados Técnicos: \n' + JSON.stringify(err));
        }

        return html;
    },
    templateUrl: function (url, model) {
        var html = FlashBuy.util.getHtml(url);

        return FlashBuy.util.templateHtml(html, model);
    },
    templateHtml: function (html, model) {
        if (model) {
            for (var key in model) {
                var value = model[key];
                var regex = '\\{\\{' + key + '\\}\\}';
                regex = new RegExp(regex, 'g');
                html = html.replace(regex, value);
            }
        }

        return html;
    },
    configurarRotasControllers: function () {
        //configura chamada de telas / rotas dentro da tela carregada
        var $content = $('#content');
        if (FlashBuy.controllers) {
            FlashBuy.controllers.forEach(function (controllerName) {
                var $controllerButton = $content.find('[data-controller="' + controllerName + '"]');
                if ($controllerButton.length) {
                    $controllerButton.on('click', function () {
                        controllerName = $(this).data('controller');

                        FlashBuy.load(controllerName, 'views/' + controllerName + '.html');
                    });
                }
            });
        }
    }
};

$(document).trigger('FlashBuy.util.ready');
