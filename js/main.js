let todoInput = document.querySelector('.todo__input');
let todoBtn  = document.querySelector('.todo__buttonTodos');
let todoList = document.querySelector('.todo__list');
let filterTodoOpt = document.querySelector('.filterTodo')
let alert = document.querySelector('.alert');

todoBtn.addEventListener('click', addTodo)
function addTodo(e){
  e.preventDefault();
  if(todoInput.value == ""){
    alert.classList.add('alertFailed');
    alert.innerHTML = "Isi list dengan benar!";
    setTimeout(() => {
      alert.classList.remove('alertFailed');
      alert.innerHTML = "";
    }, 1500);
    
  }else{
    let todoDiv = document.createElement('div');
    todoDiv.className = "todo";
    todoList.appendChild(todoDiv)
    // create li
    let todoListNew = document.createElement('li');
    todoListNew.className = "TodoItem";
    todoDiv.appendChild(todoListNew)
    todoListNew.appendChild(document.createTextNode(todoInput.value));
    saveTodosLocal(todoInput.value);
    alert.classList.add('alertWork');
    alert.innerHTML = "List telah berhasil di tambahkan!";
    setTimeout(() => {
      alert.classList.remove('alertWork');
      alert.innerHTML = "";
    }, 1500)
    // completed button
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.className = "completed__btn";
    todoDiv.appendChild(completedButton);
    // trash button
    let trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.className = "trash__btn";
    todoDiv.appendChild(trashBtn);
    todoInput.value = "";
  }
}

todoList.addEventListener('click', deleteTodo);
function deleteTodo(e){
  if(e.target.classList.contains('trash__btn')){
    let todo = e.target.parentElement;
    todo.classList.add('gone');
    deleteLocalTodo(todo)
    alert.classList.add('alertWork');
    alert.innerHTML = "List telah berhasil di hapus!";
    setTimeout(() => {
    alert.classList.remove('alertWork');
    alert.innerHTML = "";
  }, 1500)
    todo.addEventListener('transitionend', () => {
      todo.remove()
    })
  }
  // checkmark
  if(e.target.classList.contains('completed__btn')){
    const todoCheck = e.target.parentElement;
    todoCheck.classList.toggle('completed');
    alert.classList.add('alertWork');
    alert.innerHTML = "List telah completed!";
    setTimeout(() => {
      alert.classList.remove('alertWork');
      alert.innerHTML = "";
    }, 1500)
  }
}

filterTodoOpt.addEventListener('click',filterTodo)
function filterTodo(e){
  const todosFil = todoList.childNodes;
  todosFil.forEach(function(todo){
    const mStyle = todo.style; 
    // bisa menggunakan ini untuk menjalankan dibawah todo.nodeType == Node.ELEMENT_NODE
   if(mStyle != undefined && mStyle != null){
    switch(filterTodoOpt.value){
      case  "all":
        todo.style.display = "flex"; 
        break;
      case "completed":
        if(todo.classList.contains('completed')){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;
     }
   }
  });
}

function saveTodosLocal(todoSave){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // untuk menyimpan ke localstorage
  todos.push(todoSave)
  localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', getTodos)
function getTodos(){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todoSave) => {
    let todoDiv = document.createElement('div');
    todoDiv.className = "todo";
    todoList.appendChild(todoDiv)
    // create li
    let todoListNew = document.createElement('li');
    todoListNew.className = "TodoItem";
    todoDiv.appendChild(todoListNew)
    todoListNew.innerHTML = todoSave;
    todoListNew.appendChild(document.createTextNode(todoInput.value));
    // completed button
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.className = "completed__btn";
    todoDiv.appendChild(completedButton);
    // trash button
    let trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.className = "trash__btn";
    todoDiv.appendChild(trashBtn);
  })
}

function deleteLocalTodo(todoSave){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // console.log(todoSave.children[0].innerText)
  const todosIndex = todoSave.children[0].innerText;
  todos.splice(todos.indexOf(todosIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}