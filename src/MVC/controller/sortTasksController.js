/* Контроллер сортировки и фильтрации заметок */

myAppSpace.controller.sortTasksController = {
	// Метод сортировки заметок.
	sortTasks: function(event, element, nameSort) {
		// Вызываем метод модели, который загружает заметки из localStorage.
		Task.loadAll();
		// Вызываем метод представления, сортирующий заметки по заданному параметру.
		myAppSpace.view.sortTasksView.groupTasks(event, element, nameSort);
	},
	
	// Метод фильтрации заметок.
	filterTasks: function ( element, nameFilter ) {
		// Вызываем метод модели, который загружает заметки из localStorage.
		Task.loadAll();
		// Вызываем метод представления, фильтрующий заметки по заданному параметру.
		myAppSpace.view.sortTasksView.filterTasks( element, nameFilter );
	}
};