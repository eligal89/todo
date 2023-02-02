
var gTodos
var gFilterBy = 'all'
const STORAGE_KEY = 'todosDB'
var gSortingBy = 'created'
var gIsSotring = false



_createTodos()

function getTodosForDisplay() {
    if (gIsSotring) return
    if (gFilterBy === 'all') return gTodos
    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
   
    saveToStorage(STORAGE_KEY, gTodos)
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
console.log('todo', todo);

    console.log('gTodos', gTodos);
    
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)
}

function addTodo(txt, num) {
    const todo = _createTodo(txt, num)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)
    console.log(todo, 'todo');
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSorting(sortingBy) {
    gIsSotring = true
    if (sortingBy === 'txt') sortByTxt()
    if (sortingBy === 'created') sortByCreated()
    if (sortingBy === 'importance') sortByImpotrance()
    gIsSotring = false
    console.log(gTodos);
    saveToStorage(STORAGE_KEY, gTodos)
}

function sortByTxt() {
    return gTodos.sort((t1, t2) => {
        const txt1 = t1.txt.toUpperCase()
        const txt2 = t2.txt.toUpperCase()
        if (txt1 > txt2) return 1;
        if (txt2 > txt1) return -1;
        return 0;
    });
}

function sortByCreated() {
    return gTodos.sort((t1, m2) => {
        return m2.created - t1.created;
    });
}

function sortByImpotrance() {
    return gTodos.sort((t1, t2) => {
        return t1.importance - t2.importance;
    });
}

function getTotalTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)

    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, num=1) {
    console.log('num', num);
    
    return {
        id: _makeId(),
        txt,
        isDone: false,
        num: num,
        createdAt: Date.now(),
        
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}