import { Injectable } from '@angular/core';
import { TodoList } from './todolist';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  //define the scope of the service
  providedIn: 'root'
})

export class TodoListService {

  todoLists: TodoList[] = [];
  private todoUrl = 'http://localhost:4200/todoLists';

  // inject dependency HttpService
  // http is an instance
  constructor(private http: HttpClient) {
  }

  //service class had get method to return all data from TodoLists interface, from an array to an Observa
  getTodos(): Observable<TodoList[]> {
    // get what type of response use generic <>
    return this.http.get<TodoList[]>(this.todoUrl).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //save to fake api

  saveProduct(postData: any) {
    return this.http.post(this.todoUrl, postData)
  }
  
  private handleError(err: HttpErrorResponse) {
    let errorMessage= '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: $(err.error.message)`;
    } else {
      errorMessage = `Server returned code: $(err.status), error message is: $(err.message)`;
    }
    console.log(errorMessage)
    return throwError(() => errorMessage);
  }

  // Overrides the method to ensure that a todo always has an id.
  // If the todo array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  todoId(todoLists: TodoList[]): number {
    return todoLists.length > 0 ? Math.max(...todoLists.map(todoLists => todoLists.id)) + 1 : 11;
  }
}