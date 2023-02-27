const Promocao = require('../models/promocao')
const Cliente = require('../models/cliente')

module.exports = class PromocaoController {

    static async inserir(req, res) {
        console.log(req.body);

        const promocao = new Promocao({
            titulo: req.body.titulo,
            descricao:req.body.descricao,
            dtValidade:req.body.dtValidade
        
        });

        promocao.save(promocao).then(data => {
            res.send(data);
        }).catch(error =>{
            res.status(500).send({mensagem: error.messege || `Erro ao tentar inserir os dados da promoção: ${promocao}.`});
        })
    }

    static async ienviarPromocao(req, res) {
        const { id } = req.requery;

        const promocao = await Promocao.findById(id);
        const clientes = await Cliente.find({});

        //TODO: Enviar email para os clientes.

        res.json({'promocao': promocao, 'clientes':clientes});

    }

}