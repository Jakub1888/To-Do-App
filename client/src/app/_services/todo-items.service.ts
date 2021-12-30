import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../TodoItems/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  private baseUrl: string = environment.apiUrl + 'todoItems';

  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.baseUrl);
  }

  postTodoItem(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.baseUrl, todoItem);
  }

  putTodoItem(id: number, todoItem: TodoItem) {
    return this.http.put<TodoItem>(`${this.baseUrl}/${id}`, todoItem);
  }

  deleteTodoItem(id: number): Observable<TodoItem> {
    return this.http.delete<TodoItem>(`${this.baseUrl}/${id}`);
  }
}
