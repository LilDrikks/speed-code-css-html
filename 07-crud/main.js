'use strict'

const openModal = () => {
    const modalOpen = document.getElementById('modal')
    modalOpen.classList.add('active')
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active') 
    cleanFields()
}

let [iRodrigo, youPerson, youPerson2 ] = 
[
    {name: 'rodrigo',email: 'rodrigo@gmail.com',phone:'11999999999',city: 'São Paulo'},

    {name: 'person',email: 'person@gmail.com',phone:'11999999998',city: 'Rio de Janeiro'},

    {name: 'person2',email: 'person2@gmail.com',phone:'11992299998',city: 'Rio Doce'}
]

//CRUD - Create Read Update Delete

    //Constant that receives localStorage converted to JSON parse Object
    //(what comes from localstorage, comes as string and is converted to JSON)
    // if db_client is empty create and receive a new array empty 
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? []
   
    //Defines a dbclient key with dbclient value converted to JSON stringify
    //(what goes to localstorage, goes as JSON and is converted to strig)
const setLocalStorage = (dbClient) => localStorage.setItem('dbClient', JSON.stringify(dbClient)) 

    //Create C
const createClient = (client) => {   
    const dbClient = getLocalStorage()
    //Push client input a new client in array db_client
    dbClient.push(client)
    setLocalStorage(dbClient)
}
    //Read R
const readClient = () => getLocalStorage()

    //Update U
const updateClient = (index, client) => {
    const dbClient =  readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

    //Delete D
const deleteClient = (index) => {  
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

    //Receives client from editUpdate and increments inputs with the value of client
const fillFields = (client) => {
    document.getElementById('name').value = client.name
    document.getElementById('email').value = client.email
    document.getElementById('phone').value = client.phone
    document.getElementById('city').value = client.city
}
    //Get the editClient index and create the client with the index number
const editUpdate = (index) =>{
   const client = readClient()[index]
    fillFields(client)
   
}

    
    //1-Identifies the click event to select the action
    
const editClient = (event) => {
    //Select only buttons
    if(event.target.type == 'button'){
        //Identifies the click event and the button's innerText value
        if(event.target.innerText == 'editar'){
              
            //Create an array and separate the id value with -
            const [action, index] = event.target.id.split('-')
            //Check the action
            if(action == 'edit'){
                openModal()
                editUpdate(index)
                //2-Add index to dataset if action is edit
                const name = document.getElementById('name')
                name.dataset.index = index
            }
        }else{
            //If event is delete remove client from index
            const [action, index] = event.target.id.split('-')
            deleteClient(index)
            showDataClients()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">editar</button>
            <button type="button" class="button red" id="delete-${index}">excluir</button>
        </td>
    `
    const tableClient = document.querySelector('tbody')
    tableClient.appendChild(newRow)
}

const showDataClients = () => {
    document.querySelector('#tbody').innerHTML = ''
    const dataClients = readClient()
    dataClients.forEach(createRow)
}
showDataClients()

//Interação com o layout

const isValidFields = () => { 
    const formClient = document.getElementById('form').reportValidity()
    return formClient
}

const cleanFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => {
        field.value = ''
    })
}

const saveClient = () => {
    if(isValidFields()){
        const client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            city: document.getElementById('city').value
        }
        const index = document.getElementById('name').dataset.index
        if(index == 'new'){
            createClient(client)
            showDataClients()
            closeModal()
        }else{
            updateClient(index, client)
            showDataClients()
            closeModal()
        }
    }
}

const createClick = () => {
    const name = document.getElementById('name')
    name.dataset.index = 'new'
    console.log(name.dataset.index);
}

//EVENTS
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('cadastrarCliente').addEventListener('click', createClick)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('saveClient').addEventListener('click', saveClient)

document.getElementById('tbody').addEventListener('click', editClient)

