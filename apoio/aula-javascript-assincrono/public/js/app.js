/// <reference path="lib/jquery.js" />

var ProjetoAula = {
    tarefas: [],
    template: null,
    elementos: {
        novaTarefa: null,
        $listaTarefas: null
    },
    init: function() {
        ProjetoAula.template = jQuery('template.tarefa').html();
        ProjetoAula.elementos.novaTarefa = jQuery('form[name=nova-tarefa]').get(0);
        ProjetoAula.elementos.$listaTarefas = jQuery('section.lista-tarefas ul.tarefas');
        ProjetoAula.listarTarefas();
    },
    listarTarefas: function() {
        jQuery.get('/api/tarefas')
            .success(function(data) {
                ProjetoAula.tarefas = data;
                ProjetoAula.renderizar();
            })
            .error(function(err) {
                alert('erro ' + err.status + ' ao buscar as tarefas do servidor');                
            });
    },
    salvar: function() {
        var tarefa = {
            _id: ProjetoAula.elementos.novaTarefa._id.value,
            concluida: false,
            titulo: ProjetoAula.elementos.novaTarefa.titulo.value,
            descricao: ProjetoAula.elementos.novaTarefa.descricao.value
        };

        $.ajax({
            method: 'PUT',
            url: '/api/tarefas',
            data: tarefa
        })
        .success(function(data) {

        })
        .error(function(err) {
            alert('não foi possivel adicionar a tarefa ' + tarefa.titulo + '. erro ' + err.status);
        });
    },
    remover: function(id) {
        var tarefa = ProjetoAula.tarefas.filter(function(tarefa) {
            return tarefa._id == id;
        });
        
        if(tarefa) {
            tarefa = tarefa[0];
        } else {
            alert('Tarefa não encontrada na aplicação.');
            return;
        }
        
        $.ajax({
            method: 'DELETE',
            url: '/api/tarefas',
            data: id
        })
        .success(function(data) {
            alert('registro')
        })
        .error(function(err) {
            alert('não foi possivel deletar a tarefa ' + tarefa.titulo + '. erro ' + err.status);
        });
    },
    limparNovaTarefa: function() {
        ProjetoAula.elementos.novaTarefa.titulo.value = '';
        ProjetoAula.elementos.novaTarefa.descricao.value = '';
        ProjetoAula.elementos.novaTarefa._id.value = '';
    },
    renderizar: function() {
        ProjetoAula.elementos.$listaTarefas.empty();

        ProjetoAula.tarefas.forEach(function(tarefa) {
            var $tarefa = jQuery(ProjetoAula.template);

            ProjetoAula.elementos.$listaTarefas.append($tarefa);
        });
    },
    
};

// jQuery.ready(ProjetoAula.init);
ProjetoAula.init();