var ListaTarefas = {
  tarefas: null,
  init: function () {
    ListaTarefas.tarefas = new Array();
    ListaTarefas.bindActions();
  },
  bindActions: function () {
    $('button#adicionar-tarefa').click(function () {
      var inputDescricao = $('input#descricao-nova-tarefa');

      var descricao = inputDescricao.val();
      ListaTarefas.adicionarNovaTarefa(descricao);

      inputDescricao.val('');//limpa campo
    });
  },
  buscarTarefaPorId: function (id) {
    var tarefa = ListaTarefas.tarefas.filter(function (t) {
      return t.id == id;
    });

    if(tarefa.length > 0) {
      return tarefa[0];
    } else {
      return null;
    }
  },
  adicionarNovaTarefa: function (descricao) {
    if(!descricao) {
      alert('Adicione uma descrição para adicionar uma nova tarefa');
    } else {
      var novaTarefa = ListaTarefas.criarNovaTarefa();
      novaTarefa.descricao = descricao;

      ListaTarefas.tarefas.push(novaTarefa);

      ListaTarefas.renderizarTarefas();
    }
  },
  deletarTarefa: function (id) {
    var tarefa = ListaTarefas.buscarTarefaPorId(id);

    if(tarefa) {
      var idx = ListaTarefas.tarefas.indexOf(tarefa);
      ListaTarefas.tarefas.splice(idx, 1);

      ListaTarefas.renderizarTarefas();
    } else {
      alert('erro ao recuperar tarefa a ser deletada');
    }
  },
  concluirTarefa: function (id, concluir) {
    var tarefa = ListaTarefas.buscarTarefaPorId(id);

    if(!concluir) {
      alert('as tarefas só podem ser concluidas uma vez e não podem ser "desconcluídas"');
      return;
    }

    if(tarefa) {
      tarefa.concluida = concluir;
      ListaTarefas.renderizarTarefas();
    } else {
      alert('erro ao recuperar tarefa a ser deletada');
    }
  },
  renderizarTarefas: function () {
    var html = '';
    for (var i = 0; i < ListaTarefas.tarefas.length; i++) {
      html += ListaTarefas.htmlTarefa(ListaTarefas.tarefas[i]);
    }

    var tbody = $('#lista-tarefas').find('table').find('tbody');
    tbody.html(html);
    //rebind events
    tbody.find('.terminar').change(function (e) {
      var id = $(this).closest('tr').attr('id');
      var concluida = $(this).prop('checked');

      ListaTarefas.concluirTarefa(id, concluida);
    });

    tbody.find('.deletar').click(function (e) {
      var id = $(this).closest('tr').attr('id');

      ListaTarefas.deletarTarefa(id);
    });
  },
  htmlTarefa: function (objTarefa) {
    //   <tr id="id-tarefa">
    //    <td><input type="checkbox" class="terminar" /></td>
    //    <td>descrição tarefa</td>
    //    <td><button type="button" class="deletar"></button></td>
    //  </tr>
    return '<tr id="' + objTarefa.id + '">' +
              '<td><input type="checkbox" class="terminar" ' + (objTarefa.concluida ? 'checked' : '') + ' /></td>' +
              '<td>' + objTarefa.descricao + '</td>' +
              '<td><button type="button" class="deletar">X</button></td>' +
            '</tr>';
  },
  //fábrica de obj tarefa
  criarNovaTarefa: function () {
    return {
      id: guid(),
      descricao: '',
      concluida: false
    }
  }
};

//gerador de id guid, ref: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

ListaTarefas.init();
