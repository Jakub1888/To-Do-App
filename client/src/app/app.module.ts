import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemsListComponent } from './TodoItems/todo-items-list/todo-items-list.component';
import { TodoItemsItemComponent } from './TodoItems/todo-items-item/todo-items-item.component';
import { TodoItemsAddComponent } from './TodoItems/todo-items-add/todo-items-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressBarComponent } from './TodoItems/progress-bar/progress-bar.component';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './Home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { MatTabsModule } from '@angular/material/tabs';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { TextAreaComponent } from './_forms/text-area/text-area.component';
import { TaskTypeKeysPipe } from './TodoItems/todo-items-add/task-type-keys.pipe';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsListComponent,
    TodoItemsItemComponent,
    TodoItemsAddComponent,
    ProgressBarComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
    TextInputComponent,
    TextAreaComponent,
    TaskTypeKeysPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule,
    MatTabsModule,
    AutosizeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
