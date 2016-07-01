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

    notificacao: {
        agendar: function (compra) {
            //Implementando configurações padrão para agendamento
            var paramAgendamentos = [
                {
                    tipo: "dia(s)",
                    valor: 3
                },
                {
                    tipo: "dia(s)",
                    valor: 2
                },
                {
                    tipo: "dia(s)",
                    valor: 1
                },
                {
                    tipo: "hora(s)",
                    valor: 3
                },
                {
                    tipo: "hora(s)",
                    valor: 1
                },
                {
                    tipo: "minuto(s)",
                    valor: 30
                },
                {
                    tipo: "minuto(s)",
                    valor: 5
                }
            ];
            var agendados = [];
            paramAgendamentos.forEach(function (agendamento, i) {
                var mili;
                switch (agendamento.tipo) {
                    case "dia(s)": {
                        //Transforma OS DIAS em mili
                        mili = agendamento.valor * 24 * 60 * 60 * 1000;
                        break;
                    }
                    case "hora(s)": {
                        mili = agendamento.valor * 60 * 60 * 1000;
                        break;
                    }
                    case "minuto(s)": {
                        mili = agendamento.valor * 60 * 1000;
                        break;
                    }
                    default: {
                        console.error("Agendamento inválido.");
                        break;
                    }
                }
                var dataInicio = new Date(compra.Oferta.DataInicio);
                var quantoFalta = new Date(dataInicio.getTime() - mili);
                if (!(quantoFalta < new Date())) {
                    idNotificacao = JSON.parse(localStorage.getItem(FlashBuy.idUltimaNotificacao));
                    if (!idNotificacao) {
                        idNotificacao = 1;
                        localStorage.setItem(FlashBuy.idUltimaNotificacao, JSON.stringify(idNotificacao));
                    }
                    else {
                        idNotificacao++;
                        localStorage.setItem(FlashBuy.idUltimaNotificacao, JSON.stringify(idNotificacao));
                    }

                    var mensagemNotificacao = agendamento.valor + ' ' + agendamento.tipo + ' para começar a venda de ' + compra.Oferta.Produto;
                    //Agenda a notificação
                    //Define local do arquivo de som da notificação
                    var sound = device.platform === 'Android' ? 'file://data/sound/sound.mp3' : 'file://data/sound/beep.caf';

                    cordova.plugins.notification.local.schedule({
                        //Insere Id da Notificação
                        id: idNotificacao,
                        title: 'FlashBuy',
                        text: mensagemNotificacao,
                        at: quantoFalta,
                        sound: sound,
                        badge: 0
                    });

                    agendamento.id = idNotificacao;
                    agendamento.dataDisparo = quantoFalta;
                    agendados.push(agendamento);
                }

            });
            localStorage.setItem(FlashBuy.Notificacoes + compra.IdOferta, JSON.stringify(agendados));

            ////Cria variável que captura a data e hora atual.
            //var agora = new Date();
            ////Cria variável que captura a data em que a oferta iniciará
            //var dataInicio = new Date(JSON.parse(localStorage.getItem(FlashBuy.Compras))[0].Oferta.dataInicio);
            ////Verifica se a oferta já começou
            //if (agora < dataInicio) {
            //    //Agenda

            //    //Verifica se a oferta começa hoje
            //    //if (agora.getDay() == dataInicio.getDay() &&
            //    //    agora.getMonth() == dataInicio.getMonth() &&
            //    //    agora.getYear() == dataInicio.getYear()) {

            //    //}
            //    //Verifica se posso agendar uma notificação "É amanhã"
            //    if (agora < dataInicio(dataInicio.getDate() - 1)) {
            //        //Verifica se posso agendar uma notificação "Começa em dois dias"
            //        if (agora < dataInicio(dataInicio.getDate() - 2)) {
            //            //Verifica se posso agendar uma notificação "Começa em três dias"
            //            if (agora < dataInicio(dataInicio.getDate() - 3)) {


            //            }
            //        }
            //    }


            //} else {
            //    //Caso não tenha começado, agenda a notificação informando
            //    // que a oferta já começou
            //    // (também posso informar quantos dias aprox. faltam para acabar).
            //    alert("já começou");
            //}
            //var dataNotificacao = new Date(dataInicio);
            //dataNotificacao.setDate(dataInicio.getDate() - 1);
            //if (agora < dataNotificacao) {
            //    alert(dataNotificacao + 'isso deve ser 1 dia antes de acabar');
            //}
            //dataNotificacao.setDate(dataInicio.getDate() - 2);
            //if (agora < dataNotificacao) {
            //    alert(dataNotificacao + 'isso deve ser 2 dias antes de acabar');
            //}
            //dataNotificacao.setDate(dataInicio.getDate() - 3);
            //if (agora < dataNotificacao) {
            //    alert(dataNotificacao + 'isso deve ser 3 dias antes de acabar');
            //}

            //alert(dataInicio);
            ////Define a quantidade de milisegundos que faltam para chegarmos até a data final

            // var milis = FlashBuy.util.tempo.getDiferencaEntreDatasEmMili(dataInicial, dataFinal);
            //alert(milis);
            //_5_sec_from_now = new Date(now + 5 * 1000);

            //Agenda a notificação conforme o anuncio
            // cordova.plugins.notification.local.schedule({
            //     //Insere Id da Notificação (acredito que por enquanto podemos definir uma notificação por compra)
            //     id: compra.IdCompra,
            //     title: 'FlashBuy ⚡',
            //     text: 'TESTE MALUCO',
            //     at: _5_sec_from_now,
            //     sound: sound,
            //     badge: 0
            // });
        },
        getArrayAgendadas: function (oferta) {
            var keyArray = FlashBuy.Notificacoes + oferta.IdOferta;
            var arrayAgendadas = JSON.parse(localStorage.getItem(keyArray));
            if (!(arrayAgendadas === undefined || arrayAgendadas === null || arrayAgendadas.length === 0)) {
                return arrayAgendadas;
            }
            else {
                console.error('Não existem notificações agendadas para essa oferta.');
                return [];
            }
        },
        cancelar: function (arrayAgendadas) {
            arrayAgendadas.forEach(function (item, i) {
                cordova.plugins.notification.local.cancel(item.id, function () {
                    console.log('Notificação ' + item.id + ' foi cancelada com sucesso.');
                });
            });
        }
    },

    obterPushId: function (deviceId) {

    },

    removeAnuncioAdquirido: function (IdOferta) {
        var listaAnunciosAdquiridos = FlashBuy.util.getAnunciosAdquiridos();
        listaAnunciosAdquiridos.forEach(function (item, index) {
            if (item.IdOferta === IdOferta) {
                listaAnunciosAdquiridos.splice(index, 1);
            }
        });
        localStorage.setItem(FlashBuy.Compras, JSON.stringify(listaAnunciosAdquiridos));
    },

    storeAnunciosAdquiridos: function () {
        var idCliente = FlashBuy.util.getUsuario().IdCliente;
        var dados = {
            idCliente: idCliente
        };
        dados = jQuery.param(dados);
        jQuery.get(
            'http://189.16.45.2/flashbuywebapi/api/Compras/GetComprasCliente?' +
            dados
        )
        .success(function (data) {
            //Medida para não sobrecarregar localStorage com as imagens das compras que já foram concretizadas.
            //data.forEach(function (item, index) {
            //    if (item.Votou) {
            //        data[index].Oferta.imgMime = '';
            //        data[index].Oferta.Foto = '';
            //    }
            //});
            localStorage.setItem(FlashBuy.Compras, JSON.stringify(data));
        })
        .error(function (err) {
            FlashBuy.erroAjax(err);
            console.error(arguments);
        });
    },

    votarAnuncioAdquirido: function (IdCompra) {
        var listaAnunciosAdquiridos = FlashBuy.util.getAnunciosAdquiridos();
        listaAnunciosAdquiridos.forEach(function (item, index) {
            if (item.IdCompra === IdCompra) {
                item.Votou = true;
            }
        });
        FlashBuy.util.setAnunciosAdquiridos(listaAnunciosAdquiridos);
    },

    setAnunciosAdquiridos: function (listaAnunciosAdquiridos) {
        localStorage.setItem(FlashBuy.Compras, JSON.stringify(listaAnunciosAdquiridos));
    },

    getAnunciosAdquiridos: function () {
        var listaAnunciosAdquiridos = localStorage.getItem(FlashBuy.Compras);
        if (listaAnunciosAdquiridos === undefined) {
            FlashBuy.util.storeAnunciosAdquiridos();
            listaAnunciosAdquiridos = localStorage.getItem(FlashBuy.Compras);
        }
        return JSON.parse(listaAnunciosAdquiridos);
    },

    getNumAnunciosAdquiridos: function () {
        var listaAnunciosAdquiridos = FlashBuy.util.getAnunciosAdquiridos();
        if (listaAnunciosAdquiridos === undefined || listaAnunciosAdquiridos === null) {
            return 0;
        } else {
            return listaAnunciosAdquiridos.length;
        }
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
            } else {
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
                        if (data.length > 0) {
                            data = data[0];
                        }
                        //CASO HAJA ALGUM RETORNO, SALVA OBJETO CLIENTE NA LOCAL STORAGE
                        localStorage.setItem(FlashBuy.Cliente, JSON.stringify(data));
                        retorno = data;
                    } else {
                        //CASO NÃO EXISTA O IMEI NA BASE, O RETORNO RECEBE UM VALOR FALSO/0
                        retorno = 0;
                    }
                },
            });

        } else {
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
                if (typeof value === 'string') {
                    value = value.replace(/\"/g, '\'');
                }
                var regex = '\\{\\{' + key + '\\}\\}';
                regex = new RegExp(regex, 'g');
                html = html.replace(regex, value);
            }
        }

        return html;
    },
    // ACREDITO QUE NÃO USAREMOS MAIS ESSE PLUGIN, PORQUE ELE NÃO AJUDA MUITO... DEIXAREI COMENTADO POR ENQUANTO
    //
    //conectadoInternet: function () {
    //    if (navigator.connection.type !== Connection.NONE) {
    //        return true;
    //    } else {
    //        return false;
    //    }
    //},

    //onInternet: function (callback) {
    //    jQuery(document).on('online', function () {
    //        callback(true);
    //    });
    //    jQuery(document).on('offline', function () {
    //        callback(false);
    //    });
    //},

    //tipoInternet: function () {
    //    var connType = navigator.connection.type;
    //    var retorno = "Conexao ";
    //    switch (connType) {
    //        case Connection.UNKNOWN:
    //            {
    //                retorno += "desconhecida";
    //                break;
    //            }
    //        case Connection.ETHERNET:
    //            {
    //                retorno += "a cabo";
    //                break;
    //            }
    //        case Connection.WIFI:
    //            {
    //                retorno += "WI-FI";
    //                break;
    //            }
    //        case Connection.CELL_2G:
    //            {
    //                retorno += "2G";
    //                break;
    //            }
    //        case Connection.CELL_3G:
    //            {
    //                retorno += "3G";
    //                break;
    //            }
    //        case Connection.CELL_4G:
    //            {
    //                retorno += "4G";
    //                break;
    //            }
    //        case Connection.CELL:
    //            {
    //                retorno += "de dados celulares";
    //                break;
    //            }
    //        case Connection.NONE:
    //            {
    //                retorno += "inexistente";
    //                break;
    //            }
    //        default:
    //            {
    //                retorno = "Houve um problema ao identificar sua conexao. Tente novamente mais tarde.";
    //                break;
    //            }
    //    }
    //    return retorno + ".";
    //},

    zeroPad: function (n) {
        if (typeof n === 'number') {
            if (n < 10) {
                return '0' + n;
            }
        }

        return n;
    },

    tempo: {
        isTipoData: function (data) {
            if (!(data instanceof Date)) {
                throw new Error('O tipo a se formatar não é de data, passar parametro tipo Date');
            }
        },

        milisParaTempo: function (milis) {
            var negativo = false;

            if (milis < 0) {
                negativo = true;
                milis = Math.abs(milis);
            }

            var constDias = 24 * 60 * 60 * 1000;
            var constHoras = 60 * 60 * 1000;
            var constMinutos = 60 * 1000;

            var d = Math.floor(milis / constDias);
            var h = Math.floor((milis - (d * constDias)) / constHoras);
            var m = Math.floor((milis - ((d * constDias) + (h * constHoras))) / constMinutos);
            var s = Math.floor((milis - ((d * constDias) + (h * constHoras) + (m * constMinutos))) / 1000);
            var mi = Math.round(milis - ((d * constDias) + (h * constHoras) + (m * constMinutos) + (s * 1000)));

            if (mi === 1000) {
                s++;
                mi = 0;
            }
            if (s === 60) {
                m++;
                s = 0;
            }
            if (m === 60) {
                h++;
                m = 0;
            }
            if (h === 24) {
                d++;
                h = 0;
            }

            return {
                negativo: negativo,
                dias: d,
                horas: h,
                minutos: m,
                segundos: s,
                milis: mi
            };
        },

        milisParaTempoFormatar: function (tempo) {
            var pad = FlashBuy.util.zeroPad;
            //d:hh:MM:ss.mmm
            tempo = [
                tempo.dias,
                pad(tempo.horas),
                pad(tempo.minutos), pad(tempo.segundos)
            ].join(':')
            .concat('.').concat(tempo.milis);
            if (tempo.negativo) {
                tempo = '-'.concat(tempo);
            }

            return tempo;
        },

        getDiferencaEntreDatasEmMili: function (d1, d2) {
            //d1 deve representar a data inicial, d2 deve representar a data final
            FlashBuy.util.tempo.isTipoData(d1);
            FlashBuy.util.tempo.isTipoData(d2);

            return d2.getTime() - d1.getTime();
        },

        subtrairDatas: function (d1, d2, formatar, compararMaiorMenor) {
            FlashBuy.util.tempo.isTipoData(d1);
            FlashBuy.util.tempo.isTipoData(d2);

            var maior, menor;
            if (compararMaiorMenor) {
                if (d1 > d2) {
                    maior = d1;
                    menor = d2;
                } else {
                    maior = d1;
                    menor = d2;
                }
            } else {
                maior = d1;
                menor = d2;
            }

            var tempo = FlashBuy.util.tempo.milisParaTempo(maior - menor);
            if (formatar) {
                return FlashBuy.util.tempo.milisParaTempoFormatar(tempo);
            } else {
                return tempo;
            }
        },

        formatarData: function (data) {
            FlashBuy.util.tempo.isTipoData(data);
            var pad = FlashBuy.util.zeroPad;

            var d = data.getDate();
            var m = data.getMonth() + 1;
            var y = data.getFullYear();

            return pad(d) + '/' + pad(m) + '/' + pad(y);
        },

        formatarDataHora: function (data) {
            var dataFormatada = FlashBuy.util.tempo.formatarData(data);
            var pad = FlashBuy.util.zeroPad;

            var h = data.getHours();
            var m = data.getMinutes();

            return dataFormatada + ' ' + pad(h) + ':' + pad(m);
        },

        contagemRegressiva: function (dataFim, elementoHtmlId, isTimerInicio) {
            //Busca elemento pelo Id via JQuery e coloca em uma variável
            var timer = jQuery('#' + elementoHtmlId);

            var tratamentoPreposicao, tratamentoFimContagem;

            if (isTimerInicio) {
                //Seta o conteúdo do tratamento de preposição
                tratamentoPreposicao = 'Faltam: ';
                //Seta conteúdo do tratamento de fim de contagem
                tratamentoFimContagem = 'Já começou.';
            } else {
                //Seta o conteúdo do tratamento de preposição
                tratamentoPreposicao = 'Acaba em: ';
                //Seta conteúdo do tratamento de fim de contagem
                timer.html('Chegou ao fim.');
            }

            function atualizarTimer() {
                var t = getTempoQueFalta();
                //Seta valor para ser mostrado na tela
                timer.html(tratamentoPreposicao + t.dias + ' dias, ' + t.horas + 'h ' + t.minutos + 'm ' + t.segundos + 's');
                //Verifica se o resultado da subtração não é negativo (Esse é o caso
                //de quando a data extrapola o limite)
                if (t.negativo === true) {
                    //Limpa o timer
                    clearInterval(timeInterval);
                    //Seta o conteúdo do timer para o tratamento de fim de contagem.
                    timer.html(tratamentoFimContagem);
                    return;
                }
            }

            atualizarTimer();

            var timeInterval = setInterval(atualizarTimer, 1000);

            function getTempoQueFalta() {
                var tempoQueFalta = FlashBuy.util.tempo.subtrairDatas(dataFim, new Date(), false);
                return tempoQueFalta;
            }
        }
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
                                if (typeof paramValue === 'string' && paramValue.indexOf('\'') > -1) {
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
