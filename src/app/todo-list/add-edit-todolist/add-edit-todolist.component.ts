import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoListService } from '../todolist.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-todolist',
  templateUrl: './add-edit-todolist.component.html',
  styleUrls: ['./add-edit-todolist.component.css']
})

export class AddEditTodolistComponent implements OnInit, OnChanges {

  // accept variable from the parent
  @Input() displayChildAddModal: boolean = true;
  @Input() selectedChildTodo: any = null;
  // export the child property outside
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalType = "Add";

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

  // if there is selectedChildTodo data, then fill the form with value from that
  ngOnChanges(): void {
    if (this.selectedChildTodo) {
      this.todoForm.patchValue(this.selectedChildTodo);
      this.modalType = 'Edit';
    } else {
      // in order to click on add button, the value is not parse into the form
      this.todoForm.reset();
      this.modalType = 'Add';
    }
  }
  
  // if click on the Cancel button, tell parent 
  closeModal() {
    this.clickClose.emit(true);
    this.todoForm.reset(); //reset the form 
  }

  // after the form has been saved to the backend
  addEditTodo() {
    this.todoListService.saveProduct(this.todoForm?.value, this.selectedChildTodo).subscribe(response => {
      console.log(response);
      this.clickAddEdit.emit(); //emit the response to the parent 
      this.closeModal(); 
      const msg = this.modalType == 'Add' ? 'Todo added' : 'Todo updated';
      this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
    },
    error => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo does not added' });
      console.log('Error occured');
    })
  }
  
}
