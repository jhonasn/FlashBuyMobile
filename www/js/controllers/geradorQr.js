FlashBuy.geradorQr = {
    init: function () {
        console.log('geradorQr init');
    },
    ready: function () {
        console.log('geradorQr ready');

        $("#btGerar").click(function () {
            var string = $("#txtString").val();
            var divId = "qrcode";

            $("#qrcode").empty();
            //new QRCode(document.getElementById("qrcode"), string);
            FlashBuy.util.gerarQRCode(string, divId);
        });
    }
};
