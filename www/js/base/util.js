/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />

//utilidades variadas que podem ser reutilizadas em todo o projeto
FlashBuy.util = {
    isDevice: function () {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    },

    onDeviceReady: function (callback) {
        if (FlashBuy.util.isDevice()) {
            jQuery(document).on('deviceready', callback);
        } else {
            jQuery(document).ready(callback);
        }
    },

    gerarQRCode: function (texto, divId) {
        //Conversao da variavel em string necessaria, se nao tiver, o qrCode nao funciona
        texto = String(texto);
        var tamanhoDiv = jQuery("#" + divId).width();
        var qrcode = new QRCode(divId, {
            text: texto,
            width: tamanhoDiv,
            height: tamanhoDiv,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    },

    obterPushId: function(deviceId) {

    },

    getUsuario: function () {
        var user = localStorage.getItem(FlashBuy.Cliente);
        var retorno;
        if (!user) {
            var imei;
            //VERIFICA SE É UM SMARTPHONE QUE ESTÁ EXECUTANDO O CÓDIGO
            if (FlashBuy.util.isDevice()) {
                //PEGA VALOR DO "IMEI" E CRIPTOGRAFA
                imei = FlashBuy.util.criptografarMD5(FlashBuy.util.getDeviceId());
            }
            else {
                //CASO NÃO SEJA UM SMARTPHONE(OU DEVICES EM GERAL) SIMULA DEVICE ID EXISTENTE NA BASE DE DADOS (EXISTE MESMO, TRATEI DE VERIFICAR ISSO)
                imei = FlashBuy.util.criptografarMD5(
                    'pc-' +
                    Math.random().toString().split('.')[1]
                );
            }

            var dados = {
                IMEI: imei
            };
            dados = jQuery.param(dados);

            //EXECUTA A VERIFICAÇÃO DE SE  HÁ REGISTROS DESSE IMEI NA BASE
            jQuery.ajax({
                type: 'POST',
                async: false,
                url: 'http://189.16.45.2/flashbuywebapi/api/Clientes/PostLogin?' +
                dados,
                success: function (data) {
                    //ANALISA RETORNO
                    if (data.length || data.idCliente) {
                        if(data.length > 0) {
                            data = data[0];
                        }
                        //CASO HAJA ALGUM RETORNO, SALVA OBJETO CLIENTE NA LOCAL STORAGE
                        localStorage.setItem(FlashBuy.Cliente, JSON.stringify(data));
                        retorno = data;
                    }
                    else {
                        //CASO NÃO EXISTA O IMEI NA BASE, O RETORNO RECEBE UM VALOR FALSO/0
                        retorno = 0;
                    }
                },
            });

        }
        else {
            retorno = JSON.parse(user);
        }
        return retorno;
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
        jQuery.ajax({
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
            throw new Error('Nao foi possivel encontrar a pagina ' + url + '. Dados Tecnicos: \n' + JSON.stringify(err));
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
                if(typeof value === 'string') {
                    value = value.replace(/\"/g, '\'');
                }
                var regex = '\\{\\{' + key + '\\}\\}';
                regex = new RegExp(regex, 'g');
                html = html.replace(regex, value);
            }
        }

        return html;
    },

    conectadoInternet: function () {
        if (navigator.connection.type !== Connection.NONE) {
            return true;
        } else {
            return false;
        }
    },

    onInternet: function (callback) {
        jQuery(document).on('online', function () {
            callback(true);
        });
        jQuery(document).on('offline', function () {
            callback(false);
        });
    },

    tipoInternet: function () {
        var connType = navigator.connection.type;
        var retorno = "Conexao ";
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
                    retorno = "Houve um problema ao identificar sua conexao. Tente novamente mais tarde.";
                break;
            }
        }
        return retorno + ".";
    },

    zeroPad: function (n) {
        if(typeof n === 'number') {
            if(n < 10) {
                return '0' + n;
            }
        }

        return n;
    },

    isTipoData: function (data) {
        if(!(data instanceof Date)) {
            throw new Error('O tipo a se formatar não é de data, passar parametro tipo Date');
        }
    },

    formatarData: function (data) {
        FlashBuy.util.isTipoData(data);
        var pad = FlashBuy.util.zeroPad;

        var d = data.getDate();
        var m = data.getMonth() + 1;
        var y = data.getFullYear();

        return pad(d) + '/' + pad(m) + '/' + pad(y);
    },

    formatarDataHora: function (data) {
        var dataFormatada = FlashBuy.util.formatarData(data);
        var pad = FlashBuy.util.zeroPad;

        var h = data.getHours();
        var m = data.getMinutes();

        return dataFormatada + ' ' + pad(h) + ':' + pad(m);
    },

    configurarRotasControllers: function () {
        //configura chamada de controllers / rotas dentro da view atual
        var $content = jQuery('#content');
        if (FlashBuy.controllers) {
            FlashBuy.controllers.forEach(function (controllerName) {
                var $controllerButton = $content.find('[data-controller="' + controllerName + '"]');
                if ($controllerButton.length) {
                    $controllerButton.on('click', function () {
                        controllerName = jQuery(this).data('controller');

                        //carregamento de parametros para a controller
                        var paramsButton = jQuery(this).data();
                        var initParamsNames = getParamNames(FlashBuy[controllerName].init);
                        var params = [];

                        initParamsNames.forEach(function (paramName) {
                            var paramValue = paramsButton[paramName.toLowerCase()];
                            if (paramValue) {
                                if(typeof paramValue === 'string' && paramValue.indexOf('\'') > -1) {
                                    paramValue = paramValue.replace(/\'/g, '\"');
                                }
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

jQuery(document).trigger('FlashBuy.util.ready');
