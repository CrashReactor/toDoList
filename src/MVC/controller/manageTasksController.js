/* Панель управления контроллерами. */

myAppSpace.controller.manageTasks = {
  // Загружаем список задач в таблицу и регистрируем прослушивания событий
  initialize: function() {
  	
  	 // Вызов контроллера загрузки задач в таблицу.
    myAppSpace.controller.listTasks.loadListTasks();
    
    // Прослушивание клика по кнопке "создать задачу".
    document.getElementById("buttonCreateTask").addEventListener("click", myAppSpace.controller.manageTasks.turnOnCreate);
    
    // Прослушивание клика по кнопке "сортировка задач по "статусу".
    document.getElementById("sortByStatus").addEventListener("click", function(e) {
      myAppSpace.controller.manageTasks.turnOnSorting(e, this, "state");
    });
    
    // Прослушивание клика по кнопке "сортировка задач по рангу".
    document.getElementById("sortByRange").addEventListener("click", function(e) {
      myAppSpace.controller.manageTasks.turnOnSorting(e, this, "range");
    });
    
    // Прослушивание клика по кнопке "сортировка задач по скроку выполнения".
    document.getElementById("sortByDeadline").addEventListener("click", function(e) {
      myAppSpace.controller.manageTasks.turnOnSorting(e, this);
    });
    
    // Прослушивание выбора из списка "фильтрация задач по статусу".
    document.getElementById("filtrationByStatus").addEventListener("change", function() {
      myAppSpace.controller.manageTasks.turnOnfiltration(this, "state");
    });
    
    // Прослушивание выбора из списка "фильтрация задач по рангу".
    document.getElementById("filtrationByRange").addEventListener("change", function() {
      myAppSpace.controller.manageTasks.turnOnfiltration(this, "range");
    });
  },

  /* Обработчики событий, вызов контроллеров */
  // Вызов контроллера загрузки "просмотра задачи в попапе".
  turnPopupTask: function(e, idButton) {
    myAppSpace.controller.popupTask.loadPopupTasks(e, idButton);
  },
  
  // Вызов контроллера "создание задачи".
  turnOnCreate: function() {
    myAppSpace.controller.createTask.initialize();
  },
  
  // Вызов контроллека "редактирования задачи".
  turnOnUpdate: function(event, idButton) {
    myAppSpace.controller.updateTask.initialize(event, idButton);
  },
  
  // Вызов контроллера "удаление задачи из списка".
  turnOnDelete: function(event, idButton) {
    myAppSpace.controller.deleteTask.destroy(event, idButton);
  },
  
  // Вызов контроллера "сортировка задач".
  turnOnSorting: function(event, element, nameSort) {
    myAppSpace.controller.sortTasksController.sortTasks(event, element, nameSort);
  },
  
  // Вызов контроллера "фильтрация задач".
  turnOnfiltration: function(element, nameFilter) {
    myAppSpace.controller.sortTasksController.filterTasks(element, nameFilter);
  }
};
