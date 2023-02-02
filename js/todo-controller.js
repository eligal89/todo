
function onInit() {
    // console.log('Ready')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    console.log('gTodos', gTodos);
    console.log('todos', todos);
    
    
    const strHTMLs = todos.map(todo => `
         <li onclick="onToggleTodo('${todo.id}')"
            class="${todo.isDone ? 'done' : ''}">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')">X</button> 
         </li> `)

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos-count').innerText = getTotalTodosCount()
    document.querySelector('.active-todos-count').innerText = getActiveTodosCount()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (confirm("Are you sure you want to delete this item?")) {
        removeTodo(todoId)
        renderTodos()
    } else return
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('input[name="todo-txt"]')
    const elInputNum = document.querySelector('input[name="importance"]')

    if (!elInput.value || !elInputNum.value) return

    console.log('elInputNum.value', elInputNum.value);
    addTodo(elInput.value, elInputNum.value)
    renderTodos()

    elInput.value = ''
    elInputNum.value = ''
}


function onSetFilter(filterBy) {
   
    setFilter(filterBy)
    renderTodos()
}

function onSorting(sortingBy){
    setSorting(sortingBy)
    renderTodos()
}

