/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.listaAnuncios = {
    init: function () {
        //método de chamar a lista de anúncios fake
        FlashBuy.listaAnuncios.getListaAnuncios(function () {
            FlashBuy.util.configurarRotasControllers();
        });
        console.log('listaAnuncios init');
    },
    ready: function () {
        console.log('listaAnuncios ready');
    },
    //metodo para carregar o json listaAnunciosFake
    getListaAnuncios: function (cb) {
        $.getJSON('data/listaAnunciosFake.json', function (listaDeAnuncios) {
            $.each(listaDeAnuncios.anunciosFake, function (index, oferta) {
                $("#divOfertas").append(
                    "<div class='oferta'>" +
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
                                    "<button type='button' data-controller='descricaoAnuncio' data-idOferta='" + oferta.IdOferta + "'>Abrir Oferta</button>" +
                                    "<a href='#'>Recusar</a>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    '</div>');
            });

            if (cb) {
                cb();
            }
        });
    }
};
