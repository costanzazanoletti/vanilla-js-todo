/* CONSTANTS */
const url = 'http://localhost:8080/api/todo';
const todoList = document.getElementById('todos');
const input = document.getElementById('todoInput');

/* API */
// all
const getAllTodos = () => {
  axios.get(url).then((response) => {
    const todos = response.data;
    if (todos != null && todos.length > 0) {
      addTodoList(todos);
    } else {
      addAlert();
    }
  });
};

// create
const postTodo = () => {
  const value = input.value;
  if (value != '') {
    axios
      .post('http://localhost:8080/api/todo', {
        todo: value,
        completed: false,
      })
      .then((response) => {
        getAllTodos();
        input.value = '';
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
// delete
const deleteTodo = (event) => {
  const id = event.target.closest('li').getAttribute('data-id');
  axios.delete(url + '/' + id).then((response) => {
    getAllTodos();
  });
};
// toggle completed
const toggleCompleted = (event) => {
  const id = event.target.closest('li').getAttribute('data-id');
  axios
    .get(url + '/' + id + '/toggle')
    .then((response) => {
      getAllTodos();
    })
    .catch((error) => {
      console.log(error);
    });
};

/* ADD DOM ELEMENTS */
// empty list message
const addAlert = () => {
  document.querySelector('#todos').innerHTML =
    '<h3 class="text-center">Nothing to do</h3>';
};
// todo delete button
const addBtn = (el) => {
  const btn = document.createElement('a');
  btn.className = 'btn btn-info text-light';
  const i = document.createElement('i');
  i.className = 'fas fa-trash-alt';
  btn.appendChild(i);
  btn.addEventListener('click', deleteTodo);
  el.appendChild(btn);
};
// toggle anchor
const addToggle = (el, todo) => {
  let a = document.createElement('a');
  el.className =
    'list-group-item d-flex justify-content-between align-items-center';
  a.innerHTML = todo.todo;
  a.className = todo.completed
    ? 'text-decoration-line-through'
    : 'text-decoration-none';
  a.href = '#';
  a.classList.add('link-secondary');
  a.addEventListener('click', toggleCompleted);
  el.appendChild(a);
};
// todo list item
const addTodo = (todo) => {
  let el = document.createElement('li');
  el.setAttribute('data-id', todo.id);
  addToggle(el, todo);
  addBtn(el);
  todoList.appendChild(el);
  return parent;
};
// todo list group
const addTodoList = (list) => {
  todoList.innerHTML = '';
  list.forEach((item) => {
    addTodo(item);
  });
};

/* INIT */
getAllTodos();
input.addEventListener('change', postTodo);
