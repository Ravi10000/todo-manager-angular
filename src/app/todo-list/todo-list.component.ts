import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../interfaces/todo.interface';
import { NgFor, NgIf } from '@angular/common';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';

interface Response {
  status: string,
  message: string,
  todos: Todo[]
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, NgIf, TodoModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  readonly ROOT_URL = "http://localhost:3040/api";
  todos: any = [];
  isModalOpen = false;
  selectedTodo:any = {name: "", description: ""};

  constructor(private http: HttpClient) {}
  ngOnInit(){
    this.todos = this.http.get(`${this.ROOT_URL}/todos`).subscribe(
      (response:any) => { 
        this.todos = response.todos;
        console.log(this.todos) },
      (error) => { console.log(error); });
    };
  openModal(){
    this.isModalOpen = true;
  }
  closeModal(){
    this.isModalOpen = false;
    this.selectedTodo = {name: "", description: ""};
  }
  setSelectedTodo(todo:any){
    this.selectedTodo = todo;
  }
}
