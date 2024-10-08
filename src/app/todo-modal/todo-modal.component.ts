import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../interfaces/todo.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodosService } from '../todos.service';

interface TodoUpdateResponse {
  status: string;
  message: string;
  todo: Todo;
}
@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css',
})
export class TodoModalComponent {
  readonly ROOT_URL = 'http://localhost:3040/api';
  @Input() todo: Todo | null = null;
  @Output() closingModal = new EventEmitter();
  errors: any = {};
  todoService = inject(TodosService);
  isSubmitting = false;

  todoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private http: HttpClient) { }
  ngOnChanges(changes: any) {
    if (changes?.todo?.currentValue?._id) {
      this.todoForm = new FormGroup({
        name: new FormControl(changes?.todo?.currentValue?.name ?? ''),
        description: new FormControl(
          changes?.todo?.currentValue?.description ?? ''
        ),
      });
    }
  }

  closeModal() {
    this.closingModal.emit();
  }
  handleSubmit() {
    if (!this.todoForm.value.name) {
      this.errors.name = 'Name Required';
      return;
    }
    this.isSubmitting = true;
    if (this.todo?._id) {
      this.http
        .put<TodoUpdateResponse>(
          `${this.ROOT_URL}/todos/${this.todo._id}`,
          this.todoForm.value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        )
        .subscribe({
          next: (response) => {
            this.todoService.updateTodo(response.todo);
            this.closeModal();
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
      return;
    }
    this.http
      .post<TodoUpdateResponse>(`${this.ROOT_URL}/todos`, this.todoForm.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .subscribe({
        next: (response) => {
          this.todoService.addTodo(response.todo);
          this.closeModal();
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
