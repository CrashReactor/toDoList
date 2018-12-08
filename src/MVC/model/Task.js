/* Модель приложения. */

// Класс Task, функция конструктор.
function Task(records) {
  this.isbn = ""; // Ключ заметки.
  this.title = ""; // Имя заметки.
  this.describe = records.describe; // Описание заметки.
  this.range = 0; // Ранг заметки.
  this.state = 0; // Статус заметки.
  this.deadline = null; // Срок заметки.
  // Если аргументы есть, то проверяем ограничения.
  if (arguments.length > 0) { 
    // Если в местном хранилище нету экземпляра с таким ключом, то ...
    if (!Task.instances[records.isbn]) {
      this.setIsbn(records.isbn); // Проверяем ключ заметки.
    } else {
      this.isbn = records.isbn; // Если есть, то записываем свойство.
    }
    this.setTitle(records.title); // Проверяем имя заметки.
    this.setRange(records.range); // Проверяем ранг заметки.
    this.setState(records.state); // Проверяем статус заметки.
    this.setDeadline(records.deadline); // Проверяем срок заметки.
  }
}



// Местное хранилище экземпляров.
Task.instances = {};



/*  Проверка ограничений при помощи сеттеров и чекеров. */
// Проверяем ключ заметки, как номер ключа.
Task.checkIsbn = function(isbn) {
  // Если ключ не найден, то всё нормально, нарушение ограничения не найдено.
  if (!isbn) {
    return new NoConstraintViolation();
  } 
  // Если ключ экземпляра нестрока или пустая строка, то возвращаем класс ошибки,
  // "значение должно быть непустой строкой."
  else if (typeof(isbn) !== "string" || isbn.trim() === "") {
    return new RangeConstraintViolation(
      "The ISBN must be a non-empty string!");
  } 
  // Возвращаем класс, нарушение ограничения не найдено.
  else {
    return new NoConstraintViolation();
  }
};



// Проверяем ключ заметки, как индификационный номер.
Task.checkIsbnAsId = function(id) {
  var constraintViolation = Task.checkIsbn(id);
  //Если предыдущая проверка ограничения прошла успешно, то начинаем эту проверку.
  if ((constraintViolation instanceof NoConstraintViolation)) {
  	 // Если такого индификационного номера не найдено, то возврощаем класс ошибки,
  	 // "значение должно быть заполнено".
    if (!id) {
      constraintViolation = new MandatoryValueConstraintViolation(
        "A value for the ISBN must be provided!");
    } 
    // Если есть такой индификационный номер найден, то возвращаем класс ошибки,
    // "уже есть такой экземпляр с таким индификационным номером."
    else if (Task.instances[id]) {
      constraintViolation = new UniquenessConstraintViolation(
        "There is already a task record with this ISBN!");
    } 
    // Если нарушение ограничений не найдено, то всё ок.
    else {
      constraintViolation = new NoConstraintViolation();
    }
  }

  return constraintViolation;
};



// Устанавливаем проверку ключа заметки.
Task.prototype.setIsbn = function(isbn) {
  // Вызываем методы проверки нарушений ограничений.
  var validationResult = Task.checkIsbnAsId(isbn);
  // Если нарушений не найдено, то записываем свойсвто экземпляра. 
  if (validationResult instanceof NoConstraintViolation) {
    this.isbn = isbn;
  } 
  // Если обнаруженны нарушения ограничений, то выводим сообщение с ошибкой.
  else {
    throw validationResult;
  }
};



// Проверяем имя заметки.
Task.checkTitle = function(title) {
  // Если значение не найдено, то возвращаем класс ошибки,
  // "значение должно быть заполнено."
  if (title === undefined) {
    return new MandatoryValueConstraintViolation("A title must be provided!");
  } 
  // Если занчение пустая строка, то возвращаем класс ошибки,
  // "значение должно быть не непустая строка."
  else if (!util.isNonEmptyString(title)) {
    return new RangeConstraintViolation("The title must be a non-empty string!");
  } 
  // Если нарушение ограничений не найдено, то всё ок.
  else {
    return new NoConstraintViolation();
  }
};



// Устанавливаем проверку имени заметки.
Task.prototype.setTitle = function(title) {
  // Вызываем методы проверки нарушений ограничений.
  var validationResult = Task.checkTitle(title);
  // Если нарушений не найдено, то записываем свойсвто экземпляра. 
  if (validationResult instanceof NoConstraintViolation) {
    this.title = title;
  } 
  // Если обнаруженны нарушения ограничений, то выводим сообщение с ошибкой.
  else {
    throw validationResult;
  }
};



// Проверяем ранг заметки.
Task.checkRange = function(range) {
	// Если значение не найдено, то возвращаем класс ошибки,
  // "значение должно быть выбрано."
  if (range === undefined) {
    return new MandatoryValueConstraintViolation("Range must be provided!");
  } 
  // Если числовое значение ранга не целое число или 
  // меньше 1 или больше значение максимального значения перечисления, то возвращаем класс ошибки,
  // "невалидное значение ранга."
  else if (!Number.isInteger(range) || range < 1 || range > RangeEL.MAX) {
    return new RangeConstraintViolation("Invalid value for Range: " + range);
  } 
  // Если нарушение ограничений не найдено, то всё ок.
  else {
    return new NoConstraintViolation();
  }
};



// Устанавливаем проверку имени заметки.
Task.prototype.setRange = function(range) {
  // Вызываем методы проверки нарушений ограничений.
  var constraintViolation = Task.checkRange(range);
  // Если нарушений не найдено, то записываем свойсвто экземпляра. 
  if (constraintViolation instanceof NoConstraintViolation) {
    this.range = range;
  } 
  // Если обнаруженны нарушения ограничений, то выводим сообщение с ошибкой.
  else {
    throw constraintViolation;
  }
};



// Проверяем статус заметки.
Task.checkState = function(stateVol) {
  // Если значение статуса не найдено или значение NaN, то возвращаем класс ошибки,
  // "статус должен быть выбран."
  if (stateVol === undefined || isNaN(stateVol)) {
    return new MandatoryValueConstraintViolation("State must be provided!");
  } 
  // Если числовое значение статуса не целое число или 
  // меньше 1 или больше значение максимального значения перечисления, то возвращаем класс ошибки,
  // "невалидное значение статуса."
  else if (!Number.isInteger(stateVol) || stateVol < 1 || stateVol > StateEL.MAX) {
    return new RangeConstraintViolation("Invalid value for State: " + stateVol);
  } 
  // Если нарушение ограничений не найдено, то всё ок.
  else {
    return new NoConstraintViolation();
  }
};



// Устанавливаем проверку статуса заметки.
Task.prototype.setState = function(stateVol) {
  // Вызываем методы проверки нарушений ограничений.	
  var constraintViolation = Task.checkState(stateVol);
  // Если нарушений не найдено, то записываем свойсвто экземпляра. 
  if (constraintViolation instanceof NoConstraintViolation) {
    this.state = stateVol;
  } 
  // Если обнаруженны нарушения ограничений, то выводим сообщение с ошибкой.
  else {
    throw constraintViolation;
  }
};



// Проверяем время заметки.
Task.checkTime = function(time) {
	// Если значение времени пустая строка, то то возвращаем класс ошибки,
	// "необходимо выбрать время".
  if (time.hours === "" || time.minutes === "") {
    return new MandatoryValueConstraintViolation("A value for time must be provided!");
  } 
  // Если нарушение ограничений не найдено, то всё ок.
  else {
    return new NoConstraintViolation();
  }
};



// Проверяем дату заметки.
Task.checkDate = function(date) {
	// Если значение даты пустая строка, то то возвращаем класс ошибки,
	// "необходимо выбрать дату".
  if (date.years === "" || date.months === "" || date.days === "") {
    return new MandatoryValueConstraintViolation("A value for date must be provided!");
  } 
  // Если нарушение ограничений не найдено, то всё ок.
  else {
    return new NoConstraintViolation();
  }

};



// Устанавливаем проверку срока заметки.
Task.prototype.setDeadline = function(deadline) {
  // Если заметка со сроком, то вызываем методы проверки даты и времени.	
  if (deadline.withoutDeadline === false) {
    var constraintViolationDate = Task.checkDate(deadline.date);
    var constraintViolationTime = Task.checkTime(deadline.time);
    // Если проверка даты и времени прошли успешно, записываем свойство экземпляра.
    if (constraintViolationDate instanceof NoConstraintViolation && constraintViolationTime instanceof NoConstraintViolation) {
      this.deadline = deadline;
    } 
    // Если обнаруженны нарушения ограничений, то выводим сообщение с ошибкой.
    else {
      throw constraintViolation;
    }
  } 
  // Если заметка бессрочная, то записываем свойство в экземпляр.
  else if (deadline.withoutDeadline === true) {
    this.deadline = deadline;
  }
};




// Загрузка экземпляров из localStorage.
Task.loadAll = function() {
  var key = "", // Экземпляр.
    keys = [], // Список экземпляров.
    nmrOfTasks = 0, // Длина списка экземпляров.
    tasksString = "", // Данные из localStorage в виде строки.
    tasks = {}, // Список данных экземпляров.
    i = 0; // Счётчик цикла.
  // Если localStorage работает, то делаем запись в localStorage
  try {
    if (localStorage["tasks"]) {
      tasksString = localStorage["tasks"]; // Запись в localStorage.
    }
  } catch (e) {
  	 // Если localStorage не работает, то делаем выводим сообщение об ошибке.
    alert("Error when reading from Local Storage\n" + e);
  }

  // Если есть запись, то ...
  if (tasksString) {
  	 // Переводим данные строки в объект.
    tasks = JSON.parse(tasksString);
    // Создаём список ключей этих экземпляров.
    keys = Object.keys(tasks);
    // Узнаём длину списка.
    nmrOfTasks = keys.length;
    // Сообщаем сколько экземпляров было загружено из localStorage.
    console.log(nmrOfTasks + " tasks loaded.");
    
    // Создаём экземпляры.
    for (i = 0; i < nmrOfTasks; i++) {
    	// Данные текущего экземпляра.
      key = keys[i]; 
      // Создаём экземпляр из данных и записываем его в местное хранилище.
      Task.instances[key] = Task.convertRow2Obj(tasks[key]);
      // Вызываем функцию таймер, созданного экземпляра.
      Task.timer(Task.instances[key]);
    }
  }
};



// Метод, создающий и возвращающий экземпляр из переданных данных.
Task.convertRow2Obj = function(taskRow) {
  var task = {}; // Будующий экземпляр.
  // Если удалось создать экземпляр, передаём его оператору return.
  try {
    task = new Task(taskRow);
  } catch (e) {
  	 // Если нет, то выводим сообщение с ошибкой.
    console.log(e.constructor.name + " while deserializing a task row: " + e.message);
  }

  // Возвращаем готовый экземпляр.
  return task;
};



// Хранилище списка таймеров.
Task.arrayTimers = {};



// Метод, который создаёт таймер и отслеживает его срок истечения.
Task.timer = function(exemplar) {
  // Статус заметки.
  var statuz = StateEL.labels[exemplar.state - 1];

  // По истечении срока, функция изменит статус экземпляра и сохранит изменения в localStorage.
  function timers() {
  	 // Меняем статус "в процессе" на "просроченный".
    exemplar.state = StateEL.FAILED; 
    // Сохраняем экземпляр с изменёным статусом в местном хранилище.
    Task.instances[exemplar.isbn] = exemplar; 
    // Сохраняем изменения в localStorage.
    Task.saveAll(); 
    // Передаём просроченный экземпляр методу представления, который редактирует экземпляр в таблице.
    myAppSpace.view.updateTask.addTaskToList(Task.instances[exemplar.isbn]); 
  }

  // Если лимит времени таймера привышает допустимое значение. 
  function setLongTimeout(callback, timeout_ms) {
  	 // Если лимит времени таймера привышает допустимое значение, то возвращаем укороченное время. 
    if (timeout_ms > 2147483647) {
      return setTimeout(function() {
        setLongTimeout(callback, (timeout_ms - 2147483647));
      }, 2147483647);

    } 
    // Если не привышен, то запускаем таймер.
    else {
      return setTimeout(callback, timeout_ms);
    }
  }

  // Проверяем, если статус заметки "в процессе" и со сроком, то ..
  if (statuz === "Inprocess" && exemplar.deadline.withoutDeadline === false) {
  	 // Вычисляем время для таймера, вычитаем настоящее время от срока.
    var datesNow = new Date(),
      yearsNow = datesNow.getFullYear() * 31536000000,
      monthsNow = (datesNow.getMonth() + 1) * 2592000000,
      daysNow = datesNow.getDate() * 86400000,
      hoursNow = datesNow.getHours() * 3600000,
      minutesNow = datesNow.getMinutes() * 60000,
      totalDateNow = yearsNow + monthsNow + daysNow + hoursNow + minutesNow,
      totalDeadline = exemplar.deadline.deadlineInMilleseconds,
      timeForTimer = totalDeadline - totalDateNow;


    // Если есть уже существует такой таймер
    if (Task.arrayTimers.hasOwnProperty(exemplar.isbn) === true) {
    	// Если время таймера больше нуля, то стираем старый и вызываем новый.
      if (timeForTimer > 0) {
        // Стираем старый.
        clearTimeout(Task.arrayTimers[exemplar.isbn]);
        // Записываем новый и запускаем его.
        Task.arrayTimers[exemplar.isbn] = setLongTimeout(timers, timeForTimer);
      } 
      // Если времени истекло, то ...
      else {
        // Вызываем функцию, меняющую статус заметки.
        timers();
      }
    }
    // Если такого таймера нет, то создаём новый и запускаем его.
    else if (Task.arrayTimers.hasOwnProperty(exemplar.isbn) === false) {
    	// Если время таймера больше нуля, то вызываем новый.
      if (timeForTimer > 0) {
        Task.arrayTimers[exemplar.isbn] = setLongTimeout(timers, timeForTimer);
      } 
      // Если времени истекло, то вызываем функцию, меняющую статус заметки.
      else {
        timers();
      }
    }
    
  } 
  // Если статус заметки "выполнено" или "просрочено", то удаляем старый таймер.
  else if (statuz === "Completed" ||
    statuz === "Failed" ||
    (statuz === "Inprocess" && exemplar.deadline.withoutDeadline === true)) {
    clearTimeout(Task.arrayTimers[exemplar.isbn]);
  }
};



// Метод, который создаёт экземпляр.
Task.create = function(slots) {
  var task = null; // Экземпляр
  try {
    task = new Task(slots); // Создаём экземпляр.
  } catch (e) {
  	 // Если не удалось создать, выводим сообщение об ошибке.
    console.log(e.constructor.name + ": " + e.message);
    task = null;
  }
  // Если экземпляр создан, то ...
  if (task) {
  	 // Записываем новый экземпляр в местное хранилище.
    Task.instances[task.isbn] = task;
    // Сообщаем, что созданный новый экземпляр.
    console.log("Created!");
    // Сохраняем всё в localStorage.
    Task.saveAll();
    // Вызываем метод, который запустит таймер для этого экземпляра.
    Task.timer(slots);
  }
};



// Данный метод, редактирует созданный экземпляр.
Task.update = function(slots) {
  var task = Task.instances[slots.isbn], // Извлекаем созданный экземпляр из местного хранилища.
      noConstraintViolated = true, // Состояние процесса редактирования.
      updatedProperties = []; // Список, содержащий изменения данного экземпляра.
  
  // Проверяем изменённые свойства экземпляра и записываем их в список изменений.  
  try {
    if (task.title !== slots.title) {
      task.title = slots.title;
      updatedProperties.push("title");
    }
    if (task.title !== slots.describe) {
      task.describe = slots.describe;
      updatedProperties.push("describe");
    }
    if (task.range !== slots.range) {
      task.range = slots.range;
      updatedProperties.push("range");
    }
    if (task.state !== slots.state) {
      task.state = slots.state;
      updatedProperties.push("state");
    }
    if (task.deadline !== slots.deadline) {
      task.deadline = slots.deadline;
      updatedProperties.push("deadline");
    }
  } catch (e) {
  	 // Если ошибка, то сообщаем её код.
    console.log(e.constructor.name + ": " + e.message);
    noConstraintViolated = false;
  }
 
  // Если редактирование удалось, то выводим сообщение в которых указанны изменения текущей заметки.
  if (noConstraintViolated) {
    if (updatedProperties.length > 0) {
      console.log("Properties " + updatedProperties.toString() + " modified for task " + slots.isbn);
    } else {
      console.log("No property value changed for task " + slots.isbn + " !");
    }
  }

  // Сохраняем всё в localStorage.
  Task.saveAll();
  // Вызываем метод, который запустит таймер для этого экземпляра.
  Task.timer(task);
};



// Удаляем экземпляр.
Task.destroy = function(key) {
  var isbn = key.slice(7); // Ключ данного экземпляра.

  // Если такой экземпляр есть, то ... 
  if (Task.instances[isbn]) {
    console.log("Deleted!");
    // ... удаляем его из местного хранилища и ...
    delete Task.instances[isbn];
    // ... сохраняем всё localStorage.
    Task.saveAll();
  } else {
  	 // Если не удалось удалить экземпляр, выводим сообщение с ошибкой. 
    console.log("There is no task with ISBN " + isbn + " in the database!");
  }
};




// Сохраняем данные в localStorage.
Task.saveAll = function() {
  var tasksString = "", // Данные экземпляров в виде строки.
      error = false, // Ошибка.
      nmrOfTasks = Object.keys(Task.instances).length; // Список ключей экземпляров.

  // Сохраняем экземпляры из местного хранилища в localStorage.
  try {
  	 // Создаём строку данных из местного хранилища.
    tasksString = JSON.stringify(Task.instances);
    // Записываем строку в localStorage.
    localStorage["tasks"] = tasksString;
  } catch (e) {
  	 // Если не удалось сохранить, выводим сообщение об ошибке.
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }

  // Если всё прошло успешно, выводим сообщение с удачным сохраненинем.
  if (!error) {
    console.log(nmrOfTasks + " tasks saved.");
  }
};
