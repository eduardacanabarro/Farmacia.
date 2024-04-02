const express = require('express')
const cors = require('cors')
const fs = require('fs')

const dadosc = require('./dados.json')
const dadosf = require('./dados.json')
const dadosm = require('./dados.json')
const dadosv = require('./dados.json')

const server = express()
server.use(express.json())
server.use(cors())

server.listen(3000, () => {
    console.log('O servidor está funcionando');
});

server.get('/clientes', (req, res) => {
    return res.json(dadosc.Clientes)
});
server.get('/fornecedores', (req, res) => {
    return res.json(dadosf.Fornecedores)
});
server.get('/medicamentos', (req, res) => {
    return res.json(dadosm.Medicamentos)
});
server.get('/vendas', (req, res) => {
    return res.json(dadosv.Vendas)
});

//SELECT * FROM CLIENTES

//Create da API
server.post('/clientes', (req, res) => {
    const novoCliente = req.body

    if (!novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dadosc.Clientes.push(novoCliente)
        salvarDadosc(dadosc)

        return res.status(201).json({ mensagem: "Dados completos, cadastro realizado com sucesso" })
    }
})

//Read da API
server.get('/clientes', (req, res) => {
    return res.json(dadosc.Clientes)
})

//Funcao que salva os dados
function salvarDadosc() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dadosc, null, 2))
}

//Update da API
server.put('/clientes/:id', (req, res) => {
    const ClienteId = parseInt(req.params.id)
    const atualizarClient = req.body

    const indiceCliente = dadosc.Clientes.findIndex(c => c.id === ClienteId)

    if (indiceCliente === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" })
    } else {
        dadosc.Clientes[indiceCliente].nome = atualizarClient.nome || dadosc.Clientes[indiceCliente].nome
        dadosc.Clientes[indiceCliente].endereco = atualizarClient.endereco || dadosc.Clientes[indiceCliente].endereco
        dadosc.Clientes[indiceCliente].email = atualizarClient.email || dadosc.Clientes[indiceCliente].email
        dadosc.Clientes[indiceCliente].telefone = atualizarClient.telefone || dadosc.Clientes[indiceCliente].telefone

        salvarDadosc(dadosc)

        return res.status(201).json({ mensagem: "Dados completo, dados atualizados com sucesso" })
    }
})

// Delete da API
server.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id)

    //filtrar os Clientes, removendo pelo id correspondente

    dadosc.Clientes = dadosc.Clientes.filter(c => c.id !== id)

    salvarDadosc(dadosc)

    return res.status(200).json({ mensagem: "Cliente excluído com sucesso" })
})

//SELECT * FROM FORNECEDORES

//Create da API
server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body

    if (!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dadosf.Fornecedores.push(novoFornecedor)
        salvarDadosf(dadosf)

        return res.status(201).json({ mensagem: "Dados completos, cadastro realizado com sucesso" })
    }
})

//Read da API
server.get('/fornecedores', (req, res) => {
    return res.json(dadosf.Fornecedores)
})

//Funcao que salva os dados
function salvarDadosf() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dadosf, null, 2))
}

//Update da API
server.put('/fornecedores/:id', (req, res) => {
    const FornecedorId = parseInt(req.params.id)
    const atualizarClient = req.body

    const indiceFornecedor = dadosf.Fornecedores.findIndex(f => f.id === FornecedorId)

    if (indiceFornecedor === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado" })
    } else {
        dadosf.Fornecedores[indiceFornecedor].nome = atualizarClient.nome || dadosf.Fornecedores[indiceFornecedor].nome
        dadosf.Fornecedores[indiceFornecedor].endereco = atualizarClient.endereco || dadosf.Fornecedores[indiceFornecedor].endereco
        dadosf.Fornecedores[indiceFornecedor].telefone = atualizarClient.telefone || dadosf.Fornecedores[indiceFornecedor].telefone

        salvarDadosf(dadosf)

        return res.status(201).json({ mensagem: "Dados completo, dados atualizados com sucesso" })
    }
})

// Delete da API
server.delete('/fornecedores/:id', (req, res) => {
    const id = parseInt(req.params.id)

    //filtrar os Fornecedores, removendo pelo id correspondente

    dadosf.Fornecedores = dadosf.Fornecedores.filter(f => f.id !== id)

    salvarDadosf(dadosf)

    return res.status(200).json({ mensagem: "Fornecedor excluído com sucesso" })
})


//SELECT * FROM MEDICAMENTOS

//Create da API
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body

    if (!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dadosm.Medicamentos.push(novoMedicamento)
        salvarDadosm(dadosm)

        return res.status(201).json({ mensagem: "Dados completos, cadastro realizado com sucesso" })
    }
})

//Read da API
server.get('/medicamentos', (req, res) => {
    return res.json(dadosm.Medicamentos)
})

//Funcao que salva os dados
function salvarDadosm() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dadosm, null, 2))
}

//Update da API
server.put('/medicamentos/:id', (req, res) => {
    const MedicamentoId = parseInt(req.params.id)
    const atualizarMedicamento = req.body

    const indiceMedicamento = dadosm.Medicamentos.findIndex(m => m.id === MedicamentoId)

    if (indiceMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado" })
    } else {
        dadosm.Medicamentos[indiceMedicamento].nome = atualizarMedicamento.nome || dadosm.Medicamentos[indiceMedicamento].nome
        dadosm.Medicamentos[indiceMedicamento].fabricante = atualizarMedicamento.fabricante || dadosm.Medicamentos[indiceMedicamento].fabricante
        dadosm.Medicamentos[indiceMedicamento].preco = atualizarMedicamento.preco || dadosm.Medicamentos[indiceMedicamento].preco
        dadosm.Medicamentos[indiceMedicamento].quantidade = atualizarMedicamento.quantidade || dadosm.Medicamentos[indiceMedicamento].quantidade

        salvarDadosm(dadosm)

        return res.status(201).json({ mensagem: "Dados completo, dados atualizados com sucesso" })
    }
})

// Delete da API
server.delete('/medicamentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    //filtrar os Medicamentos, removendo pelo id correspondente

    dadosm.Medicamentos = dadosm.Medicamentos.filter(m => m.id !== id)

    salvarDadosm(dadosm)

    return res.status(200).json({ mensagem: "Medicamento excluído com sucesso" })
})


//SELECT * FROM Vendas

//Create da API
server.post('/vendas', (req, res) => {
    const novoVenda = req.body

    if (!novoVenda.data || !novoVenda.id_medicamento || !novoVenda.id_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dadosv.Vendas.push(novoVenda)
        salvarDadosv(dadosv)

        return res.status(201).json({ mensagem: "Dados completos, cadastro realizado com sucesso" })
    }
})

//Read da API
server.get('/vendas', (req, res) => {
    return res.json(dadosv.Vendas)
})

//Funcao que salva os dados
function salvarDadosv() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dadosv, null, 2))
}

//Update da API
server.put('/vendas/:id', (req, res) => {
    const VendaId = parseInt(req.params.id)
    const atualizarVenda = req.body

    const indiceVenda = dadosv.Vendas.findIndex(v => v.id === VendaId)

    if (indiceVenda === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrado" })
    } else {
        dadosv.Vendas[indiceVenda].data = atualizarVenda.data || dadosv.Vendas[indiceVenda].data
        dadosv.Vendas[indiceVenda].id_medicamento = atualizarVenda.id_medicamento || dadosv.Vendas[indiceVenda].id_medicamento
        dadosv.Vendas[indiceVenda].id_cliente = atualizarVenda.id_cliente || dadosv.Vendas[indiceVenda].id_cliente

        salvarDadosv(dadosv)

        return res.status(201).json({ mensagem: "Dados completo, dados atualizados com sucesso" })
    }
})

// Delete da API
server.delete('/vendas/:id', (req, res) => {
    const id = parseInt(req.params.id)

    //filtrar as Vendas, removendo pelo id correspondente

    dadosv.Vendas = dadosv.Vendas.filter(v => v.id !== id)

    salvarDadosv(dadosv)

    return res.status(200).json({ mensagem: "Venda excluída com sucesso" })
})