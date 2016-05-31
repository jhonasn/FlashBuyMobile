/// <reference path="../base/base.js" />
/// <reference path="../base/app.js" />
/// <reference path="../base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (oferta) {
        oferta = JSON.parse(oferta);
        oferta.DataInicio = FlashBuy.util.tempo.formatarDataHora(new Date(oferta.DataInicio));
        oferta.DataFim = FlashBuy.util.tempo.formatarDataHora(new Date(oferta.DataFim));

        FlashBuy.loading(true);

        var usuario = FlashBuy.util.getUsuario();
        var dados = {
            idOferta: oferta.IdOferta,
            idCliente: usuario.IdCliente
        };
        dados = jQuery.param(dados);

        jQuery.post(
            'http://189.16.45.2/flashbuywebapi/api/Compras/PostGeraCompra?' +
            dados
        )
        .success(function (idCompra) {
            FlashBuy.loading(false);
            oferta.idCompra = idCompra;
            FlashBuy.descricaoAnuncio.mostrar(oferta);
        })
        .error(function (err) {
            FlashBuy.loading(false);
            Materialize.toast('Há algo de errado com sua conexão... 😔', 3000, 'rounded');
            FlashBuy.erroAjax();
            console.error(err);
        });
    },
    mostrar: function (oferta) {
        var templateHtml = FlashBuy.util.templateUrl(
            'views/descricaoAnuncio.html',
            oferta
        );

        jQuery('#content').empty();
        jQuery('#content').html(templateHtml);
        jQuery('.carousel').carousel();
        //FIZ ESSA GAMBIARRA ABAIXO PARA TRANSFORMAR UMA STRING DD/MM/YYYY HH:mm:SS 
        //EM UMA STRING MM/DD/YYYY HH:mm:SS para que a contagem funcione corretamente, mudo assim que possível
        var partes = oferta.DataInicio.split("/");
        var dataHoras = new Date(oferta.DataInicio);
        var dataInicio = new Date(parseInt(partes[2], 10),
                 parseInt(partes[1], 10) - 1,
                 parseInt(partes[0], 10));
        dataInicio.setHours(dataHoras.getHours());
        dataInicio.setMinutes(dataHoras.getMinutes());
        dataInicio.setSeconds(dataHoras.getSeconds());
        //A GAMBIARRA ACABA AQUI

        FlashBuy.util.tempo.contagemRegressiva(dataInicio, "timer", true);
        FlashBuy.util.configurarRotasControllers();
    }
};
