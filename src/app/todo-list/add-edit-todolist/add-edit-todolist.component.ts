import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoListService } from '../todolist.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-todolist',
  templateUrl: './add-edit-todolist.component.html',
  styleUrls: ['./add-edit-todolist.component.css']
})

export class AddEditTodolistComponent implements OnInit {

  // accept variable from the parent
  @Input() displayChildAddModal: boolean = true;

  // export the child property outside
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<boolean> = new EventEmitter<boolean>();

  // this form format is used inside the <form></form>
  todoForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(100)])]
  })

  // instantiate an instance of FormBuilder to create reactive form
  constructor(private fb: FormBuilder, private todoListService:  TodoListService, private messageService: MessageService){
  }

  ngOnInit(): void {
  }
  
  // if click on the Cancel button, tell parent 
  closeModal() {
    this.clickClose.emit(true);
    this.todoForm.reset(); //reset the form 
  }

  // after the form has been saved to the backend
  addTodo() {
    this.todoListService.saveProduct(this.todoForm.value).subscribe(response => {
      console.log(response);
      this.clickAdd.emit(); //emit the response to the parent 
      this.closeModal(); 
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo added' });
    },
    error => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo does not added' });
      console.log('Error occured');
    })
  }
  
}
