// variables
const form = document.querySelector('#form');
const listContainer = document.querySelector('#listContainer');
let lists = [];

// EventListener
eventListeners();

function eventListeners() {

    form.addEventListener('submit', addTask);


    document.addEventListener('DOMContentLoaded', () => {
        lists = JSON.parse( localStorage.getItem('lists')) || [];

        console.log(lists);

        createHTML();
    })
}




// Funciones
function addTask (event) {
    event.preventDefault();


    const listArea = document.querySelector('#listArea').value

    
    if (listArea === '') {
        mostrarError('Un mensaje no puede ir vacio');

        return;
    }

    const listObj = {
        id: Date.now(),
        listArea
    }

    
    lists = [...lists, listObj];

    
    createHTML();

    
    form.reset();
}


function mostrarError (error) {
    const mensajeDeError = document.createElement('P');
    mensajeDeError.textContent = error;
    mensajeDeError.classList.add('error');

    // Insertar en el contenido
    const content = document.querySelector('#content');
    content.appendChild(mensajeDeError);

    // Elimina la alerta despues de tres segundos
    setTimeout(() => {
        mensajeDeError.remove();
    }, 3000);
}

function createHTML () {

    clearHTML();

    if ( lists.length > 0 ) {
        lists.forEach( listArea => {

            
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('delete-list');
            btnDelete.innerText = 'X';

            btnDelete.onclick = () => {
                deleteList(listArea.id);
            }

            const card = document.createElement('DIV');
            const p = document.createElement('P');
            card.classList.add('card');
            card.classList.add('text-lg');

            p.innerText = listArea.listArea;

            card.appendChild(btnDelete);

            listContainer.appendChild(card);
        })
    }

    sincronizarStorage();
}

function sincronizarStorage () {
    localStorage.setItem( 'lists', JSON.stringify(lists) );
}


function deleteList(id) {
    lists = lists.filter( listArea => listArea.id !== id );

    createHTML();
}


function clearHTML () {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
}