/* Представление создания списка задач. */


myAppSpace.view.listTasks = {
  // Устанавливаем пользовательский интерфейс.
  setupUI: function () {
  	 // Извлекаем из хранилища модели экземпляры.
    var arrayTasks = Object.keys(Task.instances).map(function(key) {
      return Task.instances[key];
    });
    
    // Вызываем метод устанавивающий пользовательский интерфейс.
    this.displayPanel();
    
    // Предаём экземпляры методу создания таблицы задач.
    this.createTable(arrayTasks);
  },

  // Устанавливаем пользовательский интерфейс.
  displayPanel: function () {
    document.getElementById("createTask").style.display = "none";
    document.getElementById("updateTask").style.display = "none";
    document.getElementById("buttonsControl").style.display = "block";
    document.getElementById("listOfTasks").style.display = "block";
    document.getElementById("containerForHeader").style.display = "block";
    document.getElementById("popup").style.display = "none";
  },

  // Метод создания таблицы созданных задач.
  createTable: function (arrayOfKeys) {
    var i = 0, // Счётчик цикла.
        row = {}, // Ряд.
        key = "", // Экземпляр задачи.
        tableBodyEl = document.querySelector("table#books > tbody"),
        cell3, // Третья ячейка.
        showButton, // Кнопка вызова попапа.
        manageButton, // Кнопка отображающая другие кнопки, редактировать и удалить.
        updateButton, // Кнопка редактирования задачи.
        deleteButton; // Кнопка удаления задачи.

    // Сбрасываем предыдущее содержимое таблицы.
    tableBodyEl.innerHTML = ""; 
    
    // Цикл заполняющий таблицу данными созданных экземпляров.
    for (i = 0; i < arrayOfKeys.length; i++) {
      key = arrayOfKeys[i];
      row = tableBodyEl.insertRow(-1);
      
      // Создаём при помощи методов файла util.
      showButton = util.createButtons(key.isbn, "Show");
      manageButton = util.createButtons(key.isbn, "Manage");
      updateButton = util.createButtons(key.isbn, "Update");
      deleteButton = util.createButtons(key.isbn, "Delete");
      
      // Добаляем в ячейку кнопку вызова попапа.
      row.insertCell(0).appendChild(showButton);
      
      // Добаляем в ячейку имя задачи.
      row.insertCell(1).textContent = key.title;
      
      // Добавляем в ячейку значение статуса задачи из перечисления.
      cell3 = row.insertCell(2);
      cell3.setAttribute("class", StateEL.labels[key.state - 1]);
      cell3.innerHTML = "<div class='colorСircle'></div>" + StateEL.labels[key.state - 1];
      row.insertCell(3).textContent = RangeEL.labels[key.range - 1];
      
      // Проверяем, если флажок "создать бессрочную задачу" не отмечен, то
      if (key.deadline.withoutDeadline === false) {
        // добвляем в ячейку дату срока.
        row.insertCell(4).textContent = key.deadline.date.years + "-" +
          key.deadline.date.months + "-" +
          key.deadline.date.days + " (" +
          key.deadline.time.hours + ":" +
          key.deadline.time.minutes + ")";
      } else {
        // если отмечен, добавляем в ячейку "бессрочная"
        row.insertCell(4).textContent = "Without deadline";
      }
      
      // Добвляем в ячейку дату, когда задачи была выполнена. 
      row.insertCell(5).textContent = key.deadline.dateCompleted;
      
      // Добавляем в ячейки созданные кнопки.
      row.insertCell(6).appendChild(updateButton);
      row.insertCell(7).appendChild(deleteButton);
      row.insertCell(8).appendChild(manageButton);
    }

    // Обработчик события клик по кнопке отображения скрытых кнопок, редактировать и удалить.
    $(".button-manage").click(function() {
      var parents = $(this).parent();
      var deleteButton = $(parents).prevAll("td").children(".button-update");
      var updateButton = $(parents).prevAll("td").children(".button-delete");

      // Обработчик события
      (function(el1, el2) {
        if (el1.css("display") === "none") {
        	 // Если скрытые кнопки не были отображены, то показать их.
          el1.css("display", "block");
          el2.css("display", "block");
        } 
        // Если скрытые кнопки уже отображены, то скрыть их.
        else {
          el1.css("display", "none");
          el2.css("display", "none");
        }
      }(deleteButton, updateButton));

      // Прервать событие перехода по ссылке.
      return false;
    });
  }
};
