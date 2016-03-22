FlashBuy.testeMD5 = {
    init: function () {
        console.log('testeMD5 init');

        var $txtString = $("#txtString");
        var $txtResultado = $("#txtResultado");
        var $textoMD5;

        //apenas um teste com a biblioteca
        $("#btnCalcular").click(function () {            
            $textoMD5 = FlashBuy.util.criptografarMD5($txtString.val())
            $txtResultado.val($textoMD5);
        });

    },
    ready: function () {
        console.log('testeMD5 ready');
    }
};
