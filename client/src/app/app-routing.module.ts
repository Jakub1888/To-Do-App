import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './Home/home.component';
import { TodoItemsAddComponent } from './TodoItems/todo-items-add/todo-items-add.component';
import { TodoItemsListComponent } from './TodoItems/todo-items-list/todo-items-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { loggedInGuard } from './_guards/loggedIn.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedInGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'todo-list',
        component: TodoItemsListComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
