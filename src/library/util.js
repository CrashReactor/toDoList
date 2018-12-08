/* Вспомогательные методы. */

var util = {
  // Проверка строки на пустую строку.
  isNonEmptyString: function(x) {
    return typeof(x) === "string" && x.trim() !== "";
  },

  // Создание элементов option для select ранга заметки.
  createOption: function(val, txt) {
    var element = document.createElement("option");
    element.value = val;
    element.text = txt;

    return element;
  },

  // Создание элемента select, перечисления ранга.
  fillSelectWithOptions: function(selectEl, selectionRange, optPar) {
    var i = 0,
	     optionEl = null,
	     options = [],
	     key = "",
	     obj = null,
	     displayProp = "";
				
    selectEl.innerHTML = "";
    selectEl.add(util.createOption("", " --- "));
    options = Array.isArray(selectionRange) ? selectionRange : Object.keys(selectionRange);

    for (i = 0; i < options.length; i++) {
      if (Array.isArray(selectionRange)) {
        optionEl = util.createOption(i + 1, options[i]);
      }
      selectEl.add(optionEl);
    }
  },

  // Создание элементов кнопок редактированния и удаление заметки.
  createButtons: function(id, typeOfButton) {
    var button = document.createElement("a"),
        checker = document.createElement("input");

    if( typeOfButton === "Show" ) {
      button.setAttribute("id", "show_" + id);
      button.setAttribute("class", "button-show");
      button.setAttribute("href", " ");
		button.addEventListener( "click", function(e) { 
			myAppSpace.controller.manageTasks.turnPopupTask( e, this );
		});
		button.innerHTML = "<img src='src/images/showEye.png'>";
		
      return button;
    }	
    else if (typeOfButton === "Update") {
      button.setAttribute("id", "update_" + id);
      button.setAttribute("class", "button-update");
      button.setAttribute("href", " ");
		button.addEventListener( "click", function(e) { 
			myAppSpace.controller.manageTasks.turnOnUpdate( e, this );
		});
		button.innerHTML = "<img src='src/images/pen.png'>";
		
      return button;
    } 
    else if (typeOfButton === "Delete") {
      button.setAttribute("id", "delete_" + id);
      button.setAttribute("class", "button-delete");
		button.addEventListener( "click", function(e) { 
			myAppSpace.controller.manageTasks.turnOnDelete( e, this );
		});
      button.setAttribute("href", " ");
		button.innerHTML = "<img src='src/images/trash.png'>";
		
      return button;
    } 
    else if ( typeOfButton === "Manage" ) {
      button.setAttribute("class", "button-manage");
      button.setAttribute("href", " ");
		button.innerHTML = "<img src='src/images/threeDotes.svg'>";
		
      return button;
    }
  },

  // Создание элементов fieldSet, перечисления статуса.
  createChoiceWidget: function(containerEl, fld, values, choiceWidgetType, choiceItems) {
    var j = 0,
	      el = null,
	      choiceControls = containerEl.getElementsByTagName('label');
    for (j = 0; j < choiceControls.length; j++) {
      containerEl.removeChild(choiceControls[j]);
    }
    if (!containerEl.hasAttribute("data-bind")) {
      containerEl.setAttribute("data-bind", fld);
    }

    if (values.length >= 1) {
      if (choiceWidgetType === "radio") {
        containerEl.setAttribute("data-value", values[0]);
      } else {
        containerEl.setAttribute("data-value", "[" + values.join() + "]");
      }
    }

    for (j = 0; j < choiceItems.length; j++) {
      el = util.createLabeledChoiceControl(choiceWidgetType, fld, j + 1, choiceItems[j]);
      if (values.includes(j + 1)) {
        el.firstElementChild.checked = true;
      }
      containerEl.appendChild(el);
      el.firstElementChild.addEventListener("click", function(e) {
        var btnEl = e.target,
	          i = 0,
	          values = [];
        if (containerEl.getAttribute("data-value") !== btnEl.value) {
          containerEl.setAttribute("data-value", btnEl.value);
        } else {
          btnEl.checked = false;
          containerEl.setAttribute("data-value", "");
        }
      });
    }

    return containerEl;
  },

  // Создание элементов radio для перечисления статуса.
  createLabeledChoiceControl: function(type, name, value, lbl) {
    var createEl = document.createElement("input"),
        lblEl = document.createElement("label");
    createEl.type = type;
    createEl.name = name;
    createEl.value = value;
    if ((value === 2 && name === "createState") || (value === 3 && name === "createState")) {
      createEl.setAttribute("disabled", true);
    }
    lblEl.appendChild(createEl);
    lblEl.appendChild(document.createTextNode(lbl));

    return lblEl;
  },

  // Конвертирование срока в миллисекунды.
  createDateInMilleseconds: function(exemplar) {
    var dates = exemplar,
	     year = dates.date.years * 31536000000,
	     months = dates.date.months * 2592000000,
	     days = dates.date.days * 86400000,
	     hours = dates.time.hours * 3600000,
	     minutes = dates.time.minutes * 60000,
	     totalDeadline = year + months + days + hours + minutes;

    return totalDeadline;
  },

  // Создание литерала срока.
  createAllDate(formElDeadline, formElTime) {
    var allDate = formElDeadline,
      years = allDate.slice(0, 4),
      months = allDate.slice(5, 7),
      days = allDate.slice(8),
      times = formElTime,
      hours = times.slice(0, 2),
      minutes = times.slice(3);

    var deadLineForCreate = {
      "date": {
        "years": years,
        "months": months,
        "days": days
      },
      "time": {
        "hours": hours,
        "minutes": minutes,
      },
      "deadlineInMilleseconds": 0
    };

    var milleSeconds = this.createDateInMilleseconds(deadLineForCreate);
    deadLineForCreate.deadlineInMilleseconds = milleSeconds;

    return deadLineForCreate;
  }
};
