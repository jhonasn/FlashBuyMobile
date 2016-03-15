var CalculadoraSimples = {
  init: function () {
    CalculadoraSimples.bindEvents();
  },
  bindEvents: function () {
    var calcularBtn = document.getElementById('calcular')
    calcularBtn.addEventListener('click', CalculadoraSimples.calcular);
  },
  calcular: function () {
    //pega valores (string)
    var n1 = document.getElementById('n1').value;
    var n2 = document.getElementById('n2').value;
    var operacao = document.getElementById('operacao').value;
    var resultado = 0;

    //converte valores
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    //valida valores
    if(isNaN(n1) || isNaN(n2)) {
      operacao = 'erro';//força erro
    }

    switch (operacao) {
      case '+':
      resultado = n1 + n2;
        break;
      case '-':
      resultado = n1 - n2;
        break;
      case '*':
      resultado = n1 * n2;
        break;
      case '/':
      resultado = n1 / n2;
        break;
      default:
      resultado = 'Erro na Calculadora';
        break;
    }

    document.getElementById('resultado').value = resultado;
  }
};

CalculadoraSimples.init();
