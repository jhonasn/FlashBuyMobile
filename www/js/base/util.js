/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />

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
    gerarQRCode: function (texto, divId) {
        //Convers�o da vari�vel em string necess�ria, se nao tiver, o qrCode nao funciona
        texto = String(texto);
        var qrcode = new QRCode(divId, {
            text: texto,
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
            throw new Error('N�o foi possivel encontrar a p�gina ' + url + '. Dados T�cnicos: \n' + JSON.stringify(err));
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

    conectadoInternet: function () {
        if (navigator.connection.type != Connection.NONE) {
            return true;
        } else  {
            return false;
        }
    },
    
    onInternet: function (callback) {
        $(document).on('online', function () {
            callback(true);            
        });
        $(document).on('offline', function () {
            callback(false);            
        });
    },

    tipoInternet: function () {
        var connType = navigator.connection.type;
        var retorno = "Conex�o ";
        switch (connType) {
            case Connection.UNKNOWN: {
                retorno += "desconhecida";
                break;
            }
            case Connection.ETHERNET: {
                retorno += "a cabo";
                break;
            }
            case Connection.WIFI: {
                retorno += "WI-FI";
                break;
            }
            case Connection.CELL_2G: {
                retorno += "2G";
                break;
            }
            case Connection.CELL_3G: {
                retorno += "3G";
                break;
            }
            case Connection.CELL_4G: {
                retorno += "4G";
                break;
            }
            case Connection.CELL: {
                retorno += "de dados celulares";
                break;
            }
            case Connection.NONE: {
                retorno += "inexistente";
                break;
            }
            default: {
                retorno: "Houve um problema ao identificar sua conex�o. Tente novamente mais tarde.";
                break;
            }
        }
        return retorno + ".";
    },

    configurarRotasControllers: function () {
        //configura chamada de controllers / rotas dentro da view atual
        var $content = $('#content');
        if (FlashBuy.controllers) {
            FlashBuy.controllers.forEach(function (controllerName) {
                var $controllerButton = $content.find('[data-controller="' + controllerName + '"]');
                if ($controllerButton.length) {
                    $controllerButton.on('click', function () {
                        controllerName = $(this).data('controller');

                        //carregamento de parametros para a controller
                        var paramsButton = $(this).data();
                        var initParamsNames = getParamNames(FlashBuy[controllerName].init);
                        var params = [];

                        initParamsNames.forEach(function (paramName) {
                            var paramValue = paramsButton[paramName.toLowerCase()];
                            if (paramValue) {
                                params.push(paramValue);
                            }
                        });

                        FlashBuy.load(controllerName, 'views/' + controllerName + '.html', params);
                    });
                }
            });
        }
    }
};

$(document).trigger('FlashBuy.util.ready');
