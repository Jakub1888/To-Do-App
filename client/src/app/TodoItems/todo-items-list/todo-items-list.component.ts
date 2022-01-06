import { Component, OnInit } from '@angular/core';
import { TodoItemsService } from '../../_services/todo-items.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TodoItem } from '../todo-item.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'todo-items-list',
  templateUrl: './todo-items-list.component.html',
  styleUrls: ['./todo-items-list.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(200)]),
      transition(':leave', animate(400, style({ opacity: 0 }))),
    ]),
  ],
})
export class TodoItemsListComponent implements OnInit {
  todoItems: TodoItem[] = [];
  displayTodoItems: TodoItem[] = [];
  donePercentage: number = 0;
  doneItems: number = 0;
  task = 'All';

  constructor(
    private todoService: TodoItemsService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getTodoItems();
  }

  addTodoItem(todoItem: TodoItem) {
    this.getCompletedPercentage();
    this.displayTodoItems.push(todoItem);
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
    let allItems = this.displayTodoItems;

    let donePercentage: number = (doneItems / allItems.length) * 100;

    this.donePercentage = donePercentage;
    this.doneItems = doneItems;
  }
}
