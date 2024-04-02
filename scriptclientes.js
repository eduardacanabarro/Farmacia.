const clientesform = document.getElementById('cliente-form');
const clienteslist = document.getElementById('cliente-list');
let clientesArrayLength = 0;

function listclientes() {
    fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
            clienteslist.innerHTML = '';
            clientesArrayLength = data.length;
            data.forEach(clientes => {
                const li = document.createElement('li');
                li.innerHTML = `Id: ${clientes.id} - Nome: ${clientes.nome} - Email: ${clientes.email} -  Endereço: ${clientes.endereco} - Telefone: ${clientes.telefone}`;

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', () => deleteclientes(clientes.id));
                li.appendChild(deleteButton);

                const putButton = document.createElement('button');
                putButton.innerText = 'Alterar';
                putButton.addEventListener('click', () => putclientes(clientes.id));
                li.appendChild(putButton);

                clienteslist.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Create

clientesform.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = clientesArrayLength + 1;
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome: nome, endereco: endereco, telefone: telefone })
    })
        .then(response => response.json())
        .then(() => {
            listclientes();
            clientesform.reset();
        })
        .catch(error => console.error('Erro:', error));
});

// Delete

function deleteclientes(clientesId) {
    fetch(`http://localhost:3000/clientes/${clientesId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(() => {
            listclientes();
        })
        .catch(error => console.error('Erro ao excluir usuário:', error));
}

// Put

function putclientes(clientesId) {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('phone').value;

    if (nome.trim() === '' && endereco.trim() === '' && telefone.trim() === '' && email.trim() === '') {
        alert('Por favor, preencha um dos campos acima antes de fazer a alteração.');
    }

    fetch(`http://localhost:3000/clientes/${clientesId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, endereco: endereco, telefone: telefone, email: email})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }
            return response.json();
        })
        .then(() => {
            listclientes();
        })
        .catch(error => console.error('Erro:', error));
}

listclientes();
