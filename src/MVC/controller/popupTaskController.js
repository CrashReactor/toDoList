/* Контроллер попапа */

myAppSpace.controller.popupTask = {
  loadPopupTasks: function(event, element) {
    // Вызываем метод представления, который отобразит данные заметки в попап.	
    myAppSpace.view.popupTask.showTask(event, element);
    // Отменяем событие перехода по ссылке.
    event.preventDefault();
  }
};
