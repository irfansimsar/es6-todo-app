let todos = [];
const $app = document.querySelector('.app');
const $inputHtml = '<input type="text" placeholder="please enter the task..." />';

const methods = {
  renderTodos: () => {
    todos.sort((a, b) => a.status > b.status ? -1 : 1 );

    let $todos = `
      <ul class="todos">
        ${todos.map(todo => `
          <li ${todo.status === 'done' ? 'class="done";' : ''}>
            ${todo.title}
            <div class="buttons">
              <button onclick="methods.checkAsDone('${todo.id}')">👌</button>
              <button onclick="methods.removeItem('${todo.id}')">👎</button>
            </div>
          </li>
        `).join('')}
      </ul>
    `;

    $app.innerHTML = `${$inputHtml} ${todos.length > 0 ? $todos : ''}`;

    let input = document.querySelector('input[type="text"]');
    input.focus();
    input.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) methods.addItem();
    });
  },
  addItem: () => {
    let input = document.querySelector('input[type="text"]')
    todos.push({
      id: `todo-${Date.now()}`,
      title: input.value,
      status: 'new'
    });
    input.value = '';
    
    methods.renderTodos();
  },
  removeItem: (id) => {
    todos = todos.filter(todo => todo.id !== id);
    methods.renderTodos();
  },
  checkAsDone: (id) => {
    let checkedTodo = todos.find(todo => todo.id === id);
    checkedTodo.status = 'done';
    methods.renderTodos();
  }
}

methods.renderTodos();
