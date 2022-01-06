import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { TodoItemsService } from '../../_services/todo-items.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'todo-items-item',
  templateUrl: './todo-items-item.component.html',
  styleUrls: ['./todo-items-item.component.scss'],
})
export class TodoItemsItemComponent implements OnInit {
  @Input() todoItem: TodoItem;
  @Input() index: number;
  @Input() todoItems: Array<TodoItem>;
  @Output() changeItem = new EventEmitter<TodoItem>();
  isDone: boolean = false;
  taskTag: any;

  constructor(private todoService: TodoItemsService) {}

  ngOnInit(): void {
    this.isDone = this.todoItem.done;
    this.taskTag = this.todoItem.taskType.valueOf();
    console.log(this.taskTag);
  }

  onDeleteItem(id: number) {
    this.todoService.deleteTodoItem(id).subscribe(() => {
      this.todoItems.splice(this.index, 1);
      this.changeItem.emit(this.todoItem);
    });
  }

  onUpdateItem(id: number) {
    const date = new Date();
    this.todoItem.done = !this.isDone;

    if (this.isDone === true) {
      this.todoItem.completionDate = null;
    } else this.todoItem.completionDate = date;

    this.todoService.putTodoItem(id, this.todoItem).subscribe(() => {});
    this.changeItem.emit(this.todoItem);
  }

  getTaskTypeClass() {
    return {
      none: this.taskTag === 'None',
      home: this.taskTag === 'Home',
      work: this.taskTag === 'Work',
      shopping: this.taskTag === 'Shopping',
    };
  }
}
