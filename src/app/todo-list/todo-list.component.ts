import { Component, OnDestroy, OnInit} from '@angular/core';
import { TodoList } from './todolist'; //interface import 
import { TodoListService } from './todolist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'todo-list-component',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit, OnDestroy{
  pageTile: string = 'My To Do Lists';

  //create an instance of TodoList interface 
  todoLists: TodoList[] = [];
  totalNumber: number = 0;
  displayAddEditModal: boolean = false;
  errorMessage: string= '';
  sub!: Subscription;

  selectedTodo: any = null;

  // private _todoListService; 
  // // registering to service via constr utor
  // constructor(todoListService: TodoListService) {
  //   this._todoListService = todoListService; }
  // // or we can simply do 
  constructor(private todoListService:  TodoListService) {
  } // Angular has finish injecting all data from TodoListService

  // start to get data from service inside ngOnInit instead of constructor bc, constructor is rather used for initiated things, not executed things

  ngOnInit(): void {
    this.sub = this.todoListService.getTodos().subscribe({
      next: (todoLists) => 
      {
        this.todoLists = todoLists;
        for (let todoList of todoLists) {
            console.log(todoList);
            this.totalNumber++;
        }
      },
        error: err => this.errorMessage =  err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedTodo = null;
  }

  // isClosed is true, displayAddEditModal is false
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  // unshift to get the last data
  saveNewTodoList(newData: any) {
    // if (newData.id === this.selectedTodo.id) {
    //   const todoIndex = this.todoLists.findIndex(data => data.id === newData.id);
    //   this.todoLists[todoIndex] = newData;
    // }
    // this.todoLists.unshift(newData);
  }

  // pass todo data to child component
  showEditModal(todo: TodoList) {
    this.displayAddEditModal = true;
    this.selectedTodo = todo;
  }

  showDeleteModal(todo: TodoList) {
    this.displayAddEditModal = true;
    
  }
}
