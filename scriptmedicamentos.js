const medicamentoform = document.getElementById('medicamento-form')
const medicamentolist = document.getElementById('medicamento-list')
let medicamentosArrayLength = 0

function listmedicamentos() {
    fetch('http://localhost:3000/medicamentos')
        .then(response => response.json())
        .then(data => {
            medicamentolist.innerHTML = ''
            medicamentosArrayLength = data.length;
            data.forEach(medicamento => {
                const li = document.createElement('li')
                li.innerHTML = `Id: ${medicamento.id} - Nome: ${medicamento.nome} - Fabricante: ${medicamento.fabricante} - Preço: ${medicamento.preco} - Quantidade: ${medicamento.quantidade}`

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', () => deletemedicamento(medicamento.id));
                li.appendChild(deleteButton);

                const putButton = document.createElement('button');
                putButton.innerText = 'Alterar';
                putButton.addEventListener('click', () => putmedicamento(medicamento.id));
                li.appendChild(putButton);

                medicamentolist.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error));
}

//Create

medicamentoform.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = medicamentosArrayLength + 1
    fetch('http://localhost:3000/medicamentos')
        .then(response => response.json())
        .then(data => {
            data.forEach(medicamento => {
                if (medicamento.id == id) {
                    id++;
                }
            });
            const nome = document.getElementById('nome').value
            const fabricante = document.getElementById('fabricante').value
            const preco = document.getElementById('price').value
            const quantidade = document.getElementById('quantidade').value

            fetch('http://localhost:3000/medicamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, nome: nome, fabricante: fabricante, preco: preco, quantidade: quantidade })
            })
                .then(response => response.json())
                .then(() => {
                    listmedicamentos()
                    medicamentoform.reset()
                })
                .catch(error => console.error('Erro:', error))
        })
});




//Delete

function deletemedicamento(medicamentoId) {
    fetch(`http://localhost:3000/medicamentos/${medicamentoId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(() => {
            listmedicamentos(); 
        })
        .catch(error => console.error('Erro ao excluir medicamento:', error));
}

//Put

function putmedicamento(medicamentoId) {
    const nome = document.getElementById('nome').value
    const fabricante = document.getElementById('fabricante').value
    const preco = document.getElementById('price').value
    const quantidade = document.getElementById('quantidade').value

    if (nome.trim() === '' && fabricante.trim() === '' && preco.trim() === '' && quantidade.trim() === '') {
        alert('Por favor, preencha um dos campos acima antes de fazer a alteração.')
    }

    fetch(`http://localhost:3000/medicamentos/${medicamentoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, fabricante: fabricante, preco: preco, quantidade: quantidade })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar medicamento');
            }
            return response.json();
        })
        .then(() => {
            listmedicamentos(); 
        })
        .catch(error => console.error('Erro:', error));
}

listmedicamentos()