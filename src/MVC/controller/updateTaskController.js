/* Контроллер редактирования заметки. */


myAppSpace.controller.updateTask = {
	initialize: function ( event, idButton ) {
		// Вызываем метод модели, загружающий экземпляры из localStorage.
		Task.loadAll();
		// Вызываем метод представления, который устанавливает интерфейс.
		myAppSpace.view.updateTask.setupUI( idButton );
		// Отменяем событие перехода по ссылке.
		event.preventDefault();
	}
};