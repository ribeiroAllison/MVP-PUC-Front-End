
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
        removeChoreButton.setAttribute('id', chore['id']);
        removeChoreButton.innerHTML = 'Remover Tarefa';
        removeChore.append(removeChoreButton);
        statusData.innerHTML = chore['finished'] === true ? 'resolvido' : 'pendente';
        idData.innerHTML = chore['id'];
        choreData.innerHTML = chore['chores']
        newRow.append(idData);
        newRow.append(choreData);
        newRow.append(statusData);
        newRow.append(removeChore);
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
}

const button = document.getElementById('submitButton');
button.addEventListener('click', postNewChore)
