import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../interfaces/todo.interface';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface TodoListResponse {
  status: string;
  message: string;
  todos: Todo[];
}
interface TodoUpdateResponse {
  status: string;
  message: string;
  todo: Todo;
}
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, TodoModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  readonly ROOT_URL = 'http://localhost:3040/api';
  todos: Todo[] = [];
  isModalOpen = false;
  selectedTodo: Todo = { name: '', description: '' };

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<TodoListResponse>(`${this.ROOT_URL}/todos`).subscribe(
      (response) => {
        this.todos = response.todos;
        console.log(this.todos);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedTodo = { name: '', description: '' };
  }
  setSelectedTodo(todo: Todo) {
    this.selectedTodo = todo;
  }
  toggleTodo(todo: Todo, index: number) {
    console.log('toggle', todo, index);
    this.todos[index].completed = !todo.completed;
    this.http
      .put<TodoUpdateResponse>(`${this.ROOT_URL}/todos/${todo._id}`, {
        completed: this.todos[index].completed,
      })
      .subscribe(
        (response) => {
          console.log({ response });
          console.log({ todos: this.todos });
        },
        (error) => {
          this.todos[index].completed = !this.todos[index].completed;
          console.log(error);
        }
      );
  }

  deleteTodo(todo: Todo, index: number) {
    this.todos.splice(index, 1);
    this.http
      .delete<TodoUpdateResponse>(`${this.ROOT_URL}/todos/${todo._id}`)
      .subscribe(
        (response) => {
          console.log({ response });
          console.log({ todos: this.todos });
        },
        (error) => {
          this.todos.splice(index, 0, todo);
          console.log(error);
        }
      );
  }
}
