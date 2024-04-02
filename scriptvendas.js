const vendaform = document.getElementById('venda-form')
const vendalist = document.getElementById('venda-list')
let vendasArrayLength = 0

function listvendas() {
    fetch('http://localhost:3000/vendas')
        .then(response => response.json())
        .then(data => {
            vendalist.innerHTML = ''
            vendasArrayLength = data.length;
            data.forEach(venda => {
                const li = document.createElement('li')
                li.innerHTML = `Id: ${venda.id} - Data: ${venda.data} - Id do Medicamento: ${venda.idMedicamento} - Id do Cliente: ${venda.idCliente}`

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', () => deletevenda(venda.id));
                li.appendChild(deleteButton);

                const putButton = document.createElement('button');
                putButton.innerText = 'Alterar';
                putButton.addEventListener('click', () => putvenda(venda.id));
                li.appendChild(putButton);

                vendalist.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error));
}

//Create

vendaform.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = vendasArrayLength + 1
    fetch('http://localhost:3000/vendas')
        .then(response => response.json())
        .then(data => {
            data.forEach(venda => {
                if (venda.id == id) {
                    id++;
                }
            });
            const date = document.getElementById('date').value
            const idmedicamento = parseInt(document.getElementById('idMedicamento').value)
            const idcliente = parseInt(document.getElementById('idCliente').value)

            fetch('http://localhost:3000/vendas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, data: date, id_medicamento: idmedicamento, id_cliente: idcliente })
            })
                .then(response => response.json())
                .then(() => {
                    listvendas()
                    vendaform.reset()
                })
                .catch(error => console.error('Erro:', error))
        })
});



//Delete

function deletevenda(vendaId) {
    fetch(`http://localhost:3000/vendas/${vendaId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(() => {
            listvendas(); 
        })
        .catch(error => console.error('Erro ao excluir venda:', error));
}

//Put

function putvenda(vendaId) {
    const date = document.getElementById('date').value
    const idmedicamento = document.getElementById('id_medicamento').value
    const idcliente = document.getElementById('id_cliente').value

    if (date.trim() === '' && idmedicamento.trim() === '' && idcliente.trim() === '') {
        alert('Por favor, preencha um dos campos acima antes de fazer a alteração.')
    }

    fetch(`http://localhost:3000/vendas/${vendaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: date, id_medicamento: idmedicamento, id_cliente: idcliente })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar venda');
            }
            return response.json();
        })
        .then(() => {
            listvendas(); // Atualiza a lista de venda após atualização
        })
        .catch(error => console.error('Erro:', error));
}

listvendas()