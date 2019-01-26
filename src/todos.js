import uuidv4 from 'uuid/v4'

let todos = []

const loadTodos = function () {
    const todosJSON = localStorage.getItem('todos')
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos


const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text, // text: text
        completed: false
    })
    saveTodos()
}

const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })
    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

export { createTodo, getTodos, removeTodo, toggleTodo }