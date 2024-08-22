import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { TextareaComponent } from '../textarea/textarea.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
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
  imports: [TextareaComponent, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css',
})
export class TodoModalComponent {
  readonly ROOT_URL = 'http://localhost:3040/api';
  @Input() todo: Todo = { name: '', description: '' };
  @Output() closingModal = new EventEmitter();
  todoService = inject(TodosService);

  todoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  closeModal() {
    this.closingModal.emit();
  }
  handleSubmit() {
    console.log({ data: this.todoForm.value, todo: this.todo });
    this.http
      .post<TodoUpdateResponse>(`${this.ROOT_URL}/todos`, this.todoForm.value)
      .subscribe((response) => {
        this.todoService.addTodo(response.todo);
        this.closeModal();
      });
  }
}
