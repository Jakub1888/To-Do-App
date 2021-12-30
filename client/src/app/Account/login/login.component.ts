import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  //loggedUser = JSON.parse(localStorage.getItem('user'));

  constructor(
    public accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('todo-list');
      },
      (error) => {
        console.log(error);
      }
    );
    this.loginForm.reset();
  }

  private initForm() {
    let username = '';
    let password = '';

    this.loginForm = this.formBuilder.group({
      username: new FormControl(username, Validators.required),
      password: new FormControl(password, Validators.required),
    });
  }
}
