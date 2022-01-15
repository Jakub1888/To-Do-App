import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from '../../_models/todo-item.model';
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
  editForm: FormGroup;
  isDone: boolean = false;
  taskTag: any;
  editing: boolean = false;
  taskTypes = {
    0: 'None',
    1: 'Home',
    2: 'Work',
    3: 'Shopping',
  };

  constructor(private todoService: TodoItemsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isDone = this.todoItem.done;
    this.taskTag = this.todoItem.taskType;
    this.initForm();
  }

  onDeleteItem(id: number) {
    this.todoService.deleteTodoItem(id).subscribe(() => {
      this.todoItems.splice(this.index, 1);
      this.changeItem.emit(this.todoItem);
    });
  }

  onCompleteTask(id: number) {
    const date = new Date();
    this.todoItem.done = !this.isDone;

    if (this.isDone === true) {
      this.todoItem.completionDate = null;
    } else this.todoItem.completionDate = date;

    this.todoService.putTodoItem(id, this.todoItem).subscribe(() => {});
    this.changeItem.emit(this.todoItem);
  }

  onUpdateItem(id: number) {
    const form = this.editForm.controls;
    if (
      form['name'].value !== this.todoItem.name ||
      form['description'].value !== this.todoItem.description ||
      form['taskType'].value !== this.todoItem.taskType
    ) {
      this.todoItem.name = form['name'].value;
      this.todoItem.description = form['description'].value;
      this.todoItem.taskType = form['taskType'].value;

      this.todoService.putTodoItem(id, this.todoItem).subscribe(() => {});
    }
    this.editing = !this.editing;
  }

  onCancelUpdate() {
    this.editForm.controls['name'].setValue(this.todoItem.name);
    this.editForm.controls['description'].setValue(this.todoItem.description);
    this.editForm.controls['taskType'].setValue(this.todoItem.taskType);
    this.editing = !this.editing;
  }

  getTaskTypeClass() {
    this.taskTag = this.editForm.controls['taskType'].value;
    return {
      none: this.taskTag === 'None',
      home: this.taskTag === 'Home',
      work: this.taskTag === 'Work',
      shopping: this.taskTag === 'Shopping',
    };
  }

  private initForm() {
    this.editForm = this.fb.group({
      id: this.todoItem.id,
      name: [
        this.todoItem.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: [this.todoItem.description, Validators.maxLength(80)],
      taskType: [this.todoItem.taskType, Validators.required],
    });
  }
}
