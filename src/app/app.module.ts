import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { TodoListModule } from './todo-list/todo-list.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    TodoListModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'todos', loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule)},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo:'home', pathMatch: 'full'},
    ]),
    BrowserAnimationsModule,
    ButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
