const Carro = require('../models/carro')

module.exports = class CarroController {

    static async inserir(req, res) {
        console.log(req.body);

        const carro = new Carro({
            placa:req.body.placa,
            ano:req.body.ano,
            modelo:req.body.modelo,
            tipo:req.body.tipo,
            quilometragem:req.body.quilometragem,
            observacao:req.body.observacao,
        });

        carro.save(carro).then(data => {
            res.send(data);
        }).catch(error =>{
            res.status(500).send({mensagem: error.messege || `Erro ao tentar inserir os dados do carro: ${carro}.`});
        })
    }

    static async buscarPlaca(req, res) {

        Carro.findOne({placa : req.body.placa}).then(data => {
            if(!data) {
                return res.status(404).json({'mensagem':`Carro pelo placa: ${req.body.placa} não encontrada.`});
            }

            res.send(data);
        }).catch(error =>{
            res.status(500).send({mensagem: error.messege || `Erro ao tentar buscar os dados do carro pela placa: ${placa}.`});
        })
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndRemove(id, {userFindAndModify: false}).then(data => {
            if(!data) {
               res.status(404).json({'mensagem':`Carro pelo id: ${id} não encontrada.`});
            }else res.send({mensagem: `Carro com id: ${id} removido com sucesso.`});
        }).catch(erro => {
            res.status(500).send({mensagem: error.messege || `Erro ao tentar remover os dados do carro pelo id: ${id}.`});
        });
        
    }

}