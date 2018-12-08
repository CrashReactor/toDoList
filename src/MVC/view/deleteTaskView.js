/* Представление удаления заметки. */

myAppSpace.view.deleteTask = {
  сonfirmDestroy: function(deleteButton) {
    // Подтверждаем удаление заметки.
    if (confirm("Would you like to delete this task?")) {
      var keyTask = deleteButton.id.slice(7), // Извлекаем ключ экземпляра из id кнопки.
        instTask = Task.instances[keyTask]; // Извлекаем экземпляр данного ключа.

      // Устанавливаем статус заметки, чтобы вызвать обработчик 
      // таймера срока преждевременно, который удалит таймер.
      instTask.state = 3;
      Task.timer(instTask);

      // Вызываем метод модели удаления заметки.
      Task.destroy(deleteButton.id);
      // Вызов метода, который удаляет заметку из таблицы.
      myAppSpace.view.deleteTask.deleteTaskFromList(deleteButton);
    }
  },

  // Удаляем заметку из таблицы.
  deleteTaskFromList: function(deleteButton) {
    var element = document.getElementById(deleteButton.id),
      tr = element.closest('tr'),
      child = tr;

    child.parentNode.removeChild(child);
  }
};
