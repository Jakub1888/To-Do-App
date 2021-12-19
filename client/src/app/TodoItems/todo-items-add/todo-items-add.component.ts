import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoItem } from '../todo-item.model';
import { TodoItemsService } from '../../_services/todo-items.service';

@Component({
  selector: 'todo-items-add',
  templateUrl: './todo-items-add.component.html',
  styleUrls: ['./todo-items-add.component.scss'],
})
export class TodoItemsAddComponent implements OnInit {
  todoForm: FormGroup;
  todoItems = [];
  addingItem: boolean = false;
  @Output() addTodoItem = new EventEmitter<TodoItem>();

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoItemsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      this.todoService.postTodoItem(this.todoForm.value).subscribe();
      this.addingItem = !this.addingItem;
      //this.addTodoItem.emit(this.todoForm.value);
      location.reload();
    }
  }

  private initForm() {
    let name = '';
    let description = '';
    let done = false;
    let creationDate = new Date();

    this.todoForm = this.formBuilder.group({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description),
      done: new FormControl(done, Validators.required),
      creationDate: new FormControl(creationDate),
    });
  }
}
