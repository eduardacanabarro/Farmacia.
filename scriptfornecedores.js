const fornecedoresform = document.getElementById('fornecedor-form')
const fornecedoreslist = document.getElementById('fornecedor-list')
let fornecedoresArrayLength = 0

function listfornecedores() {
    fetch('http://localhost:3000/fornecedores')
        .then(response => response.json())
        .then(data => {
            fornecedoreslist.innerHTML = ''
            fornecedoresArrayLength = data.length;
            data.forEach(fornecedores => {
                const li = document.createElement('li')
                li.innerHTML = `Id: ${fornecedores.id} - Nome: ${fornecedores.nome} - Endereço: ${fornecedores.endereco} - Telefone: ${fornecedores.telefone}`

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', () => deletefornecedores(fornecedores.id));
                li.appendChild(deleteButton);

                const putButton = document.createElement('button');
                putButton.innerText = 'Alterar';
                putButton.addEventListener('click', () => putfornecedores(fornecedores.id));
                li.appendChild(putButton);

                fornecedoreslist.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error));
}

//Create

fornecedoresform.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = fornecedoresArrayLength + 1
    fetch('http://localhost:3000/fornecedores')
        .then(response => response.json())
        .then(data => {
            data.forEach(fornecedores => {
                if (fornecedores.id == id) {
                    id++;
                }
            });
            const nome = document.getElementById('nome').value
            const endereco = document.getElementById('endereco').value
            const telefone = document.getElementById('telefone').value

            fetch('http://localhost:3000/fornecedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, nome: nome, endereco: endereco, telefone: telefone })
            })
                .then(response => response.json())
                .then(() => {
                    listfornecedores()
                    fornecedoreseform.reset()
                })
                .catch(error => console.error('Erro:', error))
        })
});



//Delete

function deletefornecedores(fornecedoresId) {
    fetch(`http://localhost:3000/fornecedores/${fornecedoresId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(() => {
            listfornecedores(); 
        })
        .catch(error => console.error('Erro ao excluir usuário:', error));
}

//Put

function putfornecedores(fornecedoresId) {
    const nome = document.getElementById('nome').value
    const endereco = document.getElementById('endereco').value
    const telefone = document.getElementById('phone').value

    if (nome.trim() === '' && endereco.trim() === '' && telefone.trim() === '') {
        alert('Por favor, preencha um dos campos acima antes de fazer a alteração.')
    }

    fetch(`http://localhost:3000/fornecedores/${fornecedoresId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, endereco: endereco, telefone: telefone })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }
            return response.json();
        })
        .then(() => {
            listfornecedores(); 
        })
        .catch(error => console.error('Erro:', error));
}

listfornecedores()