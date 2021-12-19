import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TodoItem } from '../todo-item.model';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() todoItems: Array<TodoItem>;
  @Input() doneItems: number;
  @Input() donePercentage: number;
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
}
