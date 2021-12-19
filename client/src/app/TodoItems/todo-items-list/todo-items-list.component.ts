import { Component, Input, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
  todoItems = [];
  donePercentage: number = 0;
  doneItems: number = 0;

  constructor(
    private todoService: TodoItemsService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getTodoItems();
    this.getCompletedPercentage();
  }

  addTodoItem(todoItem: TodoItem) {
    this.getCompletedPercentage();
  }

  onItemChange() {
    this.getCompletedPercentage();
  }

  getTodoItems() {
    this.todoService.getTodoItems().subscribe((itemsData) => {
      this.todoItems = itemsData;
      this.getCompletedPercentage();
    });
  }

  getCompletedPercentage() {
    let doneItems = this.todoItems.filter((obj) => obj.done === true).length;
    let allItems = this.todoItems;

    let donePercentage: number = (doneItems / allItems.length) * 100;

    this.donePercentage = donePercentage;
    this.doneItems = doneItems;
  }
}
