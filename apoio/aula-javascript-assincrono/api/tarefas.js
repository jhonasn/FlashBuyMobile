var mongoose = require('mongoose');

var Tarefa = mongoose.model('Tarefa', {
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
            Tarefa.update({ _id: req.body._id}, req.body, (err, numAffected) => {
                res.send(numAffected > 0);
            });
        } else {
            req.body.dataCriacao = new Date();
            delete req.body._id;
            var tarefa = new Tarefa(req.body);
            tarefa.save((err) => {
                res.send(req.body);
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