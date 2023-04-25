// Get  and Build Script

const baseUrl = 'http://127.0.0.1:5000';


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


async function run() {
    const table = document.getElementById('toDoList')
    const result = await getList();
    
    for(chore of result){
        const newRow = document.createElement('tr');

        const idData = document.createElement('td');
        idData.innerHTML = chore['id'];

        const choreData = document.createElement('td');
        choreData.innerHTML = chore['chores'];

        const statusData = document.createElement('td');
        statusData.innerHTML = chore['finished'] === true ? 'resolvido' : 'pendente';
        statusData.setAttribute('id', `status${chore['id']}`);

        const removeChore = document.createElement('td');
        const removeChoreButton = document.createElement('button');
        removeChoreButton.innerHTML = 'Remover Tarefa';
        removeChoreButton.setAttribute('value', chore['id']);
        removeChoreButton.addEventListener('click', deleteChore);
        removeChore.append(removeChoreButton);

        const updateChore = document.createElement('td');
        const updateChoreButton = document.createElement('button');
        updateChoreButton.innerHTML = 'Atualizar Status';
        updateChoreButton.setAttribute('value', chore['id']);
        updateChoreButton.addEventListener('click', updateChoreStatus)
        updateChore.append(updateChoreButton);
        

        newRow.append(idData);
        newRow.append(choreData);
        newRow.append(statusData);
        newRow.append(removeChore);
        newRow.append(updateChore);

        table.append(newRow);
        
    }
}

run()
    //     chore: document.getElementById('newChore').value,
//Post Script
function postNewChore(){
    const formData = new FormData();
    const chore = document.getElementById('newChore').value
    formData.append('chore', chore);
    formData.append('finished', false);
    console.log(formData)

    let url = `${baseUrl}/add_chore`;
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error:', error);
});
    location.reload();
}

const button = document.getElementById('submitButton');
button.addEventListener('click', postNewChore);


//Delete 

function deleteChore(event) {
    const choreId = event.target.value
    let url = baseUrl + '/delete_chore?id=' + choreId;
    fetch(url, {
        method: 'delete'
    })
        .then((response) => response.json())
        .catch((error) => {
        console.error('Error:', error);
        });
    location.reload()

}


function updateChoreStatus(event){
    const formData = new FormData();
    const id = event.target.value;
    const status = document.getElementById(`status${id}`).innerHTML === 'pendente' ? false : true;
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
    location.reload();
}



