
// Get Script

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
        console.log(error)
    }
}


async function run() {
    const table = document.getElementById('toDoList')
    const result = await getList();
    
    for(chore of result){
        const newRow = document.createElement('tr');
        const idData = document.createElement('td');
        const choreData = document.createElement('td');
        const statusData = document.createElement('td');
        const removeChore = document.createElement('td');
        const removeChoreButton = document.createElement('button');
        const updateChore = document.createElement('td');

        removeChoreButton.setAttribute('value', chore['id']);
        removeChoreButton.addEventListener('click', deleteChore)
        removeChoreButton.innerHTML = 'Remover Tarefa';
        removeChore.append(removeChoreButton);
        
        const updateChoreButton = document.createElement('button');
        updateChoreButton.setAttribute('value', chore['id']);
        updateChoreButton.addEventListener('click', updateChoreStatus)
        updateChoreButton.innerHTML = 'Atualizar Status';
        updateChore.append(updateChoreButton);
        statusData.innerHTML = chore['finished'] === true ? 'resolvido' : 'pendente';
        statusData.setAttribute('id', `status${chore['id']}`)
        idData.innerHTML = chore['id'];
        choreData.innerHTML = chore['chores']
        newRow.append(idData);
        newRow.append(choreData);
        newRow.append(statusData);
        newRow.append(removeChore);
        newRow.append(updateChore);
        table.append(newRow);
        
    }
}

run()



//Post Script
function postNewChore(){
    
    let data = {
        chore: document.getElementById('newChore').value,
        finished: false
    };

    $.ajax({
        type:'POST',
        url: baseUrl+'/add_chore',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response){
            console.log(response)
            
            
        },
        error: function(response){
            console.log(response)
            
        }
    });
    location.reload()
}

const button = document.getElementById('submitButton');
button.addEventListener('click', postNewChore)


//Delete 

function deleteChore(event) {
    const choreId = event.target.value
    console.log(choreId)
    $.ajax({
        type: 'DELETE',
        url: baseUrl + '/delete_chore/' + choreId,  // Replace with your API route URL
        success: function(response) {
        // Handle success response
        console.log(response);
        },
        error: function(error) {
        // Handle error response
        console.error(error);
        }
        
    });
    location.reload()
}


//update Chore

function updateChoreStatus(event){
    const id = event.target.value
    const status = document.getElementById(`status${id}`).innerHTML === 'pendente' ? false : true;
    console.log(status)
    
    let data = {
        id: id,
        finished: status
    };

    $.ajax({
        type:'POST',
        url: baseUrl+'/update_chore',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response){
            console.log(response)
            
            
        },
        error: function(response){
            console.log(response)
            
        }
    });
    location.reload()
}

