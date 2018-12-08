/* Представление сортировки и фильтрации заметок по заданному параметру. */

myAppSpace.view.sortTasksView = {
  // Метод сортировки заметок.	
  groupTasks: function(event, element, nameSort) {
    // Создаём список экземпляров.
    var arrOfKeys = Object.keys(Task.instances).map(function(key) {
        return Task.instances[key];
      }),
      // Сортировка.
      filtration = function(n) {
        var filtredValue = arrOfKeys.filter(function(e) {
          return e[nameSort] === n;
        });
        return filtredValue;
      },

      // Сортируем и соединяем.
      sortTasks_1 = filtration(1),
      sortTasks_2 = filtration(2),
      sortTasks_3 = filtration(3),
      allSortedTasks = sortTasks_1.concat(sortTasks_2, sortTasks_3),

      chooseId = document.getElementById(element.id),
      // Метод сортировки экземпляров.
      sortDeadline = arrOfKeys.sort(function(a, b) {
        return a.deadline.deadlineInMilleseconds - b.deadline.deadlineInMilleseconds;
      });

    // Если параметр сортировки, равен одному какого-нибудь имени id, то ...
    // ... передать этот параметр методу представления createTable.
    if (element.id === "sortByStatus" ||
      element.id === "sortByRange" ||
      element.id === "sortByStatusReverse" ||
      element.id === "sortByRangeReverse") {
      if (element.id === "sortByStatus" || element.id === "sortByRange") {
        chooseId.setAttribute("id", element.id + "Reverse");
        myAppSpace.view.listTasks.createTable(allSortedTasks);
      } else {
        chooseId.setAttribute("id", element.id.slice(0, -7));
        myAppSpace.view.listTasks.createTable(allSortedTasks.reverse());
      }
    }

    if (element.id === "sortByDeadline" || element.id === "sortByDeadlineReverse") {
      if (element.id === "sortByDeadline") {
        chooseId.setAttribute("id", "sortByDeadlineReverse");
        myAppSpace.view.listTasks.createTable(sortDeadline);
      } else {
        chooseId.setAttribute("id", "sortByDeadline");
        myAppSpace.view.listTasks.createTable(sortDeadline.reverse());
      }
    }
    event.preventDefault();
  },

  // Метода фильтрации.
  filterTasks: function(element, nameProper) {
    // Создаём список экземпляров.
    var arrOfKeys = Object.keys(Task.instances).map(function(key) {
        return Task.instances[key];
      }),
      // Фильтрация.
      filteredTasks = arrOfKeys.filter(function(e) {
        return e[nameProper] == element.value;
      });
    // Если параметр фильтрации, равен одному какого-нибудь имени id, то ...
    // ... передать этот параметр методу представления createTable или loadListTasks.
    if (element.id === "filtrationByStatus" || element.id === "filtrationByRange") {
      if (element.value == 0) {
        myAppSpace.controller.listTasks.loadListTasks();
      } else {
        myAppSpace.view.listTasks.createTable(filteredTasks);
      }
    }
  }
};
