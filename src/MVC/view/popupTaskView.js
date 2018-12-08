myAppSpace.view.popupTask = {
  showTask: function(event, element) {
    var nameButton = element.id.slice(5), // Ключ экземпляра.
        task = Task.instances[nameButton], // Экземпляр.
        taskDeadline = task.deadline.withoutDeadline, // Чекбокс бессрочной заметки.
        taskStatus = StateEL.labels[task.state - 1]; // Статус экземпляра.
      
    // Вызываем метод устанавивающий пользовательский интерфейс.
    myAppSpace.view.popupTask.displayPanel();

    // Заполняем содержимое интерфейса данными экземпляра.
    document.getElementById("showTitle").innerHTML = task.title;
    document.getElementById("showDescribe").innerHTML = task.describe;
    document.getElementById("showStatus").innerHTML = StateEL.labels[task.state - 1];
    document.getElementById("showRange").innerHTML = RangeEL.labels[task.range - 1];
    if (taskDeadline === false) {
      document.getElementById("showDeadline").innerHTML = task.deadline.date.years + "-" + task.deadline.date.months + "-" +
        task.deadline.date.days + " (" + task.deadline.time.hours + ":" +
        task.deadline.time.minutes + ")";
    } else {
      document.getElementById("showDeadline").innerHTML = "Without deadline";
    }
    if (taskDeadline === false && taskStatus === "Completed" ||
      taskDeadline === true && taskStatus === "Completed") {
      document.getElementById("showComplited").innerHTML = task.deadline.dateCompleted;
    } else {
      document.getElementById("showComplited").innerHTML = "";
    }
    
    // Регистрируем прослушивание события клик по ссылке.
    document.getElementById("backPopup").addEventListener("click", function(e) {
    	// Отменяем событие переход по ссылке.
      e.preventDefault();
      // Вызываем метод устанавивающий пользовательский интерфейс.
      myAppSpace.view.listTasks.displayPanel();
    });
  },

  // Устанавливаем пользовательский интерфейс.
  displayPanel: function() {
    document.getElementById("updateTask").style.display = "none";
    document.getElementById("buttonsControl").style.display = "none";
    document.getElementById("listOfTasks").style.display = "none";
    document.getElementById("containerForHeader").style.display = "none";
    document.getElementById("popup").style.display = "block";
  }
};
