import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

const renderTodos = function () {
    const todoEl = document.querySelector('#todo-div')
    const filters = getFilters()
    const filterdTodos = getTodos().filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    // Calculate how many todos left
    const incompletedTodos = filterdTodos.filter(function (todo) {
        return !todo.completed
    }).length

    todoEl.innerHTML = ''

    // Add a h2 that shows how many todos left
    todoEl.appendChild(generatSummaryDOM(incompletedTodos))

    // add text of todos element as a dynamic paragraph
    if (filterdTodos.length > 0) {
        filterdTodos.forEach(function (todo) {
            todoEl.appendChild(generatTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        todoEl.appendChild(messageEl)
    }
}

const generatTodoDOM = function (todo) {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')
    const checkbox = document.createElement('input')
    const revomeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.type = 'checkbox' // checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', function () {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup todo Text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup todoEl
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup revomeButton 
    revomeButton.textContent = 'remove'
    revomeButton.classList.add('button', 'button--text')
    todoEl.appendChild(revomeButton)
    revomeButton.addEventListener('click', function () {
        removeTodo(todo.id)
        renderTodos()
    })
    return todoEl
}

const generatSummaryDOM = function (incompletedTodos) {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural = incompletedTodos === 1 ? '' : 's'
    summary.textContent = `you have ${incompletedTodos} todo${plural} left` 
    return summary
}

export { renderTodos, generatTodoDOM, generatSummaryDOM }