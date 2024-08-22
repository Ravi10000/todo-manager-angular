import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TextareaComponent } from '../textarea/textarea.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Todo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [TextareaComponent, FormsModule, NgIf],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css'
})
export class TodoModalComponent {
  @Input() todo:Todo = {name: "", description : ""};
  @Output() closingModal = new EventEmitter();

  closeModal(){
    this.closingModal.emit();
  }
  handleSave(){
    console.log({todo: this.todo});
  }
}
