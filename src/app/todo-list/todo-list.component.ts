import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../interfaces/todo.interface';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { TodosService } from '../todos.service';

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
  todoService = inject(TodosService);
  todos: Todo[] = [];
  isModalOpen = false;
  selectedTodo: Todo = { name: '', description: '' };

  constructor(private http: HttpClient) {
    this.todoService.todos$.subscribe((value) => {
      this.todos = value;
    });
    console.log({ todos: this.todos });
  }
  ngOnInit() {
    this.http.get<TodoListResponse>(`${this.ROOT_URL}/todos`).subscribe(
      (response) => {
        this.todoService.setTodos(response.todos);
        // this.todos = this.todoService.getAllTodos();
        console.log({ todos: this.todos });
        // console.log({ todos: this.todos });
      },
      (error) => {
        console.log({ error });
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
    this.todoService.toggleTodo(index);
    // this.todos = this.todoService.getAllTodos();
    this.http
      .put<TodoUpdateResponse>(`${this.ROOT_URL}/todos/${todo._id}`, {
        completed: this.todos[index].completed,
      })
      .subscribe(
        (response) => {
          console.log({ response });
        },
        (error) => {
          this.todoService.toggleTodo(index);
          // this.todos = this.todoService.getAllTodos();
          console.log(error);
        }
      );
  }

  deleteTodo(todo: Todo, index: number) {
    this.todoService.removeTodo(index);
    // this.todos = this.todoService.getAllTodos();
    this.http
      .delete<TodoUpdateResponse>(`${this.ROOT_URL}/todos/${todo._id}`)
      .subscribe(
        (response) => {
          console.log({ response });
          console.log({ todos: this.todos });
        },
        (error) => {
          this.todoService.insertTodo(todo, index);
          // this.todos = this.todoService.getAllTodos();
          console.log(error);
        }
      );
  }
}
