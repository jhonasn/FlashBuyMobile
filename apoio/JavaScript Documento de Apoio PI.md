#1. Tipos

Assim como outras linguagens o JavaScript (js) possui vários tipos
```javascript
/*
Inteiro, float/double e Infinity pertencem todos ao mesmo tipo em javascript: Number.

Ao dividir algum numero por 0 em js não recebemos um erro e sim um valor Infinito.
*/
var inteiro = 1;
var doubleFloat = 2.3;
var infinito = Infinity;


/*
Assim como no c# o js trata a string como um array, porém não existe o tipo char em js apenas string.
Ou seja você pode pegar o 'i' da var abaixo assim: umaString[1];//'i'
*/
var umaString = 'oi';
var booleano = true;//ou false

/*
Diferença entre null e undefined: além dos tipos serem diferentes variaveis assumem o tipo undefined por padrão enquanto no null intanciamos uma variável para reservá-la para alguma operação.
Ex: var a; //tipo undefined.
*/
var nulo = null;
var indefinido = undefined;

var objeto = {};
var umArray = [ 1, 2, 3 ];
//Em js podemos colocar funções em variáveis
//também podemos passar funções como argumentos para outras funções e
//ou retornadas de outras funções
var funcao = function() {
	console.log('faz algo');
};
//também podemos declarar funções dando nome a elas
//no caso acima a função não tem nome, é uma função anônima
//funcoes com nome (como abaixo) são lidas primeiro na execução do código (colocadas em memória)
//porém eu não aconselho usar assim pois elas são postas como
//globais no código e futuramente podem gerar conflitos
function funcao2() {
	console.log('faz algo');
}
//para invocar funções em js não existem diferença de c#
funcao();
funcao2();

//outra maneira de declarar variáveis
var a = 1, b = 'oi', c = null;
//ou
var a = 1,
	b = 'oi',
	c = null;
```
O ponto e vírgula no js (;) não é obrigatório caso exista quebra de linha, caso não tenha e exista continuação do código na mesma linha, o (;) é necessário.
Ex.:
```javascript
//ok
var a = 1
console.log(a)

//erro
var a = 1 console.log(a)

//ok
var a = 1; console.log(a);
```
>Variáveis de todos os tipos podem ser interpretadas como boleanas ou seja se colocarmos uma variável dentro de um if sendo ela não boleana ela é interpretada como boleana, se negarmos ela, ela assume o valor contrario do seu valor booleano, se quisermos apenas ver seu valor boleano podemos negá-la duas vezes.
>Ex.:

```javascript
var a = 1;
console.log(!!a);//true
console.log(!a);//false
if(a) {
    console.log('esta condição será satisfeita.');
}

console.log(!!null);//false
console.log(!!undefined);//false
console.log(!!0);//false
console.log(!!'');//false
console.log(!!'teste');//true
console.log(!!-1);//true
```

#2. Dinamicidade

Variáveis no js podem mudar de tipo livremente assim como serem deletadas.
```javascript
var variavel = 1;
var tipo = typeof variavel;
console.log(tipo); //'number'

variavel = 'string';
tipo = typeof variavel;
console.log(tipo); //'string'

delete variavel;

var obj = { prop: 'valor', outraProp: 1 };
console.log(obj.prop); //valor

delete obj.prop;//deleta propriedade

console.log(obj.prop);//undefined
console.log(obj.outraProp);//1

```

#3. Operações Básicas

- if

```javascript
var a = 1, b = 2;

if(a == 1 && b === '2') {
	console.log('primeira condição');
} else if(a != 0) {
	console.log('segunda condição');
} else {
	console.log('nenhuma das duas condições');
}
```

>=== em js compara também o tipo da instância em js. Ex.:
```javascript
1 == '1'//true
1 === '1'//false
//diferente ficaria !== ao invés de !=
```

- switch

```javascript
var a = 1, b = 2;

switch(a) {
	case 1:
	console.log('condição satisfeita');
	break;
	case 2:
	console.log('condição não satisfeita');
	break;
	case 3:
	console.log('condição não satisfeita');
	break;
	default:
	console.log('Se não satisfazer nenhuma condição cai aqui');
	break;
}
```

- for

```javascript
var colecao = [ 1, 2, 3, 4, 5, 'acabou' ];

for (var i = 0; i < colecao.length; i++) {
	console.log(colecao[i]);
}
/*
Saida:
1
2
3
4
5
acabou
*/
```

- while

```javascript
var colecao = [ 1, 2, 3, 4, 5, 'acabou' ];
var contador = 0;

while (contador < colecao.length) {
	console.log(colecao[contador]);
	contador++;
}

//ou
do {
	console.log(colecao[contador]);
	contador++;
} while (contador < colecao.length);

/*
Saida dos dois é igual:
1
2
3
4
5
acabou
*/
```

- for in

Diferente do ```for``` o ``` for in ``` roda um loop de forma ***reflexiva***.

```javascript
var colecao = [ 1, 2, 3, 4, 5, 'acabou' ];
var obj = { inteiro: 1, booleano: true, floatDouble: 2.34 }

for (var chave in obj) {
	//no js podemos chamar propriedades de um objeto como chamamos em dicionários. Ex.: dic['chave']
	console.log('chave: ' + chave + ', valor: ' + obj[chave]);
}
/*
Saída:
chave: inteiro, valor: 1
chave: booleano, valor: true
chave: floatDouble, valor: 2.34
*/

//a chave de um array é seu indice
for (var chave in colecao) {
	console.log('chave: ' + chave + ', valor: ' + obj[chave]);
}
/*
Saída:
chave: 0, valor: 1
chave: 1, valor: 2
chave: 2, valor: 3
chave: 3, valor: 4
chave: 4, valor: 5
chave: 5, valor: acabou
*/
```

- foreach

> O foreach do js é um método relativamente recente adicionado ao array, versões de navegadores mais antigos podem não ter este método.

```javascript
var colecao = [ 1, 2, 3, 4, 5, 'acabou' ];

colecao.forEach(function (obj, index, arr) {
	console.log(obj);
});
/*
Saida:
1
2
3
4
5
acabou
*/
```

- Outros métodos de Array

```javascript
//retorna os elementos que retornarao condição true
var colecao = [ 1, 2, 3, 4, 5, 'acabou' ];

var apenasNumeros = colecao.filter(function (obj) {
	//a função global isNaN avalia se uma variável é NÃO é um número. Por isso negando ela sabemos se a variável é um número
	return !isNaN(obj);
});
console.log(apenasNumeros);
/*
Saída:
1, 2, 3, 4, 5
*/

//retorna true se existe a condição dentro do Array. É mais rápido que percorrer o Array de outra maneira.
var existeNoArray = colecao.some(function (obj) {
	return obj == 3;
});
console.log(existeNoArray);
/*
Saída:
true
*/
```

> Ainda existem outros métodos úteis porém mais complexos de serem usadas em Arrays como é o caso do [.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) e [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

#3. Orientação ao Objeto

O JavaScript é uma linguagem de [programação orientada a objetos (OOP) baseada em protótipos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript) sendo assim possui diferenças das linguagens de programação OOP baseados em classe.

##2.1 Objeto Chave-Valor
A maneira mais simples de instanciar um objeto em js é através da dinâmica representação chave-valor. Os objetos neste caso não são definidor por classe, são instanciados e implementados em tempo de execução.
```javascript
var obj = {};//objeto vazio por representação similar a json
var obj = new Object();//objeto vazio
var obj = Object.create();//objeto vazio

//atribuição de propriedades dinamica (serve para as 3 definições acima)
obj.prop1 = 1;
obj.nome = 'oi';

console.log(obj.prop1);//1
console.log(obj.prop2);//oi

//objeto criado com notação similar a JSON (JavaScript Object Notation)
var obj = {
	prop1: 1,
	nome: 'oi'
};

//ou
var obj = {
	"prop1": 1,
	"nome": 'oi'
};
//aspas simples também funcionariam

//casos de nomes complexos (apesar de não aconcelhável, possível)
var obj = {
	prop1: 1,
	nome: 'oi',
	'teste com espaco': 'espaço'
};
//ou
obj['teste com espaco'] = 'espaco';

//neste caso para pegar o valor da prop só consiguiriamos com
console.log(obj['teste com espaco']);//espaco
```
###3.1.1 Herança prototipal (ou por clonagem)

Neste tipo de herança apenas criamos um novo objeto e herdamos o protótipo da classe pai, após isso defininimos as diferenças. Para isso podemos usar o método abaixo para clonagem.

>Também podemos usar este tipo de herança em objetos criados com classes definidas.

```javascript
function clone(object) {
    function F() {}
    F.prototype = object;
	return new F;
}
```

Usabilidade:

```javascript
cliente = clone(pessoa);//instância de pessoa

//adiciona diferenças
cliente.cpf = '12345678901';

//usa definições de pessoa
cliente.descricao();
//Pessoa: João, Idade: 25, Sexo: M
```

###3.1.2 Fábrica de Objeto

Para manter a conformidade de objetos criados do modo chave-valor podemos usar o Simple [Factory Pattern](http://www.dofactory.com/javascript/factory-method-design-pattern) (ou funções fábrica) que cria objetos com a mesma estrutura e mesmos valores padrão.

```javascript
//###
//Simple Factory Pattern
//###
var Factory = function() {};
Factory.prototype.criarPessoa = function() {
	return {
		nome: '',
		idade: 0,
		sexo: '',
		descricao: function () {
			return 'Pessoa: ' + this.nome +
					', Idade: ' +  this.idade +
					', Sexo: ' + sexo;
		}
	};
};
Factory.prototype.criarAnimal = function() {
	return {
		nome: '',
		quantidadePatas: 0,
		descricao: function() {
			return 'O Animal ' + this.nome +
					' tem ' + this.quantidadePatas + ' patas.';
		}
	};
};

//usabilidade
var factory = new Factory();
var pessoa = facory.criarPessoa();
pessoa.nome = 'João';
pessoa.idade = 25;
pessoa.sexo = 'M';

pessoa.descricao();
//Pessoa: João, Idade: 25, Sexo: M

var elefante = factory.criarAnimal();
animal.nome = 'Elefante';
animal.quantidadePatas = 4;

animal.descricao();
//O Animal Elefante tem 4 patas.


//###
//função fábrica
//###
var criarPessoa = function (nome, idade, sexo) {
	return {
		nome: nome,
		idade: idade,
		sexo: sexo,
		descricao: function () {
			return 'Pessoa: ' + this.nome +
					', Idade: ' +  this.idade +
					', Sexo: ' + sexo;
		}
	};
}

var pessoa = criarPessoa('João', 25, 'M');
console.log(pessoa.descricao());
//Pessoa: João, Idade: 25, Sexo: M
```

>Veja também: [Exemplo Simple Factory Pattern iMasters](http://imasters.com.br/artigo/24086/javascript/padrao-de-projeto-de-software-javascript-factory-parte-01).

##3.2 Classe

A declaração de classe em javascript é feita com funções, e para a instanciação usamos a plavra chave ```new```. Para se referir ao escopo da função usamos a palava chave ```this```.

```javascript
//classe
function Pessoa(nome, idade, sexo) {//parametros construtor
	//campos publicos
	this.nome = nome;
	this.idade = idade;

	//campo privado
	var sexo = sexo;

	//método público com acesso a vars privadas
	this.descricao = function() {
		return 'Pessoa: ' + this.nome +
		', Idade: ' +  this.idade +
		', Sexo: ' + sexo;
	};

	//encapsulamento do campo privado sexo
	//propriedade sexo
	this.getSexo = function() {
		console.log(this);
		return sexo;
	};
	this.setSexo = function(sexo) {
		sexo = sexo;
	};
}

//atribuição de método no modelo de protótipo
//apenas classes definidas com função possuem o campo prototype
//este tipo de definição só tem acesso ao this de Pessoa
//e não ao escopo de variáveis privadas
Pessoa.prototype.quem = function() {
	return 'Esta pessoa é o(a) ' + this.nome;
};

var pessoa = new Pessoa('João', 25, 'M');
console.log(pessoa.nome);//João
console.log(pessoa.idade);//25
console.log(pessoa.descricao());
//Pessoa: João, Idade: 25, Sexo: M

//outra forma de declarar uma classe seria:
var OutraClasse = function(parametro1) {
	this.parametro1 = parametro1;
}
```

####3.2.1 Escopo
Em js o escopo de execução (ou seja o this) funciona um pouco diferente das linguagem fortemente tipadas:

```javascript
var getIdade = function() {
	return this.idade;
}

function Pessoa(nome, idade, sexo) {
//... todo o conteudo anterior com a diferença de:
	this.getIdade = getIdade;
	//na linha acima estamos atribuido a função getIdade de fora
	//do escopo da classe pessoa ao escopo de Pessoa
	//na função getIdade
}

//... outras declarações de Pessoa

//chamando do escopo global this se refere a Window
//que não tem a propriedade idade
getIdade();//undefined

//chamando do objeto pessoa (João) o mesmo método
//que tem o escopo sendo a pessoa
pessoa.getIdade();//25
```

Outra variável impotante em funções é que variáveis declaradas sem a chave var antes vai se refere (ou cria) variáveis no escopo global, e var se refere ao escopo da função, devemos tomar muito cuidade neste caso para não 'sujar' o escpo global.

```javascript
var dobro = function(numero) {
	var constante = 2;
	outroValor = 'epa!'; //descuidado detectado!
	return numero * constante;
};

dobro(4);//8
console.log(constante);//undefined
//escopo global violado!
console.log(outroValor);//epa!
```

O escopo de funções pode ser manipulado com os métodos do objeto Function
[```call()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) e [```apply()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply). A diferença entre os dois é que em ```call``` o segundo e seguintes argumentos são os argumentos a serem passados para a função separados por vírgula, e no ```apply``` o segundo argumento é um Array com os parametros a serem passados para a função.

```javascript
getIdade();//undefined
getIdade.call(pessoa);//25
//caso tivesse mais argumentos
metodo.call(pessoa, 24, 'teste', true);

getIdade.apply(pessoa);//25
//caso tivesse mais argumentos
metodo.apply(pessoa, [24, 'teste', true]);
```

####3.2.2 Closure

Com o closure podemos criar um escopo acima de uma função ou classe. Esse escopo pode ser usado por exemplo para simulação de elementos de orientação ao objeto como propriedades privadas estáticas ou constantes.

```javascript
var Book = (function() {

  // Constants (created as private static attributes).
  var UPPER_BOUND = 100;

  // Privileged static method.
  this.getUPPER_BOUND() {
    return UPPER_BOUND;
  }

  // Private static attributes.
  var numOfBooks = 0;

  // Private static method.
  function checkIsbn(isbn) {
    ...
  }    

  // Return the constructor.
  return function(newIsbn, newTitle, newAuthor) { // implements Publication

    // Private attributes.
    var isbn, title, author;

    // Privileged methods.
    this.getIsbn = function() {
      return isbn;
    };
    this.setIsbn = function(newIsbn) {
      if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
      isbn = newIsbn;
    };

    this.getTitle = function() {
      return title;
    };
    this.setTitle = function(newTitle) {
      title = newTitle || 'No title specified';
    };

    this.getAuthor = function() {
      return author;
    };
    this.setAuthor = function(newAuthor) {
      author = newAuthor || 'No author specified';
    };

    // Constructor code.
    numOfBooks++; // Keep track of how many Books have been instantiated
                  // with the private static attribute.
    if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be '
        + 'created.');

    this.setIsbn(newIsbn);
    this.setTitle(newTitle);
    this.setAuthor(newAuthor);
  }
})();

// Public static method.
Book.convertToTitleCase = function(inputString) {
  ...
};

// Public, non-privileged methods.
Book.prototype = {
  display: function() {
    ...
  }
};
```

Fonte: [JavaScript Pro Design Patterns - Apress](http://www.apress.com/9781590599082).

####3.2.3 Herança Clássica

Classes em js usam o modelo de protótipo para herança:

```javascript
function Cliente(nome, idade, sexo, cpf) {
	//chama construtor de pessoa porém passando this como escopo
	Pessoa.call(this, nome, idade, sexo);
	this.cpf = cpf;
}

//configura a corrente do protótipo
Cliente.prototype = new Pessoa();
//seta atributo de construtor
Cliente.prototype.constructor = Cliente;

var cliente = new Cliente('João', 25, 'M', '12345678901');
console.log(cliente.descricao());
//Pessoa: João, Idade: 25, Sexo: M
```

Esta herança funciona ok, porém mas precisamos declarar muitas linhas para a herança. Para fazer a herança de maneira mais rápida, limpa e genérica (para chamar o construtor de Pessoa em cliente precisamos chamar hardcoded) podemos definir e usar a função:

```javascript
function extend(subClass, superClass) {
	var F = function() {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;

	subClass.superclass = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
}
```

Usabilidade:

```javascript
function Cliente(nome, idade, sexo, cpf) {
	//chama construtor de pessoa porém passando this como escopo
	Cliente.superclass.constructor.call(this, nome, idade, sexo);
	this.cpf = cpf;
}

//herda
extend(Cliente, Pessoa);

var cliente = new Cliente('João', 25, 'M', '12345678901');
console.log(cliente.descricao());
//Pessoa: João, Idade: 25, Sexo: M
```

###3.2.4 Interfaces

Assim como na herança o js não oferece nativamente suporte a interfaces e na maioria dos casos não necessitamos dela. Porém em codigos mais robustos com maior necessidade de padronização de atributos e propriedades de objetos as interfaces vem a serem muito úteis, além disso, grande parte dos Design Patterns também se apoiam firmemente em Interfaces.
Mesmo sem suporte nativo da linguagem é possivel implementar interfaces de forma simulada apesar das limitações.

Na definição da classe de Interface temos o construtor que recebe como parametro o nome da interface e os métodos que a interface deve implementar em um array de string. O método estático ```ensureImplements``` que faz a verificação se o objeto implementa a(ou as) interface(s) recebe o objeto a ser verificado.

```javascript
// Constructor.

var Interface = function(name, methods) {
    if(arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length
          + "arguments, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];
    for(var i = 0, len = methods.length; i < len; i++) {
        if(typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be "
              + "passed in as a string.");
        }
        this.methods.push(methods[i]);        
    }    
};    

// Static class method.

Interface.ensureImplements = function(object) {
    if(arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " +
          arguments.length  + "arguments, but expected at least 2.");
    }

    for(var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if(interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments "   
              + "two and above to be instances of Interface.");
        }

        for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if(!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object "
                  + "does not implement the " + interface.name
                  + " interface. Method " + method + " was not found.");
            }
        }
    }
};
```

Usabilidade:

```javascript
var IDescricao = new Interface('IDescricao', ['descricao']);

//implementa IDescricao
var joao = new Pessoa('João', 25, 'M');

//não implementa IDescricao
var alberto = {
	nome: 'Alberto',
	idade: 25,
	sexo: 'M'
};

//implementa IDescricao
var marciano = {
	nome: 'Abul akdatrazik',
	sexo: 'Z',
	cor: 'Verde',
	tchenkz: '83azz',
	descricao: function() {
		return 'O marciano ' + this.nome +
			' do sexo ' + this.sexo +
			' que é ' + this.cor +
			' possui ' + this.tchenkz +
			' tchenkz em sua nave espacial.';
	}
};

var descreverCoisas = function(coisaDescritivel) {
	Interface.ensureImplements(coisaDescritivel, IDescricao);
	coisaDescritivel.descricao();
};

descreverCoisas(joao);
//Pessoa: João, Idade: 25, Sexo: M
descreverCoisas(marciano);
//O marciano Abul akdatrazik do sexo Z que é Verde possui 83azz tchenkz em sua nave espacial.
descreverCoisas(alberto);
//Erro: Function Interface.ensureImplements: object does not implement the IDescricao interface. Method descricao  was not found.
```

###3.3 Module Pattern

Um dos patterns mais usados em js para projetos é o Module Pattern. Este pattern ajuda na estruturação de projeto, separando as diferentes partes do projeto em módulos, estes modulos ficam no código como variáveis globais. Uma das vantagens de se usar esse Design Pattern é que ele torna o entendimento do escopo js muito mais simples e fácil, diferente de se usar a criação de classes clássica que enche seu código com as palavras que muitas vezes nos confundem como o ```this``` e ```prototype```.

Primeiramente vamos pela maneira mais simples. A declaração de objeto literal (JSON). A desvantagem dessa abordagem é não consiguimos ter campos, propriedades nem métodos privados.

*Private Naming Conventions*
Uma convenção para tornar mais legível a declaração de variáveis privadas é usar **underline** antes do nome da variável ```var _exemplo```. Podemos usar essa convenção para apenas simular uma variavel privada mesmo ela estando publica.

```javascript
//repare no case da variavel global do módulo
var Modulo = {
	//private naming convention
	_counter: -1,
	init: function() {
		Modulo._counter++;
	},
	incrementar: function() {
		console.log(Modulo._counter++);
	}
};
```

Para usar variáveis realmente privadas precisamos do uso de *closures*.

```javascript
var Modulo = (function () {
	//o init já acontece neste escopo
	var _counter = -1;

	++_counter;

	//metodo privado
	var _getCounter = function() {
		return _counter;
	};

	return {
		incrementar: function() {
			console.log(_getCounter());
			return ++_counter;
		}
	};
})();//invoca instancia do módulo
```

Note que ao fim é retornado um objeto literal com o que será a parte pública do módulo. Também podemos fazer o mesmo da seguinte maneira:

```javascript
var Modulo = (function () {
	//o init já acontece neste escopo
	var modulo = {};

	var _counter = -1;

	++_counter;

	//metodo privado
	var _getCounter = function() {
		return _counter;
	};

	modulo.incrementar: function() {
		console.log(_getCounter());
		return ++_counter;
	};

	return modulo;
})();//invoca instancia do módulo
```

####3.3.1 Revealing Module Pattern

Neste pattern existe uma melhor separação do código que será retornado como a parte pública do módulo. Ajuda a organizar o código.

```javascript
var Modulo = (function () {
	var _counter = -1;

	_counter++;

	//metodo privado
	var _getCounter = function() {
		return _counter;
	};

	//metodo publico
	var incrementarCounter = function() {
		console.log(_getCounter());
		return ++_counter;
	};

	var _stringMalegna = 'I \u2661 JavaScript! \u{1F4A9}'

	//metodo publico
	var outroMetodo = function() {
		console.log(_stringMalegna);
	};

	//aqui vem a diferença, apenas *revelamos* os métodos escolhidos para serem públicos
	return {
		incrementar: incrementarCounter
		outro: outroMetodo
	};
})();
```

[Mais exemplos de Module Pattern](https://toddmotto.com/mastering-the-module-pattern/)

#4. Estilo de Codificação

Existem diferentes estilos de codificação, entre estes diferentes estilos podemos citar: [node](https://docs.npmjs.com/misc/coding-style), [jQuery](http://contribute.jquery.org/style-guide/js), [WordPress](https://make.wordpress.org/core/handbook/best-practices/coding-standards/javascript/), [Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js/), entre outros. A escolha de padrão depende da preferência dos programadores. Não se trata de escolha de certo ou errado, porém o importante é manter o padrão de uniformidade de código do inicio ao fim do projeto como se apenas um programador tivesse escrito o código por mais o projeto possua muitos contribuidores. Para isso definimos padrões. Eu sugiro usarmos no PI o padrão [WordPress](https://make.wordpress.org/core/handbook/best-practices/coding-standards/javascript/) e um verificador de código [Linting](https://en.wikipedia.org/wiki/Lint_%28software%29). Também podemos definir alguns padrões que temos preferência ao invés de usar cegamente o padrão do WordPress.

> Um verificador de código linting é um programa que verifica erros e problemas como não conformidade de código em arquivos. Geralmente programas de linting podem ser configurados para que se defina o padrão de código usado no projeto.

```javascript
//exemplo de padrão de código WordPress
var i;

if ( condition ) {
    doSomething( 'with a string' );
} else if ( otherCondition ) {
    otherThing({
        key: value,
        otherKey: otherValue
    });
} else {
    somethingElse( true );
}

// Unlike jQuery, WordPress prefers a space after the ! negation operator.
// This is also done to conform to our PHP standards.
while ( ! condition ) {
    iterating++;
}

for ( i = 0; i < 100; i++ ) {
    object[ array[ i ] ] = someFn( i );
    $( '.container' ).val( array[ i ] );
}

try {
    // Expressions
} catch ( e ) {
    // Expressions
}

//outros casos
var variaveis;

var CONSTANTES;

var Classes = function() {
    var _variavelPrivada;
}

var instanciaObjeto;

var NomeDeModulo;

objeto.metodoPublico = function() {
}

objeto.propriedadeOuCampoPublico = null;
```

#5. DOM

[Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model) é o objeto que representa os elementos html em js através de um objeto, o objeto ```document```. Podemos acessar os elementos, alterá-los, remove-los por js.

```html
<html>
	<head>
	</head>

	<body>
		<button type="button">Adicionar</button>

		<script src="code.js"></script>
	</body>
</html>
```
code.js:
```javascript
var adicionaItem = function() {
	alert('Item Adicionado');
};

// Primeiro é necessário criar um objeto que faz
// referência ao elemento no HTML:
var linkAddItem = document.getElementById('additem');

// Depois adicionamos a função "adicionaItem" à lista de
// funções que devem ser executadas quando o usuário clica
// na área do elemento no navegador:
linkAddItem.addEventListener('click', adicionaItem, false);
```

Entretanto existem diferenças de API js entre diferentes navegadores e versões de navegadores além de o uso nativo do DOM ser um verboso demais.

#6. jQuery

O jQuery é um framework js que utiliza a API do DOM com uma interface de programação (API) menos verbosa e torna as diferenças de navegadores transparentes ao programador. Abaixo a mesma ação feita em DOM no ultimo exemplo em jQuery.

```javascript
var adicionaItem = function() {
	alert('Item Adicionado');
};

$('#additem').on('click', adicionaItem);
```

Simples. O primeiro método do módulo ```jQuery```, também armazenado na variavel ```$``` é uma função que busca elementos no DOM através de query [*css selector*](http://www.w3schools.com/cssref/css_selectors.asp). O método ```on``` adicona o *event listener* no elemento.

Para mais exemplos e referência da [API jQuery Consulte aqui](https://api.jquery.com/) ou pergunte ao [Oráculo](google.com).

#7. Exercícios:

**1. Criar uma calculadora usando apenas ```HTML``` e ```javascript``` sem ```jQuery```, apenas ```DOM```.**

Referências: [metodos js em DOM](http://www.w3schools.com/js/js_htmldom_document.asp).

[Tudo o que precisaremos para este exercício](http://www.w3schools.com/js/js_htmldom_elements.asp).

	- A calculadora deve fazer as operações de:
		- Soma
		- Subtração
		- Divisão
		- Multiplicação



**2. Criar um gerenciador de lista de tarefas com ```jQuery``` e ```HTML```.**

Exemplo do que é uma lista de tarefas:

![lista de tarefas](http://etcandroid.com/wp-content/uploads/2015/04/google-keep-notes-and-lists-2.png)

Referências: [jQuery API](https://api.jquery.com/), [selectors](http://www.w3schools.com/jquery/jquery_ref_selectors.asp), [events](http://www.w3schools.com/jquery/jquery_ref_events.asp), [css methods](http://www.w3schools.com/jquery/jquery_ref_html.asp), [metodos de navegação html](http://www.w3schools.com/jquery/jquery_ref_traversing.asp), [curso inicial](http://www.w3schools.com/jquery/jquery_get_started.asp).

Tudo o que precisaremos para este exercício será usar o [selector de #id](http://www.w3schools.com/jquery/sel_id.asp), [metodo navegador find](http://www.w3schools.com/jquery/traversing_find.asp), o [evento de click](http://www.w3schools.com/jquery/event_click.asp), e os metodos [text](http://www.w3schools.com/jquery/html_text.asp), [val](http://www.w3schools.com/jquery/html_val.asp), [prop](http://www.w3schools.com/jquery/html_prop.asp), [remove](http://www.w3schools.com/jquery/html_remove.asp), [append](http://www.w3schools.com/jquery/html_append.asp), [prepend](http://www.w3schools.com/jquery/html_prepend.asp), [empty](http://www.w3schools.com/jquery/html_empty.asp) e [html](http://www.w3schools.com/jquery/html_html.asp). Talvez necessite de mais algum que pode ser encontrado nas referências.

	- Características necessárias da lista de tarefas:
		- Adicionar novas tarefas
		- Marcar tarefas como terminadas
		- Deletar tarefas
		- Opcional: buscar tarefas (mais complexo).





------------------------------------------------------------------------------------------

**Videos de apoio: [Playlist do Rodrigo Branas - Desvendando a Linguagem JavaScript](https://www.youtube.com/playlist?list=PLQCmSnNFVYnT1-oeDOSBnt164802rkegc)**
