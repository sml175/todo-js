import './styles.css';

import { Todo, TodoList } from './classes'
import { crearTodoHtml } from './js/componentes';

// Creamos lista de tareas con export para usarla fuera de este index.js
export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );

console.log( 'todos' , todoList.todos);