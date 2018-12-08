myAppSpace.view.createTask = {
  setupUI: function() {
    var formEl = document.forms['Create'], // Форма создать.
        rangeEl = formEl.createRange, // Элементы списка ранг.
        stateFieldsetEl = formEl.querySelector("fieldset[data-bind='createState']"), // Элементы радио, статус.
        withoutDeadline = formEl.withoutDeadline, // Чекбокс - создать бессрочную заметку
        submitButton = formEl.commit; // Кнопка создать.

    // Создаём перечисления при помощи методов util.
    //Сбрасываем содержимое предыдущее содержимое, элемента fieldset.
    stateFieldsetEl.innerHTML = "";
    // Вызываем метод, создающий элементы перечисления "ранг".
    util.fillSelectWithOptions(rangeEl, RangeEL.labels);
    // Вызываем метод, создающий элементы перечисления "статус".
    util.createChoiceWidget(stateFieldsetEl, "createState", [], "radio", StateEL.labels);

    // Регистрируем прослушивание события выбора чекбокса, withoutDeadline.
    withoutDeadline.addEventListener("change", function() {
    	// Если выбрано, то блокируем поля даты и времени.
      if (withoutDeadline.checked === true) {
        document.getElementById("createDeadLine").disabled = true;
        document.getElementById("createTime").disabled = true;
      } 
	   // Если не выбрано, то разблокироваем поля даты и времени.      
      else {
        document.getElementById("createDeadLine").disabled = false;
        document.getElementById("createTime").disabled = false;
      }
    });

    // Ограничения при заполнении формы.
	 // Регистрируем прослушивание события заполнения формы.
	 // Ключ заметки.
    formEl.createIsbn.addEventListener("input", function() {
      formEl.createIsbn.setCustomValidity(
        Task.checkIsbnAsId(formEl.createIsbn.value).message);
    });
    // Имя заметки.
    formEl.title.addEventListener("input", function() {
      formEl.createTitle.setCustomValidity(Task.checkTitle(formEl.createTitle.value).message);
    });
    // Ранг заметки.
    rangeEl.addEventListener("change", function() {
      formEl.createRange.setCustomValidity((!rangeEl.value) ? "A value must be selected!" : "");
    });
    // Статус заметки.
    stateFieldsetEl.addEventListener("click", function() {
      formEl.createState[0].setCustomValidity(
        (!stateFieldsetEl.getAttribute("data-value")) ? "A state must be selected!" : "");
    });
    // Срок заметки.
    formEl.createDeadLine.addEventListener("input", function() {
      if (withoutDeadline.checked === false) {
        formEl.createDeadLine.setCustomValidity(Task.checkDate(formEl.createDeadLine.value).message);
      }
    });
    // Бессрочная заметка.
    formEl.createTime.addEventListener("input", function() {
      if (withoutDeadline.checked === false) {
        formEl.createTime.setCustomValidity(Task.checkTime(formEl.createTime.value).message);
      }
    });
    
    // Регистрируем прослушивание события клик по кнопке submit, формы Create, вызывающий обработчик события.
	 submitButton.addEventListener("click", this.сlickSubmit);
	 // При передачи данных на сервер, события submit.
    formEl.addEventListener('submit', function(e) {
      formEl.reset(); // Сбрасываем все поля формы.
      e.preventDefault(); // Отменяем событие передачи данных на сервер.
    });
    
    // Вызываем метод, устанавливающий пользовательский интерфейс.
    myAppSpace.view.createTask.displayPanel();
  },

  // Устанавливаем пользовательский интерфейс.
  displayPanel: function() {
    document.getElementById("createTask").style.display = "block";
    document.getElementById("updateTask").style.display = "none";
    document.getElementById("buttonsControl").style.display = "none";
    document.getElementById("listOfTasks").style.display = "none";
    document.getElementById("containerForHeader").style.display = "none";
    document.getElementById("popup").style.display = "none";
  },

  // Обработчик события, клика кнопки submit.
  сlickSubmit: function() {
    var formEl = document.forms['Create'], // Форма создать.
        withoutDeadline = formEl.withoutDeadline, // Чекбокс - создать бессрочную заметку
        stateFieldsetEl = formEl.querySelector("fieldset[data-bind='createState']"),
        slots = { // Считываем все значения полей формы и заполняем ими литерал, будующего экземпляра.
        	 isbn: formEl.createIsbn.value,
        	 title: formEl.createTitle.value,
        	 describe: formEl.createDescribe.value,
        	 range: parseInt(formEl.createRange.value),
        	 state: parseInt(stateFieldsetEl.getAttribute("data-value")),
        	 deadline: {
          	 "withoutDeadline": withoutDeadline.checked,
          	 "dateCompleted": "",
          	 "deadlineInMilleseconds": 0
        	 }
        };

    // Проводим проверку ограничений, правильности заполнения полей формы.
    formEl.createIsbn.setCustomValidity(Task.checkIsbnAsId(slots.isbn).message);
    formEl.createTitle.setCustomValidity(Task.checkTitle(slots.title).message);
    formEl.createRange.setCustomValidity(Task.checkRange(slots.range).message);
    formEl.createState[0].setCustomValidity(Task.checkState(slots.state).message);

    // Если задача со сроком, то создаём литерал даты и времени.
    if (withoutDeadline.checked === false) {
      var allDate = util.createAllDate(formEl.createDeadLine.value, formEl.createTime.value);
      
      // Добавляем литерал даты и времени в литерал будующего экземпляра.
      slots.deadline.date = allDate.date;
      slots.deadline.time = allDate.time;
      slots.deadline.deadlineInMilleseconds = allDate.deadlineInMilleseconds;
      
      // Проводим проверку ограничений даты и времени.
      formEl.createDeadLine.setCustomValidity(Task.checkDate(slots.deadline.date).message);
      formEl.createTime.setCustomValidity(Task.checkTime(slots.deadline.time).message);
    }

    // Если проверка ограничений прошла успешно, то ...
    if (formEl.checkValidity()) {
      Task.create(slots); // ... передаём считанные данные методу модели.
      formEl.reset(); // ... сбрасываем поля формы.
      document.getElementById("createDeadLine").disabled = false;
      document.getElementById("createTime").disabled = false;
      document.getElementById("createDeadLine").value = "";
      document.getElementById("createTime").value = "";
    }
  }
};
