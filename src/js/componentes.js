import { Todo } from '../classes';

import { todoList } from '../index';

// Referencia en index.html a <ul class="todo-list">
const divTodoList = document.querySelector('.todo-list');
// Referencia en index.html a <input class="new-todo"...>
const txtInput = document.querySelector('.new-todo');
// Referencia en index.xtml a <button class="clear-completed">
const btnBorrar = document.querySelector('.clear-completed');
// Referencia en index.html a <ul class="filters">
const ulFiltros = document.querySelector('.filters');
// Referencia en index.html a <a class="filtro"...>
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
    
    // HTML parametrizado que se va a insertar en index.html
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox"  ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // Creamos un <div> donde añadiremos el HTML anterior
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    // Para insertar en la página sólo nos interesa insertar el primer hijo del <div> que es <li> puesto que el HTML ya tiene un <ul> creado    
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Evento cuando se pulsa tecla en el input de tarea
txtInput.addEventListener('keyup', ( event )  => {
    // Si el usuario ha pulsado 'Enter' que tiene como código de tecla 13
    // y además ha escrito algo
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        console.log( txtInput.value );
        // Creamos una nueva tarea a partir de lo que ha introducido el usuario
        const nuevoTodo = new Todo( txtInput.value );
        // Insertamos la tarea anteriormente creada en la lista de tareas
        todoList.nuevoTodo( nuevoTodo );
        // Invocamos al método anterior para mostrar la nueva tarea en la página
        crearTodoHtml ( nuevoTodo );
        // Para que después de crear una tarea el input se quede vacío
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {
    // Para saber en que elemento hemos hecho click (label, button, input)
    const nombreElemento = event.target.localName;
    // Para recuperar el elemento <li>
    const todoElemento = event.target.parentElement.parentElement;
    // Para recuperar el valor del id del atributo data-id= en el HTML
    const todoId = todoElemento.getAttribute('data-id');

    // Si el click se ha realizado en el elemento input --> se marca o desmarca como completada la tarea
    if ( nombreElemento.includes('input')) {
        todoList.marcarCompletado( todoId );
        // Lo tacha o destacha en la página HTML
        todoElemento.classList.toggle('completed');
    // Si el click se ha realizado en el button --> elimina el elemento    
    } else if ( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        // Lo elimina de la página HTML
        divTodoList.removeChild( todoElemento );
    }
});

btnBorrar.addEventListener('click', () => {
    // Elimina de la lista de tareas aquellas completadas
    todoList.eliminarCompletados();
    // Los elimina de la página HTML de abajo hacia arriba
    for ( let i = divTodoList.children.length-1; i>=0; i--) {
        const elemento = divTodoList.children[i];
        // Si el elemento tiene la clase completed habrá que eliminarlo
        if ( elemento.classList.contains('completed')) {
            divTodoList.removeChild( elemento );
        }
    }
});

ulFiltros.addEventListener('click', (event) => {    
    const filtro = event.target.text;

    //Si no hay seleccionado un determinado filtro no hacemos nada
    if ( !filtro ){ return; }

    // Para que en la página se vea recuadrado el filtro que aplicamos
    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    // Recorremos los elementos
    for( const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
            // Para 'Pendientes' vamos a ocultar los completados
            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add('hidden');
                }
            break;
            // Para 'Completados' vamos a ocultar los no completados
            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }
    }
})