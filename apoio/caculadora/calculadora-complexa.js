var CalculadoraComplexa = {
  display: null,
  resultado: null,
  init: function() {
    CalculadoraComplexa.bindEvents();
  },
  bindEvents: function() {
    CalculadoraComplexa.display = document.getElementById('display');

    var c = document.getElementById('C');
    // var virg = document.getElementById(',');

    // var div = document.getElementById('/');
    // var mult = document.getElementById('*');
    // var sub = document.getElementById('-');
    // var soma = document.getElementById('+');
    //
    // var zero = document.getElementById('0');
    // var um = document.getElementById('1');
    // var dois = document.getElementById('2');
    // var trez = document.getElementById('3');
    // var quatro = document.getElementById('4');
    // var cinco = document.getElementById('5');
    // var seis = document.getElementById('6');
    // var sete = document.getElementById('7');
    // var oito = document.getElementById('8');
    // var nove = document.getElementById('9');

    var numeros = document.getElementsByClassName('numero');
    var operadores = document.getElementsByClassName('operador');

    c.addEventListener('click', CalculadoraComplexa.clearEventListener);
    // numeros.addEventListener('click', CalculadoraComplexa.numeroEventListener); //erro
    CalculadoraComplexa.htmlCollectionAddClickEventListener(numeros, CalculadoraComplexa.numeroEventListener);
    // operadores.addEventListener('click', CalculadoraComplexa.operadorEventListener); //erro
    CalculadoraComplexa.htmlCollectionAddClickEventListener(operadores, CalculadoraComplexa.operadorEventListener);

    //numeros.addEventListener('click', CalculadoraComplexa.terminoCalculoEventListener); //ja sabe né
    // CalculadoraComplexa.htmlCollectionAddClickEventListener(numeros, CalculadoraComplexa.terminoCalculoEventListener);
    // operadores.addEventListener('click', CalculadoraComplexa.terminoCalculoEventListener); //ja sabe né
    //CalculadoraComplexa.htmlCollectionAddClickEventListener(operadores, CalculadoraComplexa.terminoCalculoEventListener);

    // div.addEventListener('click', fun);
    // mult.addEventListener('click', fun);
    // sub.addEventListener('click', fun);
    // soma.addEventListener('click', fun);
    //
    // zero.addEventListener('click', fun);
    // um.addEventListener('click', fun);
    // dois.addEventListener('click', fun);
    // trez.addEventListener('click', fun);
    // quatro.addEventListener('click', fun);
    // cinco.addEventListener('click', fun);
    // seis.addEventListener('click', fun);
    // sete.addEventListener('click', fun);
    // oito.addEventListener('click', fun);
    // nove.addEventListener('click', fun);
  },
  htmlCollectionAddClickEventListener: function (htmlCollection, eventListenerFunction) {
    for (var i = 0; i < htmlCollection.length; i++) {
      htmlCollection[i].addEventListener('click', eventListenerFunction);
    }
  },
  clearEventListener: function() {
    CalculadoraComplexa.display.innerText = '';
  },
  numeroEventListener: function(e) {
    CalculadoraComplexa.verificaTerminoCalculo();

    var numero = this.innerText.trim();
    CalculadoraComplexa.display.innerText += numero;
  },
  operadorEventListener: function() {
    //CalculadoraComplexa.verificaTerminoCalculo();

    var operador = this.innerText.trim();

    var operadorEncontrado = CalculadoraComplexa.display.innerText.match(/\+|\-|\*|\//g);

    if(operador == '=' || (operadorEncontrado && operadorEncontrado.length > 0)) {
      operadorEncontrado = operadorEncontrado[0];

      var numeros = CalculadoraComplexa.display.innerText.split(operadorEncontrado);

      var n1 = parseInt(numeros[0]);
      var n2 = parseInt(numeros[1]);

      CalculadoraComplexa.resultado = 0;

      switch (operadorEncontrado) {
        case '+':
        CalculadoraComplexa.resultado = n1 + n2;
          break;
        case '-':
        CalculadoraComplexa.resultado = n1 - n2;
          break;
        case '*':
        CalculadoraComplexa.resultado = n1 * n2;
          break;
        case '/':
        CalculadoraComplexa.resultado = n1 / n2;
          break;
        // case '=':
        //   break;
        default:
        CalculadoraComplexa.resultado = 'Erro na Calculadora';
          break;
      }

      CalculadoraComplexa.display.innerText = CalculadoraComplexa.resultado;
    } else {
      CalculadoraComplexa.display.innerText += operador;
    }
  },
  verificaTerminoCalculo: function () {
    if(CalculadoraComplexa.resultado == CalculadoraComplexa.display.innerText) {
      CalculadoraComplexa.clearEventListener();
    }
  }
};

CalculadoraComplexa.init();
