/* Контроллер удаления заметки */

myAppSpace.controller.deleteTask = {
  destroy: function(event, idButton) {
    // Вызываем метод представления удаления заметки.
    myAppSpace.view.deleteTask.сonfirmDestroy(idButton);

    // Отменяем событие перехода по сслыке.
    event.preventDefault();
  }
};
