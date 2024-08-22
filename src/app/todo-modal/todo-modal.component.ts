import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
} from '@angular/core';
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
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css',
})
export class TodoModalComponent {
  readonly ROOT_URL = 'http://localhost:3040/api';
  @Input() todo: Todo | null = null;
  @Output() closingModal = new EventEmitter();
  todoService = inject(TodosService);

  todoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private http: HttpClient) {}
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
    if (this.todo?._id) {
      this.http
        .put<TodoUpdateResponse>(
          `${this.ROOT_URL}/todos/${this.todo._id}`,
          this.todoForm.value
        )
        .subscribe((response) => {
          this.todoService.updateTodo(response.todo);
          this.closeModal();
        });
      return;
    }
    this.http
      .post<TodoUpdateResponse>(`${this.ROOT_URL}/todos`, this.todoForm.value)
      .subscribe((response) => {
        this.todoService.addTodo(response.todo);
        this.closeModal();
      });
  }
}
