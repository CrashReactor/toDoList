/* Контроллер создания таблицы списка задач. */

myAppSpace.controller.listTasks = {
  loadListTasks: function() {
    // Загружаем из localStorage созданные экземпляры.
    Task.loadAll(); 
	 // Вызываем метод представления, создающий таблицу, отображаемых данных из созданных экземпляров.
	 myAppSpace.view.listTasks.setupUI();
  }
};