var mongoose = require('mongoose');

var Tarefa = mongoose.model('tarefas', {
    concluida: Boolean,
    titulo: String,
    descricao: String,
    dataCriacao: Date
});

var objectIdIsValid = mongoose.Types.ObjectId.isValid;

module.exports = {
    get: function(req, res) {
        if (objectIdIsValid(req.body.id)) {
            Tarefa.findById(req.body.id, function(err, tarefa) {
                res.send(tarefa)
            });
        } else {
            Tarefa.find({}, function(err, tarefas) {
                res.send(tarefas);
            });
        }
    },
    put: function(req, res) {
        if(!req.body) res.send(204, { error: 'registro não informado' });
        if(req.body._id) {
            Tarefa.update({ _id: req.body._id}, req.body, function(err, tarefas, affected) {
                res.send(numAffected > 0);
            });
        } else {
            req.body.dataCriacao = new Date();
            //if(req.body.concluida) req.body.concluida = JSON.parse(req.body.concluida);

            var tarefa = new Tarefa(req.body);
            tarefa.save(function(err, tarefa, affected) {
                res.send(tarefa);
            });
        }
    },
    delete: function(req, res) {
        if(objectIdIsValid(req.body.id)) {
            Tarefa.remove({ _id: req.body.id }, function(err) {
                res.send(true);
            });
        } else {
            res.send(404, { error: 'registro não encontrado.'});
        }
    }
};