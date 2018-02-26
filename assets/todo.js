let todos = window.localStorage.getItem('todoListTasks') ? JSON.parse(window.localStorage.getItem('todoListTasks')) : [];
const $app = document.querySelector('.app');
const $titleComponent = '<h1>📝 To Do App</h1>';
const $inputComponent = `<div class="input-wrapper">
  <input type="text" placeholder="Please enter the task..." />
  <button type="button" onclick="methods.addItem()"><i class="icon">+</i></button>
</div>`;

const methods = {
  initAppInstallBanner: () => {
    if (window.deferredPromt) {
      alert('*here');
      deferredPromt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation');
        } else {
          console.log('User added to home screen');
        }
      });
    }
  },
  renderTodos: () => {
    todos.sort((a, b) => a.status > b.status ? -1 : 1 );

    let $todos = `
      <ul class="todos">
        ${todos.map(todo => `
          <li ${todo.status === 'done' ? 'class="done"' : ''}>
            ${todo.title}
            <div class="buttons">
            ${todo.status === 'done' ? `<button class="btn-delete" onclick="methods.removeItem('${todo.id}')"><i class="icon">×</i></button>` : ''}
            <button class="btn-done" onclick="methods.toggleItem('${todo.id}')"></button>
            </div>
          </li>
        `).join('')}
      </ul>
    `;

    $app.innerHTML = `
      ${$titleComponent}
      ${$inputComponent}
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
  toggleItem: (id) => {
    let checkedTodo = todos.find(todo => todo.id === id);
    checkedTodo.status = checkedTodo.status === 'done' ? 'new' : 'done';
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

setTimeout(() => {
  methods.initAppInstallBanner();
}, 1000)
