var Calculadora = {
  display: null,
  resultado: null,
  init: function() {
    Calculadora.bindActions();
  },
  bindActions: function() {
    Calculadora.display = document.getElementById('display');

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

    c.addEventListener('click', Calculadora.clearEventListener);
    // numeros.addEventListener('click', Calculadora.numeroEventListener); //erro
    Calculadora.htmlCollectionAddClickEventListener(numeros, Calculadora.numeroEventListener);
    // operadores.addEventListener('click', Calculadora.operadorEventListener); //erro
    Calculadora.htmlCollectionAddClickEventListener(operadores, Calculadora.operadorEventListener);

    //numeros.addEventListener('click', Calculadora.terminoCalculoEventListener); //ja sabe né
    // Calculadora.htmlCollectionAddClickEventListener(numeros, Calculadora.terminoCalculoEventListener);
    // operadores.addEventListener('click', Calculadora.terminoCalculoEventListener); //ja sabe né
    //Calculadora.htmlCollectionAddClickEventListener(operadores, Calculadora.terminoCalculoEventListener);

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
    Calculadora.display.innerText = '';
  },
  numeroEventListener: function(e) {
    Calculadora.verificaTerminoCalculo();

    var numero = this.innerText.trim();
    Calculadora.display.innerText += numero;
  },
  operadorEventListener: function() {
    //Calculadora.verificaTerminoCalculo();

    var operador = this.innerText.trim();

    var operadorEncontrado = Calculadora.display.innerText.match(/\+|\-|\*|\//g);

    if(operador == '=' || (operadorEncontrado && operadorEncontrado.length > 0)) {
      operadorEncontrado = operadorEncontrado[0];

      var numeros = Calculadora.display.innerText.split(operadorEncontrado);

      var n1 = parseInt(numeros[0]);
      var n2 = parseInt(numeros[1]);

      Calculadora.resultado = 0;

      switch (operadorEncontrado) {
        case '+':
        Calculadora.resultado = n1 + n2;
          break;
        case '-':
        Calculadora.resultado = n1 - n2;
          break;
        case '*':
        Calculadora.resultado = n1 * n2;
          break;
        case '/':
        Calculadora.resultado = n1 / n2;
          break;
        // case '=':
        //   break;
        default:
        Calculadora.resultado = 'Erro na Calculadora';
          break;
      }

      Calculadora.display.innerText = Calculadora.resultado;
    } else {
      Calculadora.display.innerText += operador;
    }
  },
  verificaTerminoCalculo: function () {
    if(Calculadora.resultado == Calculadora.display.innerText) {
      Calculadora.clearEventListener();
    }
  }
};

Calculadora.init();
