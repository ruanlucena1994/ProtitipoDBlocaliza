const Reserva = require('../models/reserva')

module.exports = class ReservaController {

    static async inserir(req, res) {
        console.log(req.body);

        const reserva = new Reserva({
            placaCarro: req.body.placaCarro,
            cpfCliente:req.body.cpfCliente,
            status:req.body.status,
            dtInicio:req.body.dtInicio,
            dtFim:req.body.dtFim
            
        });

        reserva.save(reserva).then(data => {
            res.send(data);
        }).catch(error =>{
            res.status(500).send({mensagem: error.messege || `Erro ao tentar inserir os dados da reserva: ${reserva}.`});
        })
    }

    static async buscar(req, res) {
        console.log(req.body);

        Reserva.findOne({cpfCliente : req.body.cpfCliente}).then(data => {
            if(!data) {
                return res.status(404).json({'mensagem':`reserva pelo cpfCliente: ${req.body.cpfCliente} não encontrada.`});
            }

            res.send(data);
        }).catch(error =>{
            res.status(500).send({mensagem: error.messege || `Erro ao tentar buscar os dados da reserva pelo CPF do cliente: ${cpfCliente}.`});
        })
    }

    static async atualizar(req, res) {
        console.log(req.body);

        const { id} = req.query; 

        Reserva.findByAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if(!data) {
                res.status(404).send({mensagem: `Não conseguiu encontrar reserva com Id: ${id}`});
            }else res.send({ mensagem: `Reserva Id: ${id} atualizada com sucesso.`});

    
        }).catch(error =>{
            res.status(500).send({mensagem: error.messege || `Erro ao tentar atualizar os dados da reserva pelo Id: ${Id}.`});
        })

    }
}

