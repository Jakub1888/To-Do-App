import { Component, OnInit } from '@angular/core';
import { TodoItemsService } from '../../_services/todo-items.service';
import { TodoItem } from '../../_models/todo-item.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'todo-items-list',
  templateUrl: './todo-items-list.component.html',
  styleUrls: ['./todo-items-list.component.scss'],
})
export class TodoItemsListComponent implements OnInit {
  todoItems: TodoItem[] = [];
  displayTodoItems: TodoItem[] = [];
  donePercentage: number = 0;
  doneItems: number = 0;
  notDoneItems: number = 0;
  task = 'All';
  displayItems = false;

  constructor(
    private todoService: TodoItemsService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getTodoItems();
  }

  addTodoItem(todoItem: TodoItem) {
    this.displayTodoItems.push(todoItem);
    this.getCompletedPercentage();
  }

  getItemsByTaskName(taskName: any) {
    if (taskName) {
      this.displayTodoItems = this.todoItems.filter(
        (x) => x.taskType.valueOf() === taskName
      );
    } else {
      this.displayTodoItems = this.todoItems;
    }

    if (taskName === 'All') {
      this.displayTodoItems = this.todoItems;
    }

    this.task = taskName === 'None' ? 'No Category' : taskName;
    this.getCompletedPercentage();
  }

  onItemChange() {
    this.getCompletedPercentage();
    this.displayTodoItems.sort((a, b) => {
      let dateA = new Date(a.completionDate).valueOf();
      let dateB = new Date(b.completionDate).valueOf();
      return dateA - dateB;
    });
  }

  getTodoItems() {
    this.todoService.getTodoItems().subscribe((itemsData) => {
      this.todoItems = itemsData;
      this.displayTodoItems = itemsData;
      this.task = 'All';
      this.getCompletedPercentage();
    });
  }

  getCompletedPercentage() {
    let doneItems = this.displayTodoItems.filter(
      (item) => item.done === true
    ).length;
    let notDoneItems = this.displayTodoItems.filter(
      (item) => item.done === false
    ).length;
    let allItems = this.displayTodoItems;

    let donePercentage: number = (doneItems / allItems.length) * 100;

    this.donePercentage = donePercentage;
    this.doneItems = doneItems;
    this.notDoneItems = notDoneItems;
  }
}
