import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { TodoItemsService } from '../../_services/todo-items.service';

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

  constructor(private todoService: TodoItemsService) {}

  ngOnInit(): void {
    this.isDone = this.todoItem.done;
  }

  onDeleteItem(id: number) {
    this.todoService.deleteTodoItem(id).subscribe();
    this.todoItems.splice(this.index, 1);
    this.changeItem.emit(this.todoItem);
  }

  onUpdateItem(id: number) {
    this.todoItem.done = !this.isDone;
    this.todoItem.completionDate = new Date();
    this.todoService.putTodoItem(id, this.todoItem).subscribe();
    this.changeItem.emit(this.todoItem);
  }
}
