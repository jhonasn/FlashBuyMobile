/// <reference path="js/base/base.js" />
/// <reference path="js/base/app.js" />
/// <reference path="js/base/util.js" />

FlashBuy.descricaoAnuncio = {
    init: function (idOferta) {
        console.log('idOferta: ' + idOferta);

        //testando os valores capturados do controller listaAnuncios
        $("#txtId").text(idOferta);
        $("#txtdescricaoOferta").text(descricaoOferta);

        //metodo para carregar a oferta através do id, 
        //para fim de testes apenas, logo implementaremos via web service.
        function getListaAnuncios(idOferta) {
            $.getJSON('data/listaAnunciosFake.json', function (listaDeAnuncios) {
                $.each(listaDeAnuncios.anunciosFake, function (index, oferta) {
                    if (idOferta === oferta.IdOferta) {
                        $("#descricaoOferta").append("<p> id: " + oferta.IdOferta + "</p>");
                        $("#descricaoOferta").append("<p> descricao: " + oferta.Descricao + "</p>");
                        $("#descricaoOferta").append("<p> local: " + oferta.LocalOferta + "</p>");
                        //prompt("teste");
                    }
                });
            });

        }

        getListaAnuncios(idOferta);

        console.log('descricaoAnuncio init');
    },
    ready: function () {
        console.log('descricaoAnuncio ready');
    }
};
