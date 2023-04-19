
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
    console.log(result)
    for(chore of result){
        const newRow = document.createElement('tr');
        const idData = document.createElement('td');
        const choreData = document.createElement('td');
        const statusData = document.createElement('td');
        statusData.innerHTML = chore['finished'] === true ? 'resolvido' : 'pendente';
        idData.innerHTML = chore['id'];
        choreData.innerHTML = chore['chores']
        newRow.append(idData);
        newRow.append(choreData);
        newRow.append(statusData);
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
            console.log(data)
        }
    });
}

const button = document.getElementById('submitButton');
button.addEventListener('click', postNewChore)
