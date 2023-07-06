import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTodolistComponent } from './add-edit-todolist.component';

describe('AddEditTodolistComponent', () => {
  let component: AddEditTodolistComponent;
  let fixture: ComponentFixture<AddEditTodolistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTodolistComponent]
    });
    fixture = TestBed.createComponent(AddEditTodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
