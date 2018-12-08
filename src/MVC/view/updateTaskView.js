myAppSpace.view.updateTask = {
  // Метод устанавливает интерфейс и заполняет его данными редактируемой заметкой 	
  setupUI: function (button) {
    var nameButton = button.id.slice(7), // Ключ заметки.
        task = Task.instances[nameButton], // Экземпляр с данным ключом.
        formEl = document.forms['Update'], // Форма Update.
        withoutDeadline = formEl.withoutDeadline, // Чекбокс бессрочной заметки.
        rangeEl = formEl.updateRange, // Элементы ранга.
        stateFieldsetEl = formEl.querySelector("fieldset[data-bind='updateState']"),
        submitButton = formEl.commit, // Кнопка Submit.
        // Метод проверяющий Чекбокс бессрочной заметки и заполняющий поля формы, данными срока заметки.
        checkWithoutDL = function(opt) {
        	// Если заметка бессрочная.
        if (opt === 1) {
        	 // Блокируем поля даты и времени.
          document.getElementById("updateDeadLine").disabled = true;
          document.getElementById("updateTime").disabled = true;
          // Сбрасываем содержимое полей даты и времени.
          formEl.updateDeadLine.value = "";
          formEl.updateTime.value = "";
        } 
        // Если заметка со сроком.
        else if (opt === 2) {
        	 // Разблокироваем поля даты и времени.
          document.getElementById("updateDeadLine").disabled = false;
          document.getElementById("updateTime").disabled = false;
          // Заполняем содержимое полей данными заметки (дата и время).
          formEl.updateDeadLine.value = task.deadline.date.years + "-" + task.deadline.date.months + "-" + task.deadline.date.days;
          formEl.updateTime.value = task.deadline.time.hours + ":" + task.deadline.time.minutes;
        } else {
        	 // Разблокироваем поля даты и времени.
          document.getElementById("updateDeadLine").disabled = false;
          document.getElementById("updateTime").disabled = false;
          if (task.deadline.date !== undefined) {
          	// Заполняем содержимое полей данными заметки (дата и время). 
            formEl.updateDeadLine.value = task.deadline.date.years + "-" + task.deadline.date.months + "-" + task.deadline.date.days;
            formEl.updateTime.value = task.deadline.time.hours + ":" + task.deadline.time.minutes;
          }
        }
      };
      
    // Вызываем метод, устанавливающий пользовательский интерфейс.
    myAppSpace.view.updateTask.displayPanel();
    
    // Заполняем поля форм, данными заметки.
    // Сбрасываем предыдущее содержимое состояния.
    stateFieldsetEl.innerHTML = "";
    // Ключ заметки.
    formEl.updateIsbn.value = task.isbn;
    // Имя заметки.
    formEl.updateTitle.value = task.title;
    // Описание заметки.
    formEl.updateDescribe.value = task.describe;
    // Ранг заметки.
    util.fillSelectWithOptions(rangeEl, RangeEL.labels);
    formEl.updateRange.value = task.range;
    // Статус заметки.
    util.createChoiceWidget(stateFieldsetEl, "updateState", [task.state], "radio", StateEL.labels);

    // Проверяем чекбокс бессрочной заметки.
    // Если бессрочная, то ...
    if (task.deadline.withoutDeadline === true) {
    	// ... отмечаем чекбокс и
      formEl.withoutDeadline.checked = true;
      // ... вызываем метод проверяющий чекбокс.
      checkWithoutDL(1);
    } else {
    	// Сбрасываем отметку чекбокса и 
      formEl.withoutDeadline.checked = false;
      // ... вызываем метод проверяющий чекбокс.
      checkWithoutDL(2);
    }
    withoutDeadline.addEventListener("change", function() {
      if (withoutDeadline.checked === true) {
        checkWithoutDL(1);
      } else {
        checkWithoutDL(3);
      }
    });
    
    // Проверяем ограничения правильности заполнености форм.
    // Поле имени заметки.
    formEl.updateTitle.addEventListener("input", function() {
      formEl.updateTitle.setCustomValidity(Task.checkTitle(formEl.updateTitle.value).message);
    });
    // Список рангов заметки.
    rangeEl.addEventListener("change", function() {
      formEl.updateRange.setCustomValidity((!rangeEl.value) ? "A value must be selected!" : "");
    });
    // Радио состояния заметки.
    stateFieldsetEl.addEventListener("click", function() {
      formEl.updateState[0].setCustomValidity(
        (!stateFieldsetEl.getAttribute("data-value")) ? "A state must be selected!" : "");
    });
    // Поле даты заметки.
    formEl.updateDeadLine.addEventListener("input", function() {
      if (withoutDeadline.checked === false) {
        formEl.updateDeadLine.setCustomValidity(Task.checkDate(formEl.updateDeadLine.value).message);
      }
    });
    // Поле времени заметки.
    formEl.updateTime.addEventListener("input", function() {
      if (withoutDeadline.checked === false) {
        formEl.updateTime.setCustomValidity(Task.checkTime(formEl.updateTime.value).message);
      }
    });
    
    // Регистрируем прослушивания события submit.
    // При клике по submit, вызываем метод извлекающий данные из полей формы и ...
    // ... создающий литерал с этими данными для редактироваемого экземпляра.
    submitButton.addEventListener("click", this.сlickSubmit);
    formEl.addEventListener('submit', function(e) {
    	// Отменяем отправку данных на сервер.
      e.preventDefault();
      // Сбрасываем поля формы.
      formEl.reset();
    });
  },

  // Устанавливаем пользовательский интерфейс.
  displayPanel: function () {
    document.getElementById("createTask").style.display = "none";
    document.getElementById("updateTask").style.display = "block";
    document.getElementById("buttonsControl").style.display = "none";
    document.getElementById("listOfTasks").style.display = "none";
    document.getElementById("containerForHeader").style.display = "none";
    document.getElementById("popup").style.display = "none";
  },

  // Метод извлекающий данные из формы и проверяющий ограничения полей формы.
  сlickSubmit: function () {
    var formEl = document.forms['Update'], // Форма Update.
        withoutDeadline = formEl.withoutDeadline, // Чекбокс бессрочной даты.
        selectedOtherAvLangOptions = formEl.updateRange.selectedOptions, // Элементы списка ранга заметки.
        stateFieldsetEl = formEl.querySelector("fieldset[data-bind='updateState']"),
        oldSlots = Task.instances[formEl.updateIsbn.value], // Ещё не редактированный экземпляр.
        // Литерал для редактируемой заметки с новыми данными.
        slots = {
          isbn: formEl.updateIsbn.value,
          title: formEl.updateTitle.value,
          describe: formEl.updateDescribe.value,
          range: parseInt(formEl.updateRange.value),
          state: parseInt(stateFieldsetEl.getAttribute("data-value")),
          deadline: ""
        },
        // Создаём литерал даты и времени.
        allDate = util.createAllDate(formEl.updateDeadLine.value, formEl.updateTime.value);

    // Проверяем чекбокс бессрочной даты.
    // Если не отмечен, то ...
    if (withoutDeadline.checked === false) {
    	// ... добавляем в литерал для редактированного экземпляра, литерал с новой датой и временем.
      slots.deadline = allDate;
      // Отменяем отметку чекбокса.
      slots.deadline.withoutDeadline = false;
      // Сбрасываем данные даты выполнения заметки.
      slots.deadline.dateCompleted = "";
      
      // Проверяем ограничения полей формы.
      formEl.updateDeadLine.setCustomValidity(Task.checkDate(slots.deadline.date).message);
      formEl.updateTime.setCustomValidity(Task.checkTime(slots.deadline.time).message);
    } 
    // Если отмечен, создаём литерал для срока
    else if (withoutDeadline.checked === true) {
      slots.deadline = {
        "withoutDeadline": true,
        "dateCompleted": "",
        "deadlineInMilleseconds": 0
      };
    }

    // Если заметка выполнена то, записываем в редактируемый литерал, дату выполнения.
    if (slots.state === 2) {
      var datesNow = new Date(),
          totalDateNow = datesNow.getFullYear() + " " + (datesNow.getMonth() + 1) + " " +
          datesNow.getDate() + " " + datesNow.getHours() + ":" + datesNow.getMinutes();
      slots.deadline.dateCompleted = totalDateNow;
    }

    // Проверяем остальную часть полей на ограничения.
    formEl.updateTitle.setCustomValidity(Task.checkTitle(slots.title).message);
    formEl.updateRange.setCustomValidity(Task.checkRange(slots.range).message);
    formEl.updateState[0].setCustomValidity(Task.checkState(slots.state).message);

    // Если все ограничения не нарушены, то ...
    if (formEl.checkValidity()) {
    	// ... вызываем метод представления addTaskToList, который обновит отредактированную заметку в таблицу
      myAppSpace.view.updateTask.addTaskToList(slots);
      // ... вызываем метод модели, который перепишет экземпляр и сохранит его в localStorage. 
      Task.update(slots);
      // ... вызываем метод представления загружающий интерфейс таблицы.
      myAppSpace.view.listTasks.displayPanel();
    }
  },

  // Метод обновляющий данные заметки в таблице. 
  addTaskToList: function (slots) {
    var numberSpan = document.getElementById('update_' + slots.isbn), // Id кнопки.
        updateButton = util.createButtons(slots.isbn, "Update"), // Кнопка редактировать.
        deleteButton = util.createButtons(slots.isbn, "Delete"), // Кнопка удалить.
        taskDeadline = slots.deadline.withoutDeadline, // Бессрочность заметки.
        taskStatus = StateEL.labels[slots.state - 1], // Состоянием заметки.
        tr = numberSpan.closest('tr'); // Строка с данными заметки.

    // Добавляем кнопку попапа.
    tr.cells[0] = util.createButtons(slots.isbn, "Show"); 
    // Добвляем имя заметки.
    tr.cells[1].innerHTML = slots.title;
    // Устанавливаем и добавляем состояние заметки.
    tr.cells[2].setAttribute("class", StateEL.labels[slots.state - 1]);
    tr.cells[2].innerHTML = "<div class='colorСircle'></div>" + StateEL.labels[slots.state - 1];
    // Добавляем ранг заметки.
    tr.cells[3].innerHTML = RangeEL.labels[slots.range - 1];

    // Если заметка со сроком, то добваляем срок.
    if (taskDeadline === false) {
      tr.cells[4].innerHTML = slots.deadline.date.years + "-" + slots.deadline.date.months + "-" +
        slots.deadline.date.days + " (" + slots.deadline.time.hours + ":" +
        slots.deadline.time.minutes + ")";
    } 
    // Если заметка бессрочная, то добавляем запись "Without deadline".
    else {
      tr.cells[4].innerHTML = "Without deadline";
    }

    // Если заметка выполнена, то добвляем дату выполения.
    if (taskDeadline === false && taskStatus === "Completed" ||
      taskDeadline === true && taskStatus === "Completed") {
      tr.cells[5].innerHTML = slots.deadline.dateCompleted;
    } 
    // Если не выполнена, то оставляем пустым.
    else {
      tr.cells[5].innerHTML = "";
    }

    // Добавляем кнопки редактировать и удалить.
    tr.cells[6].innerHTML = "";
    tr.cells[6].appendChild(updateButton);
    tr.cells[7].innerHTML = "";
    tr.cells[7].appendChild(deleteButton);
  }
};
