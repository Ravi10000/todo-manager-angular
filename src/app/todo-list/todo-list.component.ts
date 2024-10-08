import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { TodosService } from '../todos.service';
import { TimerPipe } from '../timer.pipe';

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
  imports: [CommonModule, TodoModalComponent, TimerPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  readonly ROOT_URL = 'http://localhost:3040/api';
  todoService = inject(TodosService);
  todos: Todo[] = [];
  isModalOpen = false;
  selectedTodo: Todo | null = null;

  constructor(private http: HttpClient) {
    this.todoService.todos$.subscribe((value) => {
      this.todos = value;
    });
    console.log({ todos: this.todos });
  }
  ngOnInit() {
    this.http.get<TodoListResponse>(`${this.ROOT_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).subscribe({
      next: (response) => {
        this.todoService.setTodos(response.todos);
        console.log({ todos: this.todos });
      },
      error: (error) => {
        console.log({ error });
      }
    }

    );
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedTodo = null;
  }
  setSelectedTodo(todo: Todo) {
    this.selectedTodo = todo;
    console.log({ todo });
  }
  toggleTodo(todo: Todo, index: number) {
    this.todoService.toggleTodo(index);
    this.http
      .put<TodoUpdateResponse>(`${this.ROOT_URL}/todos/${todo._id}`, {
        completed: this.todos[index].completed,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .subscribe(
        {
          next: (response) => {
            console.log({ response });
          },
          error: (error) => {
            this.todoService.toggleTodo(index);
            console.log(error);
          }
        }
      );
  }

  deleteTodo(todo: Todo, index: number) {
    this.todoService.removeTodo(index);
    this.http
      .delete<TodoUpdateResponse>(`${this.ROOT_URL}/todos/${todo._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .subscribe(
        {
          next: (response) => {
            console.log({ response });
          },
          error: (error) => {
            this.todoService.insertTodo(todo, index);
            console.log(error);
          }
        }
      );
  }
}
