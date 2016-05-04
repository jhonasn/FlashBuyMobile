var EstatisticasTrello = {
	dados: null,
	caminhoSalvar: null,
	init: function () {
		var fs = require('fs');

		if(process.argv.length < 3) {
			throw new Error('Passar caminho do arquivo a processar como parametro');
		}

		var caminhoArquivo = process.argv[2];

		if(caminhoArquivo.indexOf('.json') === -1) {
			throw new Error('Esse programa só suporta extensão .json');
		}

		if(!fs.existsSync(caminhoArquivo)) {
			throw new Error('O arquivo indicado como parametro não existe');
		}

        var extensao = 'json';

        if(process.argv[3]) {
            if(process.argv[3].toLowerCase() === 'html') {
                extensao = 'html';
            } else if(process[3].toLowerCase() !== 'json') {
                throw new Error('São suportadas apenas as extensões html e json como resultado.');
            }
        }


		EstatisticasTrello.caminhoSalvar = caminhoArquivo.replace('.json', '_processado.' + extensao);

		EstatisticasTrello.dados = fs.readFileSync(caminhoArquivo, 'utf8');

		try {
			EstatisticasTrello.dados = JSON.parse(EstatisticasTrello.dados);
		} catch (err) {
			throw new Error('Não foi possível converter o arquivo indicado. \n' + JSON.stringify(err));
		}
	},

	extraiTiposAcoes: function () {
		return EstatisticasTrello.dados.actions.reduce(function (acoes, acao, i) {
			if(!Array.isArray(acoes)) {
				if(acoes.type === acao.type) {
					return [ acoes.type ];
				} else {
					return [ acoes.type, acao.type ];
				}
			} else {
				if(!acoes.some(function(tipoAcao) { return tipoAcao === acao.type; })) {
					acoes.push(acao.type);
				}

				return acoes;
			}
		});
	},

	extraiDadosUsuarios: function(tiposAcoes) {
		return EstatisticasTrello.dados.members.map(function (usuario, i) {
			var acoes = EstatisticasTrello.dados.actions.filter(function (acao) {
				return acao.idMemberCreator === usuario.id;
			});

			var dadosUsuario = {
                userName: usuario.username,
                fullName: usuario.fullName,
                actions: {}
            };

			tiposAcoes.forEach(function (tipoAcao) {
				dadosUsuario.actions[tipoAcao] = acoes.filter(function (acao) {
					return acao.type === tipoAcao;
				}).length;
			});

			return dadosUsuario;
		});
	},

    criarHtml: function (tiposAcoes, dadosUsuarios) {
        var html = '<!DOCTYPE html>';
        html = '<html>';
        html += '<head>';
        html += '<meta charset="utf-8" />';
        html += '<title>Estatisticas Trello</title>';
        html += '</head>';
        html += '<body>';
        html += '<table border="1">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>userName</th>';
        html += '<th>fullName</th>';

        tiposAcoes.forEach(function(tipoDado) {
            html += ''.concat('<th>', tipoDado, '</th>');
        });

        html += '</tr>';
        html += '</thead>';

        html += '<tbody>';

        dadosUsuarios.forEach(function (usuario, i) {
            html += '<tr>';
            html += ''.concat('<td>', usuario.userName, '</td>');
            html += ''.concat('<td>', usuario.fullName, '</td>');

            tiposAcoes.forEach(function(tipoDado) {
                html += ''.concat('<td>', usuario.actions[tipoDado], '</td>');
            });

            html += '</tr>';
        });

        html += '</tbody>';
        html += '</table>';
        html += '</body>';
        html += '</html>';

        return html;
    },

	salvar: function (tiposAcoes, dadosUsuarios) {
		var fs = require('fs');
        if(EstatisticasTrello.caminhoSalvar.indexOf('.html') > -1) {
            dadosUsuarios = EstatisticasTrello.criarHtml(tiposAcoes, dadosUsuarios);
        } else {
            dadosUsuarios = JSON.stringify(dadosUsuarios);
        }

		fs.writeFileSync(EstatisticasTrello.caminhoSalvar, dadosUsuarios);
	},

	processar: function () {
		var tiposAcoes = EstatisticasTrello.extraiTiposAcoes();
		var dadosUsuarios = EstatisticasTrello.extraiDadosUsuarios(tiposAcoes);
		EstatisticasTrello.salvar(tiposAcoes, dadosUsuarios);
	}
};

EstatisticasTrello.init();
EstatisticasTrello.processar();
