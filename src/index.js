import { renderTodos } from './views'
import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'

renderTodos()

document.querySelector('#search-input').addEventListener('input', function (e) {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#todo').addEventListener('submit', function (e) {
    e.preventDefault()
    const newTodoText = e.target.elements.todoText.value.trim()
    
    if (newTodoText.length > 0) {
        createTodo(newTodoText)
        renderTodos()
        e.target.elements.todoText.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

window.addEventListener('storage', (e) => {
    if(e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})