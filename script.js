// Get  and Build Script

const baseUrl = 'http://127.0.0.1:5000';


// Função assíncrona que requisita todas as tarefas contidas no banco de dados através da rota /get_list
async function getList(){
    const endPoint = '/get_list';
    const urlToFetch = `${baseUrl}${endPoint}`;

    try{
        const response = await fetch(urlToFetch);
        
        if(response.ok){
            let jsonResponse = await response.json()
            return jsonResponse
            
            
        }
    } catch(error){
        console.log(error);
    }
};


//Função que manipula o DOM para exibir as tarefas do BD e cria botões para manipulação de status e exclusão
//de tarefas  
async function run() {
    const table = document.getElementById('toDoList')
    const result = await getList();
    
    for(chore of result){
        // cria uma linha para cada tarefa
        const newRow = document.createElement('tr'); 

        // cria e preenche os dados de ID da nova linha
        const idData = document.createElement('td'); 
        idData.innerHTML = chore['id'];

        // cria e preenche os dados com a descrição da tarefa
        const choreData = document.createElement('td');
        choreData.innerHTML = chore['chores']; 

        //cria e preenche os status como resolvido ou pendente, de acordo com o valor do atributo finished do objeto
        const statusData = document.createElement('td');
        statusData.innerHTML = chore['finished'] === true ? 'resolvido' : 'pendente';
        statusData.setAttribute('id', `status${chore['id']}`);

        //cria um botão para deletar a tarefa e vincula o evento click à função deleteChore
        const removeChore = document.createElement('td');
        const removeChoreButton = document.createElement('button');
        removeChoreButton.innerHTML = 'Remover Tarefa';
        removeChoreButton.setAttribute('value', chore['id']); //define o atributo 'value' do botão para o ID da tarefa. Será usado depois para identificar a tarefa a ser deletada no caso de click.
        removeChoreButton.addEventListener('click', deleteChore);
        removeChore.append(removeChoreButton);

        //cria um botão para atualizar o status da tarefa e vincula o evento click à função updateChoreStatus
        const updateChore = document.createElement('td');
        const updateChoreButton = document.createElement('button');
        updateChoreButton.innerHTML = 'Atualizar Status';
        updateChoreButton.setAttribute('value', chore['id']);
        updateChoreButton.addEventListener('click', updateChoreStatus)
        updateChore.append(updateChoreButton);
        

        //adicona todas os TDs à linha de cada tarefa
        newRow.append(idData);
        newRow.append(choreData);
        newRow.append(statusData);
        newRow.append(removeChore);
        newRow.append(updateChore);

        //adiona a linha com os dados preenchidos à tabela
        table.append(newRow);
        
    }
}

run() //executa função acima

//Post Script - Função para adicionar uma nova tarefa ao enviar dados ao back-end pela rota add_chore
function postNewChore(){
    const formData = new FormData();
    const chore = document.getElementById('newChore').value // pega os dados preenchidos pelo usuário no campo para adicionar novas funções
    formData.append('chore', chore);
    formData.append('finished', false);


    let url = `${baseUrl}/add_chore`;
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error:', error);
});
    location.reload(); //refresh na página para exibir nova tarefa
}

const button = document.getElementById('submitButton');
button.addEventListener('click', postNewChore);



//Delete Script - Deleta uma tarefa do BD enviando dados ao back-end pela rota /delete_chore
function deleteChore(event) {
    const choreId = event.target.value // atributo 'value' do botão é igual ao ID da tarefa no BD
    let url = baseUrl + '/delete_chore?id=' + choreId; //deleta a funcão com o match de id
    fetch(url, {
        method: 'delete'
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error:', error);
        });
    location.reload() //refresh na página para exibir nova lista de tarefas

}

// Update Script - Atualiza o status da tarefa ao mandar dados para o back-end pela rota /update_chore
function updateChoreStatus(event){
    const formData = new FormData();
    const id = event.target.value; //Atributo value do botão é igual ao id da tarefa no BD
    const status = document.getElementById(`status${id}`).innerHTML === 'pendente' ? false : true; //alterna o status entre true e false
    formData.append('id', id);
    formData.append('finished', status);
    

    let url = `${baseUrl}/update_chore`;
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error:', error);
});
    location.reload(); //refresh na página para exibir status atualizado
}



