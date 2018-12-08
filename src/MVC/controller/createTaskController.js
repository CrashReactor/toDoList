/* Контроллер создания задачи. */

myAppSpace.controller.createTask = {
  initialize: function() {
    // Устанавливаем пользовательский интерфейс (окна) создания задачи.
    myAppSpace.view.createTask.setupUI();
  }
};