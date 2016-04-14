var mongoose = require('mongoose');

var Tarefa = mongoose.model('tarefas', {
    concluida: Boolean,
    titulo: String,
    descricao: String,
    dataCriacao: Date
});

module.exports = {
    get(req, res) {        
        var id = req.body._id || req.body;
        if(Object.keys(req.body).length == 0) id = null;
        
        if (id) {
            Tarefa.findById(req.param('id'), (err, tarefa) => {
                res.send(tarefa)
            });
        } else {
            Tarefa.find({}, (err, tarefas) => {
                res.send(tarefas);
            });
        }
    },
    put(req, res) {
        if(!req.body) res.send(204, { error: 'registro não informado' });
        if(req.body._id) {
            Tarefa.update({ _id: req.body._id}, req.body, (err, tarefas, affected) => {
                res.send(numAffected > 0);
            });
        } else {
            req.body.dataCriacao = new Date();
            delete req.body._id;
            if(req.body.concluida) req.body.concluida = JSON.parse(req.body.concluida);
            var tarefa = new Tarefa(req.body);
            tarefa.save((err, tarefa, affected) => {
                res.send(tarefa);
            });
        }
    },
    delete(req, res) {
        if(req.param('id')) {
            res.send('não implementado mas ok!');
        } else {
            res.send(404);
        }
    }
};