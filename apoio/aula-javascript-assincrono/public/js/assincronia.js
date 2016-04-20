var segundosContar = null;
var contagem = null;
var timer = null;

function contador() {
    contagem = 0;
    segundosContar = jQuery('#segundos').val();
    segundosContar = Number(segundosContar);

    //params: callback, milisegundos
    setTimeout(fimContador, (segundosContar * 1000));

    //retorna identificador do timer
    //params: callback, milisegundos
    timer = setInterval(function () {
        contagem += 0.5;
        Materialize.toast(contagem + ' segundos se passaram...', 1000);
    }, 500);
}

function fimContador() {
    clearInterval(timer);
    alert(segundosContar + ' segundos se passaram, a terminou a execução.');
}
