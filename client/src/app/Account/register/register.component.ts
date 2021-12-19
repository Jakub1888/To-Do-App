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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registered: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response !== null) {
          this.registered = true;
          setTimeout(() => this.router.navigate(['/todo-list']), 1000);
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  private initForm() {
    let username = '';
    let password = '';

    this.registerForm = this.formBuilder.group({
      username: new FormControl(username, Validators.required),
      password: new FormControl(password, Validators.required),
    });
  }
}
