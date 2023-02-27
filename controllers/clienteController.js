const Cliente = require('../models/cliente')

module.exports = class ClienteController {

    static async inserir(req, res) {
        console.log(req.body);


        const cliente = new Cliente({
            nome: req.body.nome,
            cpf:req.body.cpf,
            idade:req.body.idade,
            dtnascimento:req.body.dtnascimento,
            telefone:req.body.telefone,
            email:req.body.email,
            endereco:req.body.endereco,
            nucarteiraMotorista:req.body.nucarteiraMotorista,
            anoVencimentoCarteira:req.body.anoVencimentoCarteira,
            FotoCarteira:req.body.FotoCarteira
            
        });

        cliente.save(cliente).then(data => {
            res.send(data);
        }).catch(error =>{
            res.status(500).send({mensagem: error.messege || `Erro ao tentar inserir os dados do cliente: ${cliente}.`});
        })
    }
}