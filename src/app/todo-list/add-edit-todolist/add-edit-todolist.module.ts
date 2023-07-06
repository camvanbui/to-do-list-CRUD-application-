import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTodolistComponent } from './add-edit-todolist.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AddEditTodolistComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
  ],
  // children component need to export 
  exports: [AddEditTodolistComponent]
})

export class AddEditTodolistModule { }
