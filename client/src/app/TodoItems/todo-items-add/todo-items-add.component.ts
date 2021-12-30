import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoItem } from '../todo-item.model';
import { TodoItemsService } from '../../_services/todo-items.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'todo-items-add',
  templateUrl: './todo-items-add.component.html',
  styleUrls: ['./todo-items-add.component.scss'],
})
export class TodoItemsAddComponent implements OnInit {
  todoForm: FormGroup;
  addingItem: boolean = false;
  @Output() addTodoItem = new EventEmitter<TodoItem>();
  taskTypes = {
    0: 'None',
    1: 'Home',
    2: 'Work',
    3: 'Shopping',
  };

  constructor(
    private fb: FormBuilder,
    private todoService: TodoItemsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      this.todoService.postTodoItem(this.todoForm.value).subscribe(
        () => {
          this.addingItem = !this.addingItem;
          //this.addTodoItem.emit(this.todoForm.value);
          location.reload();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }

  onAdding() {
    this.addingItem = !this.addingItem;
  }

  onCancelAdding() {
    this.addingItem = !this.addingItem;
    this.todoForm.controls['name'].reset();
    this.todoForm.controls['description'].reset();
    this.todoForm.controls['taskType'].setValue('None');
  }

  private initForm() {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(60)],
      done: [false, Validators.required],
      creationDate: [new Date(), Validators.required],
      taskType: ['None', Validators.required],
    });
  }
}
