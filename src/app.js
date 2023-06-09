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
        mostrarError('No puedes agregar una tarea vacia');
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
    const form = document.querySelector('#form');
    form.appendChild(mensajeDeError);

    const alerta = mensajeDeError.querySelector('.error');

    if (alerta) {
        alerta.remove();
    }

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
            card.classList.add('card', 'text-lg',  'transition-all');

            p.innerText = listArea.listArea;

            card.appendChild(btnDelete);
            card.appendChild(p);

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