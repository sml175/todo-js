import { Todo } from "./todo.class";

export class TodoList {
    
    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        // Añade el elemento que le pasamos
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        // La función filter devuelve todas las tareas excepto la que coincide con el id pasado por parámetro
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        // Recorremos el array de tareas
        for( const todo of this.todos) {
            // Si coinciden los id's marco o desmarco como completada
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        // La función filter devuelve todas las tareas excepto las no completadas
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        // Mediante JSON.stringify convertimos el array en un JSON String
        localStorage.setItem('todo', JSON.stringify( this.todos ));
    }

    cargarLocalStorage() {
        // Mediante JSON.parse convertimos un JSON String en array
        this.todos = ( localStorage.getItem('todo' ) )
                        ? JSON.parse( localStorage.getItem('todo') )
                        : [];
        // Permite convertir el array anterior de objetos, en array de Todo                
        // this.todos = this.todos.map( obj => Todo.fromJson( obj ) );                        
        // Es lo mismo que la línea anterior comentada porque coincide obj
        this.todos = this.todos.map( Todo.fromJson );                        
    }
}