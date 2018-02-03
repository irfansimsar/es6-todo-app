let todos = window.localStorage.getItem('todoListTasks') ? JSON.parse(window.localStorage.getItem('todoListTasks')) : [];
const $app = document.querySelector('.app');
const $inputHtml = '<input type="text" placeholder="please enter the task..." />';
const $titleHtml = '<h1>📝 To Do App</h1>';

const methods = {
  renderTodos: () => {
    todos.sort((a, b) => a.status > b.status ? -1 : 1 );

    let $todos = `
      <ul class="todos">
        ${todos.map(todo => `
          <li ${todo.status === 'done' ? 'class="done";' : ''}>
            ${todo.title}
            <div class="buttons">
              ${todo.status === 'new' ? `<button onclick="methods.checkAsDone('${todo.id}')">👌</button>` : ''}
              <button onclick="methods.removeItem('${todo.id}')">👎</button>
            </div>
          </li>
        `).join('')}
      </ul>
    `;

    $app.innerHTML = `
      ${$titleHtml}
      ${$inputHtml}
      ${todos.length > 0 ? $todos : ''}
    `;

    let input = document.querySelector('input[type="text"]');
    input.focus();
    input.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) methods.addItem();
    });
  },
  updateLocalStorage: () => {
    window.localStorage.setItem('todoListTasks', JSON.stringify(todos));
  },
  updateTodos: () => {
    methods.updateLocalStorage();
    methods.renderTodos();
  },
  addItem: () => {
    let input = document.querySelector('input[type="text"]')
    if (input.value.length > 2) {
      todos.push({
        id: `todo-${Date.now()}`,
        title: input.value,
        status: 'new'
      });
      input.value = '';
      
      methods.updateTodos();
    } else {
      methods.showError('Error, task must be at least 3 characters...');
    }
  },
  removeItem: (id) => {
    todos = todos.filter(todo => todo.id !== id);
    methods.updateTodos();
  },
  checkAsDone: (id) => {
    let checkedTodo = todos.find(todo => todo.id === id);
    checkedTodo.status = 'done';
    methods.updateTodos();
  },
  showError: (errorText) => {
    const $input = document.querySelector('input[type="text"]');
    let $errorHtml = document.createElement('div');
    $errorHtml.className = 'error';
    $errorHtml.innerHTML = errorText;
    $input.parentNode.insertBefore($errorHtml, $input.nextSibling);

    setTimeout(() => {
      $errorHtml.remove();
    }, 800);
  }
}

methods.renderTodos();
